using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Commons;

namespace SmartQuizApi.Data.Repositories
{
    public class StudySetRepository : RepositoryBase<StudySet>, IStudySetRepository
    {
        public StudySetRepository(SmartquizContext context) : base(context)
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
                                                && (listId.Count == 0 || listId.Contains(x.SubjectsOfGradeId)))
                                                                                .OrderByDescending(x => x.CreateAt).ToListAsync();
            if (sortType == SortTypes.Oldest)
            {
                result = result.OrderBy(x => x.CreateAt).ToList();
            }
            return result;
        }

        public async Task<List<StudySet>> GetListStudySetsAsync(List<string> listStudySetId)
        {
            return await GetByCondition(x => listStudySetId.Contains(x.Id)).Include(x => x.User)
                                                                            .Include(x => x.SubjectsOfGrade)
                                                                            .Include(x => x.Class).ToListAsync();
        }

        public StudySet? GetStudySetById(string id)
        {
            return GetByCondition(x => x.Id.Equals(id)).Include(x => x.User)
                                                    .Include(x => x.SubjectsOfGrade)
                                                    .Include(x => x.Class).FirstOrDefault();
        }

        public async Task<List<StudySet>> GetStudySetByUserId(int userId)
        {
            return await GetByCondition(x => x.UserId == userId).Include(x => x.User)
                                                        .Include(x => x.SubjectsOfGrade)
                                                        .Include(x => x.Class).ToListAsync();
        }

        public void UpdateStudySet(StudySet studySet)
        {
            Update(studySet);
        }
    }
}
