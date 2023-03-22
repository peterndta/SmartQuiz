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

        public int GetTotalUser()
        {
            return GetAll().Count();
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

        public List<User> GetAllPremiumUsers()
        {
            return GetAll()
                .Include(u => u.Bills)
                .Where(u => u.Bills.Where(b => DateTime.Compare(b.EffectiveDate, DateTime.Now) <= 0 && DateTime.Compare(DateTime.Now, b.ExpirationDate) <= 0).Count() > 0).ToList();
        }

        public User? GetUserInclude(int userId)
        {
            return GetByCondition(x => x.Id == userId).Include(x => x.Bookmarks)
                                                    .Include(x => x.Bills)
                                                    .Include(x => x.Favorites)
                                                    .Include(x => x.TestResults)
                                                    .ThenInclude(x => x.StudySet).FirstOrDefault();
        }
    }
}
