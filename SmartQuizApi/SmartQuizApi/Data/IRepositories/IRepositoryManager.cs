namespace SmartQuizApi.Data.IRepositories
{
    public interface IRepositoryManager
    {
        IUserRepository User { get; }
        IStudySetRepository StudySet { get; }
        IGradeRepository Grade { get; }
        ISubjectRepository Subject { get; }
        IQuestionRepository Question { get; }
        IAnnswerRepository Answer { get; }
        IBookMarkRepository BookMark { get; }
        ISubjectsOfGradeRepository SubjectsOfGrade { get; }
        IHistoryRepository History { get; }
        IBillRepository Bill { get; }
        IFavoriteRepository Favorite { get; }
        IClassRepository Class { get; }
        Task SaveChangesAsync();
    }
}
