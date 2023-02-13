using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class Subject
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<SubjectsOfGrade> SubjectsOfGrades { get; } = new List<SubjectsOfGrade>();
}
