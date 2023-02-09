using Azure.Core;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private SmartquizContext _context;
        private IUserRepository _userRepository;
        private IStudySetRepository _studySetRepository;
        private ISchoolRepository _schooolRepository;
        private IGradeRepository _gradeRepository;
        private ISubjectRepository _subjectRepository;
        private IQuestionRepository _questionRepository;
        private IAnnswerRepository _annswerRepository;
        private IBookMarkRepository _bookMarkRepository;
        public RepositoryManager(SmartquizContext context)
        {
            _context= context;
        }

        public IBookMarkRepository BookMark
        {
            get
            {
                if (_bookMarkRepository == null)
                {
                    _bookMarkRepository = new BookMarkRepository(_context);
                }
                return _bookMarkRepository;
            }
        }

        public IUserRepository User
        {
            get
            {
                if (_userRepository == null )
                {
                    _userRepository = new UserRepository(_context);
                }
                return _userRepository;
            }
        }

        public IStudySetRepository StudySet
        {
            get
            {
                if (_studySetRepository == null)
                {
                    _studySetRepository = new StudySetRepository(_context);
                }
                return _studySetRepository;
            }
        }

        public ISchoolRepository School
        {
            get
            {
                if (_schooolRepository == null)
                {
                    _schooolRepository = new SchoolRepository(_context);
                }
                return _schooolRepository;
            }
        }

        public IGradeRepository Grade
        {
            get
            {
                if (_gradeRepository == null)
                {
                    _gradeRepository = new GradeRepository(_context);
                }
                return _gradeRepository;
            }
        }

        public ISubjectRepository Subject
        {
            get
            {
                if (_subjectRepository == null)
                {
                    _subjectRepository = new SubjectRepository(_context);
                }
                return (_subjectRepository);
            }
        }

        public IQuestionRepository Question
        {
            get
            {
                if (_questionRepository == null)
                {
                    _questionRepository = new QuestionRepository(_context);
                }
                return _questionRepository;
            }
        }

        public IAnnswerRepository Annswer
        {
            get
            {
                if (_annswerRepository == null)
                {
                    _annswerRepository = new AnswerRepository(_context);
                }
                return _annswerRepository;
            }
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
