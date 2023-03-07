using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class StudySetRatingRepository : RepositoryBase<StudySetRating>, IStudySetRatingRepository
    {
        public StudySetRatingRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        void IStudySetRatingRepository.setRating(StudySetRating studySetRating)
        {
            Create(studySetRating);
        }
    }
}
