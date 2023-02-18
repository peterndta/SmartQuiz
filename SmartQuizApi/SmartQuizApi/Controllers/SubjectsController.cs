using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.GradeDTOs;
using SmartQuizApi.Data.DTOs.SubjectDTOs;
using SmartQuizApi.Data.IRepositories;
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
    }
}
