using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        void CreateUser(User user);
        User? GetUserById(int id);
        void UpdateUser(User user);
    }
}
