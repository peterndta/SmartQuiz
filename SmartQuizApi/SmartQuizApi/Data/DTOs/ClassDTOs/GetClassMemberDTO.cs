namespace SmartQuizApi.Data.DTOs.ClassDTOs
{
    public class GetClassMemberDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsClassOwner { get; set; } = false;
    }
}
