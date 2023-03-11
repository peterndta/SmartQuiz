using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.DTOs.AdminDTOs;
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

        public async Task<List<ClassMember>> GetClassMembersByUserId(int userId)
        {
            return await GetByCondition(x => x.UserId == userId).Include(x => x.Class)
                                                                .Include(x => x.User).ToListAsync();
        }

        public List<TopClassDTO> GetTopClass()
        {
            var result = GetAll().GroupBy(x => x.ClassId).OrderByDescending(x => x.Count()).Take(5).Select(x => new
            {
                ClassName = x.Select(x => x.Class).First().Name,
                ClassId = x.Key,
                TotalMember = x.Count(),
                Creator = x.Select(x => x.Class).Select(x => x.User).First().Name,
                ImageUrl = x.Select(x => x.Class).Select(x => x.User).First().ImageUrl,
            }).ToList();
            var resultList = new List<TopClassDTO>();
            result.ForEach(x =>
            {
                resultList.Add(new TopClassDTO
                {
                    ClassName = x.ClassName,
                    ClassId = x.ClassId,
                    TotalMember = x.TotalMember,
                    Creator = x.Creator,
                    ImageUrl = x.ImageUrl,
                });
            });
            return resultList;
        }

        public int GetTotalMember(string classId)
        {
            return GetByCondition(x => x.ClassId == classId).Count() + 1;
        }
    }
}
