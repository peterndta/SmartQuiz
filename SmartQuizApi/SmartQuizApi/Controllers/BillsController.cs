using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.BiilDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Interfaces;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public BillsController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBill(CreateBillDTO createBill)
        {
            try
            {
                var bill = _mapper.Map<Bill>(createBill);
                bill.EffectiveDate = bill.PaymentDate;
                if (bill.Subcription == 1)
                {
                    bill.ExpirationDate = bill.EffectiveDate.AddMonths(1);
                }
                else
                {
                    bill.ExpirationDate = bill.EffectiveDate.AddYears(1);
                }

                _repositoryManager.Bill.CreateBill(bill);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
