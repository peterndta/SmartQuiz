using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.AdminDTOs;
using SmartQuizApi.Data.DTOs.ClassDTOs;
using SmartQuizApi.Data.DTOs.StudySetDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public ClassesController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateClass(CreateClassDTO createClass)
        {
            try
            {
                var newClass = _mapper.Map<Class>(createClass);
                newClass.CreateAt = DateTime.Now;
                newClass.UpdateAt = DateTime.Now;
                newClass.Id = Guid.NewGuid().ToString();
                _repositoryManager.Class.CreateClass(newClass);
                await _repositoryManager.SaveChangesAsync();    
                return StatusCode(StatusCodes.Status200OK, new Response(200, new
                {
                    classId = newClass.Id,
                }, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditClass(EditClassDTO editClass)
        {
            try
            {
                var getClass = _repositoryManager.Class.GetClassById(editClass.Id);
                if (getClass == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Class id does not exsit"));
                }
                _mapper.Map(editClass, getClass);
                _repositoryManager.Class.UpdateClass(getClass);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Update successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost("add-study-set")]
        public async Task<IActionResult> AddStudySetToClass(AddStudySetToClassDTO addStudySet)
        {
            try
            {
                var getClass = _repositoryManager.Class.GetClassById(addStudySet.ClassId);
                if (getClass == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Class id does not exsit"));
                }

                addStudySet.StudySetId.ForEach(x =>
                {
                    var studySet = _repositoryManager.StudySet.GetStudySetById(x);
                    if (studySet != null)
                    {
                        studySet.IsPublic = false;
                        studySet.ClassId = addStudySet.ClassId;
                        _repositoryManager.StudySet.UpdateStudySet(studySet);
                    }
                });
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Add successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("my-class")]
        public async Task<IActionResult> GetMyClass(int userId)
        {
            try
            {
                var user = _repositoryManager.User.GetUserById(userId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id does not exsit"));
                }

                var listClass = await _repositoryManager.Class.GetClassByUserIdAsync(userId);
                var listClassDTO = _mapper.Map<List<GetClassDTO>>(listClass);
                listClassDTO.ForEach(x =>
                {
                    x.TotalStudySet = _repositoryManager.StudySet.GetTotalStudySetInClass(x.Id);
                    x.TotalMember = _repositoryManager.ClassMember.GetTotalMember(x.Id);
                });

                return StatusCode(StatusCodes.Status200OK, new Response(200, listClassDTO, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("class-detail/{classId}")]
        public IActionResult GetClassDetail(string classId)
        {
            try
            {
                var getClass = _repositoryManager.Class.GetClassById(classId);
                if (getClass == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Class id does not exsit"));
                }

                var classDTO = _mapper.Map<GetClassDetailDTO>(getClass);
                classDTO.TotalStudySet = _repositoryManager.StudySet.GetTotalStudySetInClass(classId);
                classDTO.TotalMember = _repositoryManager.ClassMember.GetTotalMember(classId);
                return StatusCode(StatusCodes.Status200OK, new Response(200, classDTO, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost("join")]
        public IActionResult Join(string classId, int userId)
        {
            try
            {
                var getClass = _repositoryManager.Class.GetClassById(classId);
                if (getClass == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Class id does not exsit"));
                }

                var user = _repositoryManager.User.GetUserById(userId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id does not exsit"));
                }

                _repositoryManager.ClassMember.CreateClassMember(new ClassMember
                {
                    UserId = userId,
                    ClassId = classId,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                });
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Join successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("class-member/{classId}")]
        public async Task<IActionResult> GetClassMember(string classId)
        {
            try
            {
                var getClass = _repositoryManager.Class.GetClassById(classId);
                if (getClass == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Class id does not exsit"));
                }

                var classMemberList = await _repositoryManager.ClassMember.GetClassMembers(classId);
                var classMemberDTOList = _mapper.Map<List<GetClassMemberDTO>>(classMemberList);
                classMemberDTOList.Add(new GetClassMemberDTO
                {
                    Id = getClass.UserId,
                    Name = getClass.User.Name,
                    ImageUrl = getClass.User.ImageUrl,
                    IsClassOwner= true,
                });

                return StatusCode(StatusCodes.Status200OK, new Response(200, classMemberDTOList, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
