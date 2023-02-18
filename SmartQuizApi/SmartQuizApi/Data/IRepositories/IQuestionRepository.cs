using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IQuestionRepository
    {
        Task<List<Question>> GetQuestionsByStudySetIdAsync(string id);
        void CreateQuestion(Question question);
        void DeleteQuestion(Question question);
        Question? GetQuestionById(string id);
        int GetTotalQuestionByStudySetId(string studySetId);
        Task<List<Question>> GetQuestionsByStudySetIdAsync(string id, int amount);
    }
}
