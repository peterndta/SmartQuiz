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
                newClass.JoinCode = GenerateJoinCode();
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

                var studySet = _repositoryManager.StudySet.GetStudySetById(addStudySet.StudySetId);
                if (studySet == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id does not exsit"));
                }

                _repositoryManager.StudySetClass.CreateStudySetClass(new StudySetClass
                {
                    StudySetId = addStudySet.StudySetId,
                    ClassId = addStudySet.ClassId,
                    CreateDate = DateTime.Now,
                });
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Add successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("check-to-add")]
        public async Task<IActionResult> Check(string studySetId, int userId)
        {
            try
            {
                var user = _repositoryManager.User.GetUserById(userId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id does not exsit"));
                }

                var listClass = await _repositoryManager.Class.GetClassByUserIdAsync(userId);
                var checkList = _mapper.Map<List<CheckDTO>>(listClass);
                checkList.ForEach(x =>
                {
                    x.AlreadyAdd = _repositoryManager.StudySetClass.GetStudySetClass(studySetId, x.Id) != null;
                });

                return StatusCode(StatusCodes.Status200OK, new Response(200, checkList, ""));
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
                    x.TotalStudySet = _repositoryManager.StudySetClass.GetTotalStudySetInClass(x.Id);
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
        public IActionResult GetClassDetail(string classId, int? userId)
        {
            try
            {
                var getClass = _repositoryManager.Class.GetClassById(classId);
                if (getClass == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Class id does not exsit"));
                }

                var classDTO = _mapper.Map<GetClassDetailDTO>(getClass);
                classDTO.TotalStudySet = _repositoryManager.StudySetClass.GetTotalStudySetInClass(classId);
                classDTO.TotalMember = _repositoryManager.ClassMember.GetTotalMember(classId);
                if (classDTO.UserId == userId)
                {
                    classDTO.IsAlreadyJoin = true;
                }
                else if (userId != null)
                {
                    classDTO.IsAlreadyJoin = _repositoryManager.ClassMember.GetClassMember(classId, userId.Value) != null;
                }
                else
                {
                    classDTO.IsAlreadyJoin = null;
                }
                
                return StatusCode(StatusCodes.Status200OK, new Response(200, classDTO, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost("join")]
        public async Task<IActionResult> Join(string classId, int userId)
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

                if (userId == getClass.UserId)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "You are owner"));
                }

                if (_repositoryManager.ClassMember.GetClassMember(classId, userId) != null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Already joined"));
                }

                _repositoryManager.ClassMember.CreateClassMember(new ClassMember
                {
                    UserId = userId,
                    ClassId = classId,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                });
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Join successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpDelete("leave-class")]
        public async Task<IActionResult> LeaveClass(string classId, int userId)
        {
            try
            {
                var classMember = _repositoryManager.ClassMember.GetClassMember(classId, userId);
                if (classMember == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "You haven't joined yet"));
                }

                _repositoryManager.ClassMember.DeleteClassMember(classMember);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Leave successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpDelete("remove-class")]
        public async Task<IActionResult> RemoveClass(string classId, int userId)
        {
            try
            {
                var @class = _repositoryManager.Class.GetClassById(classId);
                if (@class == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Class id is invalid"));
                }

                if (@class.UserId != userId)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "You do not have permisstion"));
                }

                _repositoryManager.Class.DeleteClass(@class);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Delete successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpDelete("remove-study-set")]
        public async Task<IActionResult> RemoveStudySetFromClass(string classId, string studySetId)
        {
            try
            {
                var studySetClass = _repositoryManager.StudySetClass.GetStudySetClass(studySetId, classId);
                if (studySetClass == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set haven't added to class yet"));
                }

                _repositoryManager.StudySetClass.DeleteStudySetClass(studySetClass);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Remove successfully"));
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

        [HttpGet("joined-class")]
        public async Task<IActionResult> GetJoinedClass(int userId)
        {
            try
            {
                var classMembers = await _repositoryManager.ClassMember.GetClassMembersByUserId(userId);
                var getClassDTO = _mapper.Map<List<GetClassDTO>>(classMembers);
                getClassDTO.ForEach(x =>
                {
                    var @class = _repositoryManager.Class.GetClassById(x.Id);
                    if (@class != null)
                    {
                        x.Creator = @class.User.Name;
                        x.UserId = @class.UserId;
                        x.ImageUrl = @class.User.ImageUrl;
                        x.TotalMember = _repositoryManager.ClassMember.GetTotalMember(x.Id);
                        x.TotalStudySet = _repositoryManager.StudySetClass.GetTotalStudySetInClass(x.Id);
                    }                    
                });

                return StatusCode(StatusCodes.Status200OK, new Response(200, getClassDTO, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("get-class-id/{joinCode}")]
        public IActionResult GetClassId(string joinCode)
        {
            try
            {
                var classId = _repositoryManager.Class.GetClassIdByJoinCode(joinCode);

                return StatusCode(StatusCodes.Status200OK, new Response(200, new
                {
                    ClassId = classId
                }, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        private string GenerateJoinCode()
        {
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            string result;
            while (true)
            {
                result = new string(
                Enumerable.Repeat(chars, 8)
                    .Select(s => s[random.Next(s.Length)])
                    .ToArray());
                if (_repositoryManager.Class.GetCodeJoin(result) == false)
                {
                    break;
                }
            }           
            return result;
        }
    }
}
