using SmartQuizApi.Data.DTOs.UserDTO;

namespace SmartQuizApi.Data.DTOs.ClassDTOs
{
    public class GetClassMember
    {
        public int UserId { get; set; }

        public string MemberName { get; set; }

        public string? ImageUrl { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime UpdateAt { get; set; }
    }
}
