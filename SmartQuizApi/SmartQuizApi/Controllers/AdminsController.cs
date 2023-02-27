using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.AdminDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public AdminsController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult AdminDashBoard()
        {
            try
            {
                var dashBoard = new Dashboard
                {
                    TotalUser = _repositoryManager.User.GetTotalUser(),
                    TotalMonthSubcription = _repositoryManager.Bill.GetTotalSubcription(1),
                    TotalYearSubcription = _repositoryManager.Bill.GetTotalSubcription(12),
                    TotalStudySet = _repositoryManager.StudySet.GetTotalStudySet(),
                    TotalClass = _repositoryManager.Class.GetTotalClass(),
                };
                return StatusCode(StatusCodes.Status200OK, new Response(200, dashBoard, ""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
