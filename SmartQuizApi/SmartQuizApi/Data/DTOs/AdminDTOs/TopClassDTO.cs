using System.Text.Json.Serialization;

namespace SmartQuizApi.Data.DTOs.AdminDTOs
{
    public class TopClassDTO
    {
        public string ClassName { get; set; }
        public int TotalStudySet { get; set; }
        public int TotalMember { get; set; }
        public string Creator { get; set; }
        public string? ImageUrl { get; set; }
        //[JsonIgnore]
        public string ClassId  { get; set; }
    }
}
