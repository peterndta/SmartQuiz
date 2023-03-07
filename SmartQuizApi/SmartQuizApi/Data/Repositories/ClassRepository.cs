using Microsoft.EntityFrameworkCore;
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

        public void DeleteClass(Class @class)
        {
            Delete(@class);
        }

        public Class? GetClassById(string id)
        {
            return GetByCondition(x => x.Id.Equals(id)).Include(x => x.User).FirstOrDefault();
        }

        public async Task<List<Class>> GetClassByUserIdAsync(int userId)
        {
            return await GetByCondition(x => x.UserId == userId).Include(x => x.User).ToListAsync();
        }

        public string? GetClassIdByJoinCode(string joinCode)
        {
            var @class = GetByCondition(x => x.JoinCode.Equals(joinCode)).FirstOrDefault();
            return @class == null ? null : @class.Id;
        }

        public bool GetCodeJoin(string code)
        {
            return GetByCondition(x => x.JoinCode.Equals(code)).FirstOrDefault() != null;
        }

        public int GetTotalClass()
        {
            return GetAll().Count();
        }

        public void UpdateClass(Class @class)
        {
            Update(@class);
        }
    }
}
