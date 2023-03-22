using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class FavoriteRepository : RepositoryBase<Favorite>, IFavoriteRepository
    {
        public FavoriteRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateFavorite(Favorite favorite)
        {
            Create(favorite);
        }

        public void DeleteFavorite(ICollection<Favorite> favorites)
        {
            BulkDelete(favorites);
        }
    }
}
