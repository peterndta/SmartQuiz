using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        void CreateUser(User user);
        User? GetUserById(int id);
        User? GetUserInclude(int userId);
        void UpdateUser(User user);
        int GetTotalUser();
        List<User> GetAllPremiumUsers();
    }
}
