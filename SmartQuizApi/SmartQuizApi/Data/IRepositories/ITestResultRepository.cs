using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface ITestResultRepository
    {
        void CreateTestResult(TestResult testResult);
    }
}
