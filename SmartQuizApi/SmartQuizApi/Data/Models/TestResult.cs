using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class TestResult
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string StudySetId { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public int TotalQuestion { get; set; }

    public int TotalCorrect { get; set; }

    public virtual StudySet StudySet { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
