using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class SubjectsOfGrade
{
    public int GradeId { get; set; }

    public int SubjectId { get; set; }

    public int Id { get; set; }

    public virtual Grade Grade { get; set; } = null!;

    public virtual ICollection<StudySet> StudySets { get; } = new List<StudySet>();

    public virtual Subject Subject { get; set; } = null!;
}
