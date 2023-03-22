using SmartQuizApi.Data.DTOs.AdminDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class StudySetRatingRepository : RepositoryBase<StudySetRating>, IStudySetRatingRepository
    {
        public StudySetRatingRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public double GetRating(string studySetId)
        {
            var ratingList = GetByCondition(x => x.StudySetId.Equals(studySetId));
            if (ratingList.Count() > 0)
            {
                var rating = ratingList.Average(x => x.Rating);
                return Math.Ceiling(rating * 2) / 2;
            }
            return 0;
        }

        public StudySetRating? GetStudySetRating(string studySetId, int userId)
        {
            return GetByCondition(x => x.StudySetId.Equals(studySetId) && x.UserId == userId).FirstOrDefault();
        }

        public List<TopStudySetDTO> GetTopRating()
        {
            var result = GetAll().GroupBy(x => x.StudySetId).OrderByDescending(x => x.Select(x => x.Rating).Average()).Take(5).Select(x => new
            {
                averageRating = Math.Ceiling(x.Select(x => x.Rating).Average() * 2) / 2,
                studySetName = x.Select(x => x.StudySet).First().Name,
                userName = x.Select(x => x.StudySet).Select(x => x.User).First().Name,
                imageUrl = x.Select(x => x.StudySet).Select(x => x.User).First().ImageUrl,
                totalQuestion = x.Select(x => x.StudySet).Select(x => x.Questions).Count(),
                grade = x.Select(x => x.StudySet).Select(x => x.SubjectsOfGrade).Select(x => x.Grade).First().Name,
                subject = x.Select(x => x.StudySet).Select(x => x.SubjectsOfGrade).Select(x => x.Subject).First().Name,
            }).ToList();
            var resultList = new List<TopStudySetDTO>();
            result.ForEach(x =>
            {
                resultList.Add(new TopStudySetDTO
                {
                    TotalRatings = x.averageRating,
                    StudySetName = x.studySetName,
                    Creator = x.userName,
                    ImageUrl = x.imageUrl,
                    TotalQuestions = x.totalQuestion,
                    Grade = x.grade,
                    Subject = x.subject,
                });
            });
            return resultList;  
        }

        public int GetTotalRating(string studySetId)
        {
            return GetByCondition(x => x.StudySetId.Equals(studySetId)).Count();
        }

        public void SetRating(StudySetRating studySetRating)
        {
            Create(studySetRating);
        }
    }
}
