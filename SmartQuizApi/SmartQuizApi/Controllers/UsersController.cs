using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.DTOs.StudySetDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Data.Repositories;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public UsersController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager= repositoryManager;
            _mapper= mapper;
        }

        [HttpPost("mark-study-set")]
        public async Task<IActionResult> MarkStudySet(int userId, string studySetId)
        {
            try
            {
                if(_repositoryManager.StudySet.GetStudySetById(studySetId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                if(_repositoryManager.User.GetUserById(userId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                if(_repositoryManager.BookMark.GetBookMark(userId, studySetId) == null)
                {
                    _repositoryManager.BookMark.CreateBookMark(userId, studySetId);
                    await _repositoryManager.SaveChangesAsync();
                }
                return StatusCode(StatusCodes.Status201Created, new Response(201, "", "Create successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost("un-mark-study-set")]
        public async Task<IActionResult> UnMarkStudySet(int userId, string studySetId)
        {
            try
            {
                if (_repositoryManager.StudySet.GetStudySetById(studySetId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Study set id do not exist"));
                if (_repositoryManager.User.GetUserById(userId) == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "User id do not exist"));
                if (_repositoryManager.BookMark.GetBookMark(userId, studySetId) != null)
                {
                    _repositoryManager.BookMark.DeleteBookMark(userId, studySetId);
                    await _repositoryManager.SaveChangesAsync();
                }
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Delete successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }


        //// GET: api/Users
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        //{
        //    return await _context.Users.ToListAsync();
        //}

        //// GET: api/Users/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(int id)
        //{
        //    var user = await _context.Users.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}

        //// PUT: api/Users/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUser(int id, User user)
        //{
        //    if (id != user.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(user).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Users
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<User>> PostUser(User user)
        //{
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUser", new { id = user.Id }, user);
        //}

        //// DELETE: api/Users/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser(int id)
        //{
        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Users.Remove(user);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool UserExists(int id)
        //{
        //    return _context.Users.Any(e => e.Id == id);
        //}
    }
}
