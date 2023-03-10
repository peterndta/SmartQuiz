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
            return GetByCondition(x => x.StudySetId.Equals(studySetId)).Average(x => x.Rating);
        }

        public void SetRating(StudySetRating studySetRating)
        {
            Create(studySetRating);
        }
    }
}
