using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IStudySetRepository
    {
        void CreateStudySet(StudySet studySet);
        Task<List<StudySet>> GetListStudySetsAsync(List<string> listStudySetId);   
        StudySet? GetStudySetById(string id);
        void UpdateStudySet(StudySet studySet);
        Task<List<StudySet>> FilterStudySetAsync(string? name, List<int> listId, string sortType);
        void DeleteStudySet(StudySet studySet);
        Task<List<StudySet>> GetStudySetByUserIdAsync(int userId);
        Task<List<StudySet>> GetAllStudySetsAsync(string sortType);
        Task<List<StudySet>> GetRecommendStudySetAsync(List<int> subjectsOfGradeId, int amount);
    }
}
