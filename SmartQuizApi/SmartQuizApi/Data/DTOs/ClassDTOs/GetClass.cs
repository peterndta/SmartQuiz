namespace SmartQuizApi.Data.DTOs.ClassDTOs
{
    public class GetClass
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int UserId { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime UpdateAt { get; set; }

        public string Description { get; set; }

        public string UserName { get; set; }
    }
}
