namespace SmartQuizApi.Data.DTOs.StudySetDTOs
{
    public class UpdateStudySetDTO
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int GradeId { get; set; }

        public int SubjectId { get; set; }

        public int? ClassId { get; set; }

        public bool IsPublic { get; set; }
    }
}
