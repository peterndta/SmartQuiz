using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface ISubjectsOfGradeRepository
    {
        SubjectsOfGrade? GetSubjectsOfGrade(int gradeId, int subjectId);
        SubjectsOfGrade? GetSubjectsOfGrade(int subjectsOfGradeId);
        List<int>? GetListSubjectsOfGradesId(int? gradeId, int? subjectId);
    }
}
