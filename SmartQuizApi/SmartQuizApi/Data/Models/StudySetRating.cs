using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class StudySetRating
{
    public string StudySetId { get; set; } = null!;

    public int UserId { get; set; }

    public double Rating { get; set; }

    public virtual StudySet StudySet { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
