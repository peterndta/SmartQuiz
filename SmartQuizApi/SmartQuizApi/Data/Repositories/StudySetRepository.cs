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
            Create(studySet);
        }

        public void DeleteStudySet(StudySet studySet)
        {
            Delete(studySet);
        }

        public async Task<List<StudySet>> FilterStudySetAsync(string? name, int? gradeId, int? subjectId, string sortType)
        {
            var result = GetByCondition(x => (name == null || x.Name.Contains(name))
                                                && (gradeId == null || x.GradeId == gradeId)
                                                && (subjectId == null || x.SubjectId == subjectId)
                                                && (x.IsPublic == true)).Include(x => x.User)
                                                                        .Include(x => x.Grade)
                                                                        .Include(x => x.Subject)
                                                                        .Include(x => x.Class);
            if (sortType.Equals(SortTypes.Oldest))
            {
                return await result.OrderBy(x => x.CreateAt).ToListAsync();
            }
            else
            {
                return await result.OrderByDescending(x => x.CreateAt).ToListAsync();
            }
        }

        public async Task<List<StudySet>> GetListStudySetsAsync()
        {
            return await GetByCondition(x => true).Include(x => x.User)
                                                .Include(x => x.Grade)
                                                .Include(x => x.Subject)
                                                .Include(x => x.Class).ToListAsync();
        }

        public StudySet? GetStudySetById(string id)
        {
            return GetByCondition(x => x.Id.Equals(id)).Include(x => x.User)
                                                    .Include(x => x.Grade)
                                                    .Include(x => x.Subject)
                                                    .Include(x => x.Class).FirstOrDefault();
        }

        public async Task<List<StudySet>> GetStudySetByUserId(int userId)
        {
            return await GetByCondition(x => x.UserId == userId).Include(x => x.User)
                                                        .Include(x => x.Grade)
                                                        .Include(x => x.Subject)
                                                        .Include(x => x.Class).ToListAsync();
        }

        public void UpdateStudySet(StudySet studySet)
        {
            Update(studySet);
        }
    }
}
