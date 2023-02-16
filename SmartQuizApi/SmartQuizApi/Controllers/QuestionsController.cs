using AutoMapper;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using SmartQuizApi.Data.DTOs.AnswerDTOs;
using SmartQuizApi.Data.DTOs.QuestionDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;
using System.ComponentModel;
using System.Data;
using System.Net;
using System.Reflection.PortableExecutable;
using System.Runtime.CompilerServices;
using LicenseContext = OfficeOpenXml.LicenseContext;

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
                newQuestion.StudySetId = studySetId;
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
            catch (Exception ex)
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
                question = _repositoryManager.Question.GetQuestionById(question.Id);
                var result = _mapper.Map<GetQuestionDTO>(question);
                return StatusCode(StatusCodes.Status200OK, new Response(200, result, "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportQuestion(IFormFile formFile)
        {
            try
            {
                var listQuestion = new List<CreateQuestionDTO>();
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                using (var stream = new MemoryStream())
                {
                    await formFile.CopyToAsync(stream);
                    stream.Position = 0;
                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                    using (ExcelPackage package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                        int totalRows = workSheet.Dimension.Rows;
                        for (int i = 2; i <= totalRows && i <= 2000; i++)
                        {
                            var questionName = GetString(workSheet, i, 1);
                            if (questionName == null)
                            {
                                break;
                            }

                            var listAnswer = new List<CreateAnwserDTO>();
                            var tempName = "";

                            for (int j = 2; j <= 17; j++)
                            {
                                if (j % 2 == 0)
                                {
                                    if (GetString(workSheet, i, j) == null)
                                    {
                                        break;
                                    }
                                    tempName = GetString(workSheet, i, j);
                                }
                                else if (GetBool(workSheet, i, j) != null)
                                {
                                    listAnswer.Add(new CreateAnwserDTO
                                    {
                                        Name = tempName,
                                        IsCorrectAnswer = GetBool(workSheet, i, j).Value,
                                    });
                                }
                                else
                                {
                                    break;
                                }
                            }

                            if (listAnswer.Where(x => x.IsCorrectAnswer == true).Count() > 0)
                            {
                                var question = new CreateQuestionDTO
                                {
                                    Name = questionName,
                                    Answers = listAnswer,
                                };
                                listQuestion.Add(question);
                            }
                        }                       
                    }                   
                }
                return StatusCode(StatusCodes.Status200OK, new Response(200, listQuestion, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        private string? GetString(ExcelWorksheet worksheet, int row, int column)
        {
            try
            {
                return worksheet.Cells[row, column].Value.ToString();
            }
            catch
            {
                return null;
            }
        }

        private bool? GetBool(ExcelWorksheet worksheet, int row, int column)
        {
            try
            {
                return (bool)worksheet.Cells[row, column].Value;
            }
            catch 
            {
                return null;
            }
        }
    }
}
