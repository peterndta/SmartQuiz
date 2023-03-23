using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using SmartQuizApi.Data.DTOs.BiilDTOs;
using SmartQuizApi.Data.DTOs.SubjectDTOs;
using SmartQuizApi.Data.DTOs.UserDTO;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;
using System.Collections;
using System.Globalization;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public UsersController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpPost("mark-study-set")]
        public async Task<IActionResult> MarkStudySet(int userId, string studySetId)
        {
            try
            {
                if (_repositoryManager.StudySet.GetStudySetById(studySetId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                if (_repositoryManager.User.GetUserById(userId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                if (_repositoryManager.BookMark.GetBookMark(userId, studySetId) == null)
                {
                    _repositoryManager.BookMark.CreateBookMark(userId, studySetId);
                    await _repositoryManager.SaveChangesAsync();
                }
                return StatusCode(StatusCodes.Status201Created, new Response(201, "", "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost("un-mark-study-set")]
        public async Task<IActionResult> UnMarkStudySet(int userId, string studySetId)
        {
            try
            {
                if (_repositoryManager.StudySet.GetStudySetById(studySetId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                if (_repositoryManager.User.GetUserById(userId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                if (_repositoryManager.BookMark.GetBookMark(userId, studySetId) != null)
                {
                    _repositoryManager.BookMark.DeleteBookMark(userId, studySetId);
                    await _repositoryManager.SaveChangesAsync();
                }
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Delete successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserInfor(int id)
        {
            try
            {
                var user = _repositoryManager.User.GetUserById(id);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                }
                var userInforDTO = _mapper.Map<UserInfoDTO>(user);
                var listSubjectOfGradeId = new List<int>();
                foreach (var item in user.Favorites)
                {
                    listSubjectOfGradeId.Add(item.SubjectsOfGradeId);
                }

                var listSubjectId =  _repositoryManager.SubjectsOfGrade.GetListSubjectsOfGradesId(listSubjectOfGradeId);
                var listSubject = await _repositoryManager.Subject.GetSubjectsAsync(listSubjectId);
                userInforDTO.FavoriteSubjects = _mapper.Map<List<GetSubjectsDTO>>(listSubject);
                return StatusCode(StatusCodes.Status200OK, new Response(200, userInforDTO, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserInfo([FromBody] CreateUserInforDTO createUser)
        {
            try
            {
                var user = _repositoryManager.User.GetUserInclude(createUser.Id);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                }

                _mapper.Map(createUser, user);
                _repositoryManager.User.UpdateUser(user);
                _repositoryManager.Favorite.DeleteFavorite(user.Favorites);
                var listSubjectsOfGradeId = _repositoryManager.SubjectsOfGrade.GetListSubjectsOfGradeId(user.GradeId, createUser.ListSubjectsId);
                listSubjectsOfGradeId.ForEach(x =>
                {
                    _repositoryManager.Favorite.CreateFavorite(new Favorite
                    {
                        UserId = user.Id,
                        SubjectsOfGradeId = x,
                        CreateAt = DateTime.UtcNow
                    });
                });
                await _repositoryManager.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet]
        [Route("premium")]
        public IActionResult GetPagedPremiumUsers([FromQuery] PaginationParams para, [FromQuery] string sortOption)
        {
            try
            {
                var premiumUsers = _repositoryManager.User.GetAllPremiumUsers();
                switch (sortOption)
                {
                    case "Oldest":
                        premiumUsers = premiumUsers.OrderBy(u => u.Id).ToList();
                        break;
                    case "Newest":
                        premiumUsers = premiumUsers.OrderByDescending(u => u.Id).ToList();
                        break;
                }

                var result = PaginatedList<User>.Create(premiumUsers, para.pageNumber, para.pageSize);
                var premiumUsersDTO = new List<PremiumUserDTO>();

                foreach (var user in result)
                {
                    var dto = new PremiumUserDTO();
                    dto.Email = user.Email;
                    dto.Name = user.Name;
                    //extract bill
                    var bill = user.Bills.Where(b => DateTime.Compare(b.EffectiveDate, DateTime.Now) <= 0 && DateTime.Compare(DateTime.Now, b.ExpirationDate) <= 0).First();
                    dto.PayId = bill.PayId;
                    dto.ExpiredDate = bill.ExpirationDate;
                    dto.EffectiveDate = bill.EffectiveDate;
                    dto.Subcription = bill.Subcription;
                    premiumUsersDTO.Add(dto);
                }
                return StatusCode(StatusCodes.Status200OK, new Response(200, premiumUsersDTO, "", result.Meta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet]
        [Route("payment-history/{userId}")]
        public IActionResult GetPaymentHistory(int userId, [FromQuery] PaginationParams para, [FromQuery] string sortOption)
        {
            try
            {               
                var user = _repositoryManager.User.GetUserInclude(userId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                }

                var billDTOList = _mapper.Map<List<GetBillDTO>>(user.Bills);
                switch (sortOption)
                {
                    case "Oldest":
                        billDTOList = billDTOList.OrderBy(u => u.PaymentDate).ToList();
                        break;
                    case "Newest":
                        billDTOList = billDTOList.OrderByDescending(u => u.PaymentDate).ToList();
                        break;
                }

                var result = PaginatedList<GetBillDTO>.Create(billDTOList, para.pageNumber, para.pageSize);
                return StatusCode(StatusCodes.Status200OK, new Response(200, new
                {
                    UserId = userId,
                    UserName = user.Name,
                    PaymentHistory = result
                }, "", result.Meta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost]
        [Route("test-result")]
        public async Task<IActionResult> CreateTestResult(CreateTestResult dto)
        {
            try
            {
                var user = _repositoryManager.User.GetUserById(dto.UserId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                }

                var studySet = _repositoryManager.StudySet.GetStudySetById(dto.StudySetId);
                if (studySet == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                }

                var testResult = _mapper.Map<TestResult>(dto);
                var format = "ddd MMM dd yyyy HH:mm:ss 'GMT'zzz '(Indochina Time)'";
                testResult.StartTime = DateTime.ParseExact(dto.StartTime, format, CultureInfo.InvariantCulture);
                testResult.EndTime = DateTime.ParseExact(dto.EndTime, format, CultureInfo.InvariantCulture);
                _repositoryManager.TestResult.CreateTestResult(testResult);
                await _repositoryManager.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, new Response(200, testResult.Id, "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet]
        [Route("test-result/{userId}")]
        public IActionResult GetTestResult(int userId)
        {
            try
            {
                var user = _repositoryManager.User.GetUserInclude(userId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                }

                var result = _mapper.Map<List<GetTestResult>>(user.TestResults).OrderByDescending(x => x.StartTime);
                return StatusCode(StatusCodes.Status200OK, new Response(200, result, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
