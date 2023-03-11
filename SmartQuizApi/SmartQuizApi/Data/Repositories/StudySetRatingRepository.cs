using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class StudySetRatingRepository : RepositoryBase<StudySetRating>, IStudySetRatingRepository
    {
        public StudySetRatingRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public double GetRating(string studySetId)
        {
            var ratingList = GetByCondition(x => x.StudySetId.Equals(studySetId));
            if (ratingList.Count() > 0)
            {
                var rating = ratingList.Average(x => x.Rating);
                return Math.Ceiling(rating * 2) / 2;
            }
            return 0;
        }

        public int GetTotalRating(string studySetId)
        {
            return GetByCondition(x => x.StudySetId.Equals(studySetId)).Count();
        }

        public void SetRating(StudySetRating studySetRating)
        {
            Create(studySetRating);
        }
    }
}
