

using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IBookMarkRepository
    {
            public void CreateBookMark(int userId, string studySetId);
            public void DeleteBookMark(int userId, string studySetId);
            public BookMark GetBookMark(int userId, string studySetId);
    }
}
