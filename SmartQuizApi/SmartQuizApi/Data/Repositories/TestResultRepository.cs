using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class TestResultRepository : RepositoryBase<TestResult>, ITestResultRepository
    {
        public TestResultRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateTestResult(TestResult testResult)
        {
            Create(testResult);
        }
    }
}
