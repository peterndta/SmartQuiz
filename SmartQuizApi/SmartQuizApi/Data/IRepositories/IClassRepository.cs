using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IClassRepository
    {
        int GetTotalClass();
        void CreateClass(Class @class);
    }
}
