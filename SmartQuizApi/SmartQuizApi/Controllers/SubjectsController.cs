using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.GradeDTOs;
using SmartQuizApi.Data.DTOs.SubjectDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public SubjectsController(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubjects()
        {
            try
            {
                var subjectsList = await _repositoryManager.Subject.GetAllSubjectsAsync();
                var subjectsListDTO = _mapper.Map<List<GetSubjectsDTO>>(subjectsList);
                return StatusCode(StatusCodes.Status200OK, new Response(200, subjectsListDTO));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubject(string subjectName)
        {
            try
            {
                var getGubject = _repositoryManager.Subject.GetSubjectByName(subjectName);
                if (getGubject != null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, "Subject name already exist"));
                }

                _repositoryManager.Subject.CreateSubject(new Subject
                {
                    Name = subjectName,
                });
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubject(int id, string subjectName)
        {
            try
            {
                var getSubjectById = _repositoryManager.Subject.GetSubjectById(id);
                if (getSubjectById == null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, "Invalid subject id"));
                }

                var getSubjectByName = _repositoryManager.Subject.GetSubjectByName(subjectName);
                if (getSubjectByName != null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, "Subject name already exist"));
                }

                getSubjectById.Name = subjectName;
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Update successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(int id)
        {
            try
            {
                var getSubjectById = _repositoryManager.Subject.GetSubjectById(id);
                if (getSubjectById == null)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response(200, "Invalid subject id"));
                }

                _repositoryManager.Subject.DeleteSubject(getSubjectById);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Delete successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
