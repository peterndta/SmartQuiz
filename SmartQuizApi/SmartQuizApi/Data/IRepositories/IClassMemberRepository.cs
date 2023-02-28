using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IClassMemberRepository
    {
        Task<List<ClassMember>> GetClassMembers(string classId);
    }
}
