using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class StudySetClassRepository : RepositoryBase<StudySetClass>, IStudySetClassRepository
    {
        public StudySetClassRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateStudySetClass(StudySetClass studySetClass)
        {
            Create(studySetClass);
        }

        public List<string> GetListStudySetInClass(string classId)
        {
            var result = new List<string>();
            var listStudySetClass = GetByCondition(x => x.ClassId.Equals(classId)).ToList();
            listStudySetClass.ForEach(x =>
            {
                result.Add(x.StudySetId);
            });
            return result;
        }

        public int GetTotalStudySetInClass(string classId)
        {
            return GetByCondition(x => x.ClassId.Equals(classId)).Count();
        }

        public StudySetClass? GetStudySetClass(string studySetId, string classId)
        {
            return GetByCondition(x => x.ClassId.Equals(classId) && x.StudySetId.Equals(studySetId)).FirstOrDefault();
        }

        public void DeleteStudySetClass(StudySetClass studySetClass)
        {
            Delete(studySetClass);
        }
    }
}
