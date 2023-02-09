namespace SmartQuizApi.Data.IRepositories
{
    public interface IRepositoryManager
    {
        IBookMarkRepository BookMark { get; }
        IUserRepository User { get; }
        IStudySetRepository StudySet { get; }
        ISchoolRepository School { get; }
        IGradeRepository Grade { get; }
        ISubjectRepository Subject { get; }
        IQuestionRepository Question { get; }
        IAnnswerRepository Annswer { get; }
        Task SaveChangesAsync();
    }
}
