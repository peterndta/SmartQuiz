using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IStudySetRatingRepository
    {
        void SetRating(StudySetRating studySetRating);
        double GetRating(string studySetId);
        int GetTotalRating(string studySetId);
    }
}
