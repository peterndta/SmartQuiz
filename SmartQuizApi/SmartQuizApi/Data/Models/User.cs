using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Password { get; set; }

    public string Role { get; set; } = null!;

    public string? ImageUrl { get; set; }

    public virtual ICollection<Bill> Bills { get; } = new List<Bill>();

    public virtual ICollection<ClassMember> ClassMembers { get; } = new List<ClassMember>();

    public virtual ICollection<Class> Classes { get; } = new List<Class>();

    public virtual ICollection<StudySet> StudySetsNavigation { get; } = new List<StudySet>();

    public virtual ICollection<TestResult> TestResults { get; } = new List<TestResult>();

    public virtual ICollection<StudySet> StudySets { get; } = new List<StudySet>();
    public virtual ICollection<BookMark> BookMarks { get; set; }
}
