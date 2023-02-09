using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class BookMarkRepository : RepositoryBase<BookMark>, IBookMarkRepository
    {
        public BookMarkRepository(SmartquizContext context) : base(context)
        {
        }
        public void CreateBookMark(int userId, string studySetId)
        {
            BookMark bookMark = new BookMark { StudySetId = studySetId, UserId = userId };
            Create(bookMark);
        }

        public void DeleteBookMark(int userId, string studySetId)
        {
            BookMark bookMark = new BookMark { StudySetId = studySetId, UserId = userId };
            Delete(bookMark);
        }

        public BookMark? GetBookMark(int userId, string studySetId)
        {
            return GetByCondition(x => x.StudySetId.Equals(studySetId) && x.UserId == userId).FirstOrDefault();
        }
    }
}
