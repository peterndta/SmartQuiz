using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class StudySetRatingRepository : RepositoryBase<StudySetRating>, IStudySetRatingRepository
    {
        public StudySetRatingRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void SetRating(StudySetRating studySetRating)
        {
            Create(studySetRating);
        }
    }
}
