using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.QuestionDTOs;
using SmartQuizApi.Data.DTOs.StudySetDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudySetsController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public StudySetsController(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudySet(CreateStudySetDTO createStudySetDTO)
        {
            try
            {
                var subject = _repositoryManager.Subject.GetSubjectById(createStudySetDTO.SubjectId);
                var grade = _repositoryManager.Grade.GetGradeById(createStudySetDTO.GradeId);
                var subjectfOfGrade = _repositoryManager.SubjectsOfGrade.GetSubjectsOfGrade(createStudySetDTO.GradeId, createStudySetDTO.SubjectId);

                if (subject == null || grade == null || subjectfOfGrade == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "", "Some id do not exist"));
                }

                var studySet = _mapper.Map<StudySet>(createStudySetDTO);
                studySet.Id = Guid.NewGuid().ToString();
                studySet.SubjectsOfGradeId = subjectfOfGrade.Id;
                foreach (var question in studySet.Questions)
                {
                    question.Id = Guid.NewGuid().ToString();
                    question.StudySetId = studySet.Id;
                    foreach (var answer in question.Answers)
                    {
                        answer.QuestionId = question.Id;
                    }
                }
                _repositoryManager.StudySet.CreateStudySet(studySet);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status201Created, new Response(201, studySet.Id, "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudySetDetail(string id, int? userId)
        {
            try
            {
                var studySet = _repositoryManager.StudySet.GetStudySetById(id);
                if (studySet == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                }

                var studySetDTO = _mapper.Map<GetStudySetDetailsDTO>(studySet);
                var subjectsOfGrade = _repositoryManager.SubjectsOfGrade.GetSubjectsOfGrade(studySet.SubjectsOfGradeId);
                _mapper.Map(subjectsOfGrade, studySetDTO);

                var questionsList = await _repositoryManager.Question.GetQuestionsByStudySetIdAsync(studySet.Id);
                studySetDTO.Questions = _mapper.Map<List<GetQuestionDTO>>(questionsList);
                foreach (var question in studySetDTO.Questions)
                {
                    question.MultipleChoice = question.Answers.Where(x => x.IsCorrectAnswer == true).Count() > 1;
                }

                if (userId == null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, studySetDTO));
                }

                var history = _repositoryManager.History.GetHistory(userId.Value, id);
                if (history != null)
                {
                    history.CreateAt = DateTime.Now;
                    _repositoryManager.History.UpdateHistory(history);
                }
                else
                {
                    _repositoryManager.History.CreateHistory(new History
                    {
                        UserId = userId.Value,
                        StudySetId = id,
                        CreateAt = DateTime.Now,
                    });
                }
                await _repositoryManager.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, new Response(200, studySetDTO));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetStudySetsList(int userId, int amount)
        {
            try
            {
                var history = await _repositoryManager.History.GetHistoryByUserId(userId, amount);
                var listStudySetId = new List<string>();
                var studySetsListDTO = new List<GetStudySetsListDTO>();

                if (history == null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, studySetsListDTO));
                }

                history.ForEach(x =>
                {
                    listStudySetId.Add(x.StudySetId);
                });

                var studySetsList = await _repositoryManager.StudySet.GetListStudySetsAsync(listStudySetId);
                studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList);

                studySetsListDTO = GetInfoForStudyList(studySetsListDTO);
                return StatusCode(StatusCodes.Status200OK, new Response(200, studySetsListDTO));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditStudySet(UpdateStudySetDTO updateStudySetDTO)
        {
            try
            {
                var studySet = _repositoryManager.StudySet.GetStudySetById(updateStudySetDTO.Id);
                if (studySet == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id does not exist"));
                }

                var subjectfOfGrade = _repositoryManager.SubjectsOfGrade.GetSubjectsOfGrade(updateStudySetDTO.GradeId, updateStudySetDTO.SubjectId);
                if (subjectfOfGrade == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Subject of grade is invalid"));
                }
                studySet.SubjectsOfGradeId = subjectfOfGrade.Id;

                _mapper.Map(updateStudySetDTO, studySet);
                _repositoryManager.StudySet.UpdateStudySet(studySet);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Update successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterAndSearchStudySet([FromQuery] FilterStudySetDTO filter, [FromQuery] PaginationParams @params, [FromQuery] string sorttype)
        {
            try
            {
                var studySetsList = new List<StudySet>();
                var listSubjectsOfGradeId = _repositoryManager.SubjectsOfGrade.GetListSubjectsOfGradesId(filter.GradeId, filter.SubjectId);
                if ((filter.SubjectId == null && filter.GradeId == null && filter.StudySetName == null) || listSubjectsOfGradeId == null)
                {
                    studySetsList = await _repositoryManager.StudySet.GetAllStudySetsAsync(sorttype);
                }

                studySetsList = await _repositoryManager.StudySet.FilterStudySetAsync(filter.StudySetName, listSubjectsOfGradeId, sorttype);
                if (studySetsList.Count == 0)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, new List<GetStudySetsListDTO>(), ""));
                }

                var studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList);
                var result = PaginatedList<GetStudySetsListDTO>.Create(studySetsListDTO, @params.pageNumber, @params.pageSize);

                result = (PaginatedList<GetStudySetsListDTO>)GetInfoForStudyList(result);
                return StatusCode(StatusCodes.Status200OK, new Response(200, result, "", result.Meta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudySet(string id)
        {
            try
            {
                var studySet = _repositoryManager.StudySet.GetStudySetById(id);
                if (studySet == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id does not exist"));
                }

                _repositoryManager.StudySet.DeleteStudySet(studySet);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Delete successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("my-studyset")]
        public async Task<IActionResult> GetMyStudySets(int userId, [FromQuery] PaginationParams @params)
        {
            try
            {
                var user = _repositoryManager.User.GetUserById(userId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, "User id does not exist"));
                }

                var studySetsList = await _repositoryManager.StudySet.GetStudySetByUserIdAsync(userId);
                var studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList).OrderByDescending(x => x.CreateAt).ToList();
                var result = PaginatedList<GetStudySetsListDTO>.Create(studySetsListDTO, @params.pageNumber, @params.pageSize);

                result = (PaginatedList<GetStudySetsListDTO>)GetInfoForStudyList(result);
                return StatusCode(StatusCodes.Status200OK, new Response(200, result, "", result.Meta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("{id}/exam")]
        public async Task<IActionResult> GetStudySetForTest(string id, int amount)
        {
            try
            {
                var studySet = _repositoryManager.StudySet.GetStudySetById(id);
                if (studySet == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                }

                var studySetDTO = _mapper.Map<GetStudySetDetailsDTO>(studySet);
                var subjectsOfGrade = _repositoryManager.SubjectsOfGrade.GetSubjectsOfGrade(studySet.SubjectsOfGradeId);
                _mapper.Map(subjectsOfGrade, studySetDTO);

                var questionsList = await _repositoryManager.Question.GetQuestionsByStudySetIdAsync(studySet.Id, amount);
                studySetDTO.Questions = _mapper.Map<List<GetQuestionDTO>>(questionsList);
                foreach (var question in studySetDTO.Questions)
                {
                    question.MultipleChoice = question.Answers.Where(x => x.IsCorrectAnswer == true).Count() > 1;
                }

                return StatusCode(StatusCodes.Status200OK, new Response(200, studySetDTO));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("recommend")]
        public async Task<IActionResult> GetRecommendStudySet(int userId, int amount)
        {
            try
            {
                var user = _repositoryManager.User.GetUserById(userId);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, "User id does not exist"));
                }

                var listFavorites = new List<int>();
                foreach (var item in user.Favorites)
                {
                    listFavorites.Add(item.SubjectsOfGradeId);
                }

                var studySetsList = await _repositoryManager.StudySet.GetRecommendStudySetAsync(listFavorites, amount);
                var studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList);

                studySetsListDTO = (List<GetStudySetsListDTO>)GetInfoForStudyList(studySetsListDTO);
                return StatusCode(StatusCodes.Status200OK, new Response(200, studySetsListDTO, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpGet("class/{id}")]
        public async Task<IActionResult> ClassDetail(string id, [FromQuery] string? name, [FromQuery] PaginationParams @params, [FromQuery] string sorttype)
        {
            try
            {
                var studySetsList = await _repositoryManager.StudySet.FilterStudySetByNameAsync(name, sorttype, id);
                var studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList);
                var result = PaginatedList<GetStudySetsListDTO>.Create(studySetsListDTO, @params.pageNumber, @params.pageSize);

                result = (PaginatedList<GetStudySetsListDTO>)GetInfoForStudyList(result);
                return StatusCode(StatusCodes.Status200OK, new Response(200, result, "", result.Meta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        private List<GetStudySetsListDTO> GetInfoForStudyList(List<GetStudySetsListDTO> list)
        {
            list.ForEach(x =>
            {
                x.TotalQuestions = _repositoryManager.Question.GetTotalQuestionByStudySetId(x.Id);
                var subjectsOfGrade = _repositoryManager.SubjectsOfGrade.GetSubjectsOfGrade(x.SubjectsOfGradeId);
                _mapper.Map(subjectsOfGrade, x);
            });
            return list;
        }
    }
}
