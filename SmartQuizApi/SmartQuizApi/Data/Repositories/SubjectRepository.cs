using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class SubjectRepository : RepositoryBase<Subject>, ISubjectRepository
    {
        public SubjectRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateSubject(Subject subject)
        {
            Create(subject);
        }

        public void DeleteSubject(Subject subject)
        {
            Delete(subject);
        }

        public async Task<List<Subject>> GetAllSubjectsAsync()
        {
            return await GetAll().ToListAsync();
        }

        public Subject? GetSubjectById(int id)
        {
            return GetByCondition(x => x.Id== id).FirstOrDefault();
        }

        public Task<List<Subject>> GetSubjectsAsync(List<int> listId)
        {
            return GetByCondition(x => listId.Contains(x.Id)).ToListAsync();
        }

        public void UpdateSubject(Subject subject)
        {
            Update(subject);
        }
    }
}
