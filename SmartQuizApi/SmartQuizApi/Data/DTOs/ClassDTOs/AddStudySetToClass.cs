namespace SmartQuizApi.Data.DTOs.ClassDTOs
{
    public class AddStudySetToClass
    {
        public string ClassId { get; set; }
        public List<string> StudySetId { get; set; }
    }
}
