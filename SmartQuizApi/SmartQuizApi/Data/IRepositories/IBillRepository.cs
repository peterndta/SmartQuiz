using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IBillRepository
    {
        void CreateBill(Bill bill);
        bool GetPaymentStatus(int userId);
        int GetTotalSubcription(int subcription);
    }
}
