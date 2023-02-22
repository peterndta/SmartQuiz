using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Repositories
{
    public class SubjectsOfGradeRepository : RepositoryBase<SubjectsOfGrade>, ISubjectsOfGradeRepository
    {
        public SubjectsOfGradeRepository(DbA95102SmartquizContext context) : base(context)
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

        public List<int> GetListSubjectsOfGradesId(List<int> listId)
        {
            var listIdResult = new List<int>();
            var result = GetByCondition(x => listId.Contains(x.Id)).ToList();
            if (result.Count > 0)
            {
                result.ForEach(x =>
                {
                    listIdResult.Add(x.SubjectId);
                });
            }
            return listIdResult;
        }

        public List<int> GetListSubjectsOfGradeId(int? gradeId, List<int> subjectId)
        {
            var listIdResult = new List<int>();
            var result = GetByCondition(x => subjectId.Contains(x.SubjectId) && x.GradeId == gradeId).ToList();
            if (result.Count > 0)
            {
                result.ForEach(x =>
                {
                    listIdResult.Add(x.Id);
                });
            }
            return listIdResult;
        }
    }
}
