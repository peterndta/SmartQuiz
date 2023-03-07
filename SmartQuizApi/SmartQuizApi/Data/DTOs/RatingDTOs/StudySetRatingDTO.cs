namespace SmartQuizApi.Data.DTOs.RatingDTOs
{
    public class StudySetRatingDTO
    {
        public string StudySetId { get; set; } = null!;

        public int UserId { get; set; }

        public double Rating { get; set; }

    }
}
