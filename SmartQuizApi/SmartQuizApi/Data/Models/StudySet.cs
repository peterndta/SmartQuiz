using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class StudySet
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int UserId { get; set; }

    public int? SchoolId { get; set; }

    public int? GradeId { get; set; }

    public int? SubjectId { get; set; }

    public int? ClassId { get; set; }

    public bool IsPublic { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public virtual Class? Class { get; set; }

    public virtual Grade? Grade { get; set; }

    public virtual ICollection<Question> Questions { get; } = new List<Question>();

    public virtual School? School { get; set; }

    public virtual Subject? Subject { get; set; }

    public virtual ICollection<TestResult> TestResults { get; } = new List<TestResult>();

    public virtual User User { get; set; } = null!;

    public virtual ICollection<User> Users { get; } = new List<User>();
    public virtual ICollection<BookMark> BookMarks { get; set; }
}
