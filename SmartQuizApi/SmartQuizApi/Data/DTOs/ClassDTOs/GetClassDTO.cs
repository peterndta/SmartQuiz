namespace SmartQuizApi.Data.DTOs.ClassDTOs
{
    public class GetClassDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Creator { get; set; }
        public int UserId { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string Description { get; set; }
        public int TotalStudySet { get; set; }
        public int TotalMember { get; set; }
        public string? ImageUrl { get; set; }
    }
}
