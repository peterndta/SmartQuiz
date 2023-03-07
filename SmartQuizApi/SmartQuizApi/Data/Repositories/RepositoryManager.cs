using Azure.Core;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private DbA95102SmartquizContext _context;
        private IUserRepository _userRepository;
        private IStudySetRepository _studySetRepository;
        private IGradeRepository _gradeRepository;
        private ISubjectRepository _subjectRepository;
        private IQuestionRepository _questionRepository;
        private IAnnswerRepository _annswerRepository;
        private IBookMarkRepository _bookMarkRepository;
        private ISubjectsOfGradeRepository _subjectsOfGradeRepository;
        private IHistoryRepository _historyRepository;
        private IBillRepository _billRepository;
        private IFavoriteRepository _favoriteRepository;
        private IClassRepository _classRepository;
        private IClassMemberRepository _classMemberRepository;
        private IStudySetClassRepository _studySetClassRepository;
        public RepositoryManager(DbA95102SmartquizContext context)
        {
            _context= context;
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

        public IAnnswerRepository Answer
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

        public IBookMarkRepository BookMark
        {
            get
            {
                if (_bookMarkRepository == null)
                {
                    _bookMarkRepository= new BookMarkRepository(_context);
                }
                return _bookMarkRepository;
            }
        }

        public ISubjectsOfGradeRepository SubjectsOfGrade
        {
            get
            {
                if (_subjectsOfGradeRepository == null)
                {
                    _subjectsOfGradeRepository = new SubjectsOfGradeRepository(_context);
                }
                return _subjectsOfGradeRepository;
            }
        }

        public IHistoryRepository History
        {
            get
            {
                if (_historyRepository == null)
                {
                    _historyRepository = new HistoryRepository(_context);
                }
                return _historyRepository;
            }
        }

        public IBillRepository Bill
        {
            get
            {
                if (_billRepository == null)
                {
                    _billRepository = new BillRepository(_context);
                }
                return _billRepository;
            }
        }

        public IFavoriteRepository Favorite
        {
            get
            {
                if (_favoriteRepository == null)
                {
                    _favoriteRepository= new FavoriteRepository(_context);
                }
                return _favoriteRepository;
            }
        }

        public IClassRepository Class
        {
            get
            {
                if (_classRepository == null)
                {
                    _classRepository= new ClassRepository(_context);
                }
                return _classRepository;
            }
        }

        public IClassMemberRepository ClassMember
        {
            get
            {
                if (_classMemberRepository == null)
                {
                    _classMemberRepository= new ClassMemberRepository(_context);
                }
                return _classMemberRepository;
            }
        }

        public IStudySetClassRepository StudySetClass
        {
            get
            {
                if (_studySetClassRepository == null)
                {
                    _studySetClassRepository= new StudySetClassRepository(_context);
                }
                return _studySetClassRepository;
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
