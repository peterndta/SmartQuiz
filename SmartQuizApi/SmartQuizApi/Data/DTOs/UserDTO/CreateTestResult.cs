namespace SmartQuizApi.Data.DTOs.UserDTO
{
    public class CreateTestResult
    {
        public int UserId { get; set; }

        public string StudySetId { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public int TotalQuestion { get; set; }

        public int TotalCorrect { get; set; }
    }
}
