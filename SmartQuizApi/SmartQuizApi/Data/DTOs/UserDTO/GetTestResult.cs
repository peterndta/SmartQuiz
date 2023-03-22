namespace SmartQuizApi.Data.DTOs.UserDTO
{
    public class GetTestResult
    {
        public int Id { get; set; }

        public string StudySetId { get; set; } 

        public string StudySetName { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int TotalQuestion { get; set; }

        public int TotalCorrect { get; set; }

        public int TotalIncorrect => TotalQuestion - TotalCorrect;
    }
}
