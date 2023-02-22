using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class BillRepository : RepositoryBase<Bill>, IBillRepository
    {
        public BillRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateBill(Bill bill)
        {
            Create(bill);
        }

        public bool GetPaymentStatus(int userId)
        {
            var result = GetByCondition(x => x.UserId == userId && DateTime.Compare(x.ExpirationDate, DateTime.UtcNow) > 0).FirstOrDefault();
            return result != null;
        }
    }
}
