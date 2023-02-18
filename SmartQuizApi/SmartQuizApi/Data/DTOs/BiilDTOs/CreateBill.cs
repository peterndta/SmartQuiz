using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.DTOs.BiilDTOs
{
    public class CreateBill
    {
        public DateTime PaymentDate { get; set; }

        public int UserId { get; set; }

        public int Subcription { get; set; }

        public string PayId { get; set; } 
    }
}
