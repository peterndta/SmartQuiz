using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IStudySetRepository
    {
        void CreateStudySet(StudySet studySet);
        Task<List<StudySet>> GetListStudySetsAsync();   
        StudySet? GetStudySetById(string id);
        void UpdateStudySet(StudySet studySet);
        Task<List<StudySet>> FilterStudySetAsync(string? name, int? gradeId, int? subjectId, string sortType);
        void DeleteStudySet(StudySet studySet);
        Task<List<StudySet>> GetStudySetByUserId(int userId);
    }
}
