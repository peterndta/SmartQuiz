using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class Class
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int UserId { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public string Description { get; set; } = null!;

    public string JoinCode { get; set; } = null!;

    public virtual ICollection<ClassMember> ClassMembers { get; } = new List<ClassMember>();

    public virtual ICollection<StudySetClass> StudySetClasses { get; } = new List<StudySetClass>();

    public virtual User User { get; set; } = null!;
}
