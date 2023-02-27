using SmartQuizApi.Data.DTOs.QuestionDTOs;
using System.ComponentModel.DataAnnotations;

namespace SmartQuizApi.Data.DTOs.StudySetDTOs
{
    public class CreateStudySetDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int UserId { get; set; }

        public int GradeId { get; set; }

        public int SubjectId { get; set; }

        public string? ClassId { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        public List<CreateQuestionDTO> Questions { get; set; }
    }
}
