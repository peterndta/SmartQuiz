using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateUser(User user)
        {
            Create(user);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await GetByCondition(x => x.Email.Equals(email)).FirstOrDefaultAsync();
        }

        public User? GetUserById(int id)
        {
            return GetByCondition(x => x.Id == id)
                    .Include(x => x.Grade)
                    .Include(x => x.Favorites).FirstOrDefault();
        }

        public void UpdateUser(User user)
        {
            Update(user);
        }
    }
}
