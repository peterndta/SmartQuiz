using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.RatingDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public RatingController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> SetStudySetRating([FromBody] StudySetRatingDTO dto)
        {
            try
            {
                var studySet = _repositoryManager.StudySet.GetStudySetById(dto.StudySetId);
                var user = _repositoryManager.User.GetUserById(dto.UserId);
                if (studySet == null || user == null) 
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "", "Some id is invalid"));
                }

                if (_repositoryManager.StudySetRating.GetStudySetRating(dto.StudySetId, dto.UserId) != null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "", "Already rating"));
                }
                var studySetRating = _mapper.Map<StudySetRating>(dto);
                _repositoryManager.StudySetRating.SetRating(studySetRating);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex));
            }
        }

    }
}
