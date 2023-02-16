using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.QuestionDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public QuestionsController(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQuestion(UpdateQuestionDTO updateQuestionDTO)
        {
            try
            {
                var question = _repositoryManager.Question.GetQuestionById(updateQuestionDTO.Id);
                if (question == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Question id does not exist"));
                }
                var studySetId = question.StudySetId;
                _repositoryManager.Question.DeleteQuestion(question);

                var newQuestion = _mapper.Map<Question>(updateQuestionDTO);
                newQuestion.StudySetId= studySetId;
                _repositoryManager.Question.CreateQuestion(newQuestion);
                await _repositoryManager.SaveChangesAsync();

                question = _repositoryManager.Question.GetQuestionById(newQuestion.Id);
                var result = _mapper.Map<GetQuestionDTO>(question);
                return StatusCode(StatusCodes.Status200OK, new Response(200, result, "Update successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(string id)
        {
            try
            {
                var question = _repositoryManager.Question.GetQuestionById(id);
                if (question == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Question id does not exist"));
                }

                _repositoryManager.Question.DeleteQuestion(question);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Delete successfully"));
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuestion(CreateAQuestionDTO createAQuestionDTO)
        {
            try
            {
                var question = _mapper.Map<Question>(createAQuestionDTO);
                question.Id = Guid.NewGuid().ToString();
                foreach (var answer in question.Answers)
                {
                    answer.QuestionId = question.Id;
                }

                _repositoryManager.Question.CreateQuestion(question);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
