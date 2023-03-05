namespace SmartQuizApi.Data.DTOs.ClassDTOs
{
    public class AddStudySetToClassDTO
    {
        public string ClassId { get; set; }
        public List<string> StudySetId { get; set; }
    }
}
