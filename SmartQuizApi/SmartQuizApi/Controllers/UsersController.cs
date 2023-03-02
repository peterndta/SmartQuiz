using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.SubjectDTOs;
using SmartQuizApi.Data.DTOs.UserDTO;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;
using System.Collections;

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
        public async Task<IActionResult> CreateUserInfo([FromBody] CreateUserInfor createUser)
        {
            try
            {
                var user = _repositoryManager.User.GetUserById(createUser.Id);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                }

                _mapper.Map(createUser, user);
                _repositoryManager.User.UpdateUser(user);
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
        public IActionResult GetPagedPremiumUsers(PaginationParams para)
        {
            try
            {
                var premiumUsers = _repositoryManager.User.GetAllPremiumUsers();
                switch (para.sortOption)
                {
                    case "oldest":
                        premiumUsers = premiumUsers.OrderBy(u => u.Id).ToList();
                        break;
                    case "newest":
                        premiumUsers = premiumUsers.OrderByDescending(u => u.Id).ToList();
                        break;
                }
                var meta = new PaginationMeta()
                {
                    CurrentPage = para.pageNumber,
                    PageSize = para.pageSize,
                    TotalPages = premiumUsers.Count() / para.pageSize + 1,
                };
                premiumUsers = premiumUsers.Skip(para.pageSize * (para.pageNumber - 1))
                                .Take(para.pageSize).ToList();
                
                

                var premiumUsersDTO = new ArrayList();
                foreach (var user in premiumUsers)
                {
                    var dto = new PremiumUserDTO();
                    dto.Email = user.Email;
                    dto.Name = user.Name;
                    //extract bill
                    var bill = user.Bills.Where(b => DateTime.Compare(b.EffectiveDate, DateTime.Now) <= 0 && DateTime.Compare(DateTime.Now, b.ExpirationDate) <= 0).First();
                    dto.BillId = bill.Id;
                    dto.ExpiredDate = bill.ExpirationDate;
                    dto.EffectiveDate = bill.EffectiveDate;
                    dto.Subcription = bill.Subcription;
                    premiumUsersDTO.Add(dto);
                }
                return StatusCode(StatusCodes.Status200OK, new Response(200, premiumUsersDTO, "", meta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));

            }

        }


    }
}
