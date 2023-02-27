using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class ClassRepository : RepositoryBase<Class>, IClassRepository
    {
        public ClassRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateClass(Class @class)
        {
            Create(@class);
        }

        public int GetTotalClass()
        {
            return GetAll().Count();
        }
    }
}
