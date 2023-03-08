using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.Table.PivotTable;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Commons;

namespace SmartQuizApi.Data.Repositories
{
    public class StudySetRepository : RepositoryBase<StudySet>, IStudySetRepository
    {
        public StudySetRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateStudySet(StudySet studySet)
        {
            studySet.CreateAt = DateTime.Now;
            Create(studySet);
        }

        public void DeleteStudySet(StudySet studySet)
        {
            Delete(studySet);
        }

        public async Task<List<StudySet>> FilterStudySetAsync(string? name, List<int> listId, string sortType)
        {
            var result = await GetByCondition(x => (name == null || x.Name.Contains(name))
                                                && (listId.Count == 0 || listId.Contains(x.SubjectsOfGradeId))
                                                && x.IsPublic == true).OrderByDescending(x => x.CreateAt)
                                                                    .Include(x => x.User).ToListAsync();
            if (sortType == SortTypes.Oldest)
            {
                result = result.OrderBy(x => x.CreateAt).ToList();
            }
            return result;
        }

        public async Task<List<StudySet>> FilterStudySetByNameAsync(string? name, string sortType, List<string> classId)
        {
            var result = await GetByCondition(x => classId.Contains(x.Id)
                                                && name == null || x.Name.Contains(name)).Include(x => x.User)
                                                                                        .Include(x => x.SubjectsOfGrade)
                                                                                        .OrderByDescending(x => x.CreateAt).ToListAsync();
            if (sortType == SortTypes.Oldest)
            {
                result = result.OrderBy(x => x.CreateAt).ToList();
            }
            return result;
        }

        public async Task<List<StudySet>> GetAllStudySetsAsync(string sortType)
        {
            var result = await GetByCondition(x => x.IsPublic == true).Include(x => x.User)
                                                                    .Include(x => x.SubjectsOfGrade)
                                                                    .OrderByDescending(x => x.CreateAt).ToListAsync();
            if (sortType == SortTypes.Oldest)
            {
                result = result.OrderBy(x => x.CreateAt).ToList();
            }
            return result;
        }

        public async Task<List<StudySet>> GetListStudySetsAsync(List<string> listStudySetId)
        {
            return await GetByCondition(x => listStudySetId.Contains(x.Id)
                                        && x.IsPublic == true).Include(x => x.User)
                                                            .Include(x => x.SubjectsOfGrade).ToListAsync();
        }

        public async Task<List<StudySet>> GetRecommendStudySetAsync(List<int> subjectsOfGradeId, int amount)
        {
            return await GetByCondition(x => subjectsOfGradeId.Contains(x.SubjectsOfGradeId) && x.IsPublic == true)
                                                            .Take(amount)
                                                            .Include(x => x.User)
                                                            .Include(x => x.SubjectsOfGrade).ToListAsync(); 
        }

        public StudySet? GetStudySetById(string id)
        {
            return GetByCondition(x => x.Id.Equals(id)).Include(x => x.User)
                                                    .Include(x => x.SubjectsOfGrade).FirstOrDefault();
        }

        public async Task<List<StudySet>> GetStudySetByUserIdAsync(int userId)
        {
            return await GetByCondition(x => x.UserId == userId).Include(x => x.User)
                                                        .Include(x => x.SubjectsOfGrade).ToListAsync();
        }

        public int GetTotalStudySet()
        {
            return GetAll().Count();
        }

        public void UpdateStudySet(StudySet studySet)
        {
            Update(studySet);
        }
    }
}
