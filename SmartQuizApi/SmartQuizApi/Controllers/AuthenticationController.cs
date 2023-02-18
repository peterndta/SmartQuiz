using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Services.Commons;
using SmartQuizApi.Services.Interfaces;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Produces("application/json")]
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IRepositoryManager _repositoryManager;

        public AuthenticationController(IAuthService authService, IRepositoryManager repositoryManager)
        {
            _authService = authService;
            _repositoryManager = repositoryManager;
        }

        [HttpGet("")]
        public IActionResult ExternalLogin()
        {
            var props = new AuthenticationProperties();
            var callback = Url.Action("ExternalLoginCallBack");
            props.RedirectUri = callback;
            return Challenge(props, "Google");
        }

        [HttpGet("signin-google")]
        public async Task<IActionResult> ExternalLoginCallBack()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var userLogin = _authService.GetUser(result);
            if (userLogin == null)
            {
                return Redirect($"https://smart-quiz.vercel.app/error");
            }

            var user = await _repositoryManager.User.GetUserByEmailAsync(userLogin.Email);

            if (user == null)
            {
                userLogin.Role = RoleTypes.User;
                _repositoryManager.User.CreateUser(userLogin);
                await _repositoryManager.SaveChangesAsync();
                user = await _repositoryManager.User.GetUserByEmailAsync(userLogin.Email);
            }
            bool premium = _repositoryManager.Bill.GetPaymentStatus(user.Id);
            var accessToken = await _authService.GenerateToken(user, premium);
            Response.Cookies.Append("jwt", accessToken, new CookieOptions
            {
                HttpOnly = true
            });
            return Redirect($"https://smart-quiz.vercel.app/login?token={accessToken}");
        }

        [HttpPost]
        [Route("auth")]
        public async Task<IActionResult> IsAuthenticated()
        {
            try
            {
                if (Request.Headers.TryGetValue(HeaderNames.Authorization, out var headers))
                {
                    var token = headers.First();
                    var jwtToken = _authService.DecodeToken(token);

                    var emailClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var roleClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "role").Value;

                    var userBasedEmail = await _repositoryManager.User.GetUserByEmailAsync(emailClaim);

                    if (userBasedEmail != null)
                    {
                        if (!userBasedEmail.Role.Equals(roleClaim))
                        {
                            return Unauthorized(new Response(401, "You don't have permission for this request"));
                        }
                    }
                    else
                    {
                        return BadRequest(new Response(400, "Invalid token"));
                    }

                    bool haveInfor = false;
                    if (userBasedEmail.GradeId != null)
                    {
                        haveInfor = true;
                    }
                    return Ok(new Response(200, new
                    {
                        haveInfor
                    }, "Authorized"));
                }
                return BadRequest(new Response(400, "Fail"));
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(500, ex.Message));
            }
        }
    }
}
