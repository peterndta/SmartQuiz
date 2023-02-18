using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface ISubjectRepository
    {
        void CreateSubject(Subject subject);
        void UpdateSubject(Subject subject);
        void DeleteSubject(Subject subject);
        Task<List<Subject>> GetAllSubjectsAsync(); 
        Subject? GetSubjectById(int id);
        Task<List<Subject>> GetSubjectsAsync(List<int> listId);
    }
}
