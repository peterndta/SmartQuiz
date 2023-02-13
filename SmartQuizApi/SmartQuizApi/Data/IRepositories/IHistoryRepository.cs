using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IHistoryRepository
    {
        void CreateHistory(History history);
        Task<List<History>> GetHistoryByUserId(int userId, int amount);
        History? GetHistory(int userId, string studySetId);
        void UpdateHistory(History history);
    }
}
