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

                if (subject == null || grade == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "", "Some id do not exist"));
                }

                var studySet = _mapper.Map<StudySet>(createStudySetDTO);
                studySet.Id = Guid.NewGuid().ToString();
                studySet.CreateAt = DateTime.Now;
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
        public async Task<IActionResult> GetStudySetDetail(string id, [FromQuery] PaginationParams @params)
        {
            try
            {
                var studySet = _repositoryManager.StudySet.GetStudySetById(id);
                if (studySet == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                }

                var studySetDTO = _mapper.Map<GetStudySetDetailsDTO>(studySet);
                var questionsList = await _repositoryManager.Question.GetQuestionsByStudySetId(studySet.Id);
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

        [HttpGet]
        public async Task<IActionResult> GetStudySetsList()
        {
            try
            {
                var studySetsList = await _repositoryManager.StudySet.GetListStudySetsAsync();
                var studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList);
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
                var studySetsList = await _repositoryManager.StudySet.FilterStudySetAsync(filter.StudySetName, filter.GradeId, filter.SubjectId, sorttype);
                var studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList);
                var result = PaginatedList<GetStudySetsListDTO>.Create(studySetsListDTO, @params.pageNumber, @params.pageSize);
                result.ForEach(x =>
                {
                    x.TotalQuestions = _repositoryManager.Question.GetTotalQuestionByStudySetId(x.Id);
                });
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
            catch(Exception ex)
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

                var studySetsList = await _repositoryManager.StudySet.GetStudySetByUserId(userId);
                var studySetsListDTO = _mapper.Map<List<GetStudySetsListDTO>>(studySetsList).OrderByDescending(x => x.CreateAt).ToList();
                var result = PaginatedList<GetStudySetsListDTO>.Create(studySetsListDTO, @params.pageNumber, @params.pageSize);
                result.ForEach(x =>
                {
                    x.TotalQuestions = _repositoryManager.Question.GetTotalQuestionByStudySetId(x.Id);
                });
                return StatusCode(StatusCodes.Status200OK, new Response(200, result, "", result.Meta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
