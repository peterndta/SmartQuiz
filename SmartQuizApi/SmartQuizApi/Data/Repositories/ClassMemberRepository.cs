using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class ClassMemberRepository : RepositoryBase<ClassMember>, IClassMemberRepository
    {
        public ClassMemberRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateClassMember(ClassMember classMember)
        {
            Create(classMember);
        }

        public void DeleteClassMember(ClassMember classMember)
        {
            Delete(classMember);
        }

        public ClassMember? GetClassMember(string classId, int userId)
        {
            return GetByCondition(x => x.ClassId.Equals(classId) && x.UserId == userId).FirstOrDefault();
        }

        public async Task<List<ClassMember>> GetClassMembers(string classId)
        {
            return await GetByCondition(x => x.ClassId.Equals(classId)).Include(x => x.User).ToListAsync();
        }

        public int GetTotalMember(string classId)
        {
            return GetByCondition(x => x.ClassId == classId).Count();
        }
    }
}
