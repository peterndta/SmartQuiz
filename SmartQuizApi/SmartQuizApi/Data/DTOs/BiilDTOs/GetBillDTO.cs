namespace SmartQuizApi.Data.DTOs.BiilDTOs
{
    public class GetBillDTO
    {
        public int Id { get; set; }

        public DateTime EffectiveDate { get; set; }

        public DateTime ExpirationDate { get; set; }

        public DateTime PaymentDate { get; set; }

        public int Subcription { get; set; }

        public string PayId { get; set; }
    }
}
