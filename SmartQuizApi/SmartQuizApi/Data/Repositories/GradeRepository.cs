using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class GradeRepository : RepositoryBase<Grade>, IGradeRepository
    {
        public GradeRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateGrade(Grade grade)
        {
            Create(grade);
        }

        public void DeleteGrade(Grade grade)
        {
            Delete(grade);
        }

        public async Task<List<Grade>> GetAllGradesAsync()
        {
            return await GetAll().ToListAsync();
        }

        public Grade? GetGradeById(int id)
        {
            return GetByCondition(x => x.Id == id).FirstOrDefault();
        }

        public void UpdateGrade(Grade grade)
        {
            Update(grade);
        }
    }
}
