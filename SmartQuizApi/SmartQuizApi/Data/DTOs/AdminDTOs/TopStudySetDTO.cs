namespace SmartQuizApi.Data.DTOs.AdminDTOs
{
    public class TopStudySetDTO
    {
        public string StudySetName { get; set; }
        public string Subject { get; set; }
        public string Grade { get; set; }
        public int TotalQuestions { get; set; }
        public double TotalRatings { get; set; }
        public string? ImageUrl { get; set; }
        public string Creator { get; set; }
    }
}
