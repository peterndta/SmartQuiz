using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IStudySetClassRepository
    {
        int GetTotalStudySetInClass(string classId);
        List<string> GetListStudySetInClass(string classId);
        void CreateStudySetClass(StudySetClass studySetClass);
        StudySetClass? GetStudySetClass(string studySetId, string classId);
        void DeleteStudySetClass(StudySetClass studySetClass);
    }
}
