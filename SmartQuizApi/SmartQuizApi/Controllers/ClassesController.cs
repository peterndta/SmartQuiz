using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.AdminDTOs;
using SmartQuizApi.Data.DTOs.ClassDTOs;
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
    }
}
