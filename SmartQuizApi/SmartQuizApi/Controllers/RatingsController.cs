using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : Controller
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public RatingsController(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [Route("/studyset")]
        [HttpPost]
        public async Task<IActionResult> addStudySetRating([FromQuery] string studysetId, int userId, float rating)
        {
            try
            {
             

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
