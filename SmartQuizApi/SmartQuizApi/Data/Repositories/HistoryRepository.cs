using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class HistoryRepository : RepositoryBase<History>, IHistoryRepository
    {
        public HistoryRepository(SmartquizContext context) : base(context)
        {
        }

        public void CreateHistory(History history)
        {
            Create(history);
        }

        public History? GetHistory(int userId, string studySetId)
        {
            return GetByCondition(x => x.UserId == userId && x.StudySetId == studySetId).FirstOrDefault();   
        }

        public async Task<List<History>> GetHistoryByUserId(int userId, int amount)
        {
            return await GetByCondition(x => x.UserId == userId)
                    .OrderByDescending(x => x.CreateAt)
                    .Take(amount).ToListAsync();
        }

        public void UpdateHistory(History history)
        {
            Update(history);
        }
    }
}
