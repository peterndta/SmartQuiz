using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class SubjectsOfGradeRepository : RepositoryBase<SubjectsOfGrade>, ISubjectsOfGradeRepository
    {
        public SubjectsOfGradeRepository(SmartquizContext context) : base(context)
        {
        }

        public SubjectsOfGrade? GetSubjectsOfGrade(int gradeId, int subjectId)
        {
            return GetByCondition(x => x.GradeId == gradeId && x.SubjectId == subjectId)
                    .Include(x => x.Subject)
                    .Include(x => x.Grade).FirstOrDefault();
        }

        public SubjectsOfGrade? GetSubjectsOfGrade(int subjectsOfGradeId)
        {
            return GetByCondition(x => x.Id == subjectsOfGradeId)
                    .Include(x => x.Subject)
                    .Include(x => x.Grade).FirstOrDefault();
        }

        public List<int>? GetListSubjectsOfGradesId(int? gradeId, int? subjectId)
        {
            var listId = new List<int>();
            if (gradeId != null || subjectId != null)
            {
                var result = GetByCondition(x => (gradeId == null || x.GradeId == gradeId)
                                            && (subjectId == null || x.SubjectId == subjectId)).ToList();

                if (result.Count == 0)
                {
                    return null;
                }

                result.ForEach(x =>
                {
                    listId.Add(x.Id);
                });
            }
            return listId;
        }
    }
}
