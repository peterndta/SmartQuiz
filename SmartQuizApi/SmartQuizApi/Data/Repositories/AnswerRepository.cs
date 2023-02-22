using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class AnswerRepository : RepositoryBase<Answer>, IAnnswerRepository
    {
        public AnswerRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void BulkDeleteAnswers(List<Answer> answerList)
        {
            BulkDelete(answerList);
        }

        public void CreateAnswer(Answer answer)
        {
            Create(answer);
        }

        public async Task<List<Answer>> GetAnswersByQuestionIdAsync(string id)
        {
            return await GetByCondition(x => x.QuestionId.Equals(id)).ToListAsync();
        }
    }
}
