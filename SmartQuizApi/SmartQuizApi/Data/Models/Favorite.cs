using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class Favorite
{
    public int UserId { get; set; }

    public int SubjectsOfGradeId { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual SubjectsOfGrade SubjectsOfGrade { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
