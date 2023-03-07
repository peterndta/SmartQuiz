using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IClassRepository
    {
        int GetTotalClass();
        void CreateClass(Class @class);
        Class? GetClassById(string id);
        void UpdateClass(Class @class);
        Task<List<Class>> GetClassByUserIdAsync(int userId);
        bool GetCodeJoin(string code);  
        void DeleteClass(Class @class);
        string? GetClassIdByJoinCode(string joinCode);
    }
}
