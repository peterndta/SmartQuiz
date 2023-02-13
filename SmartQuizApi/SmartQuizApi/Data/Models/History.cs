using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class History
{
    public int UserId { get; set; }

    public string StudySetId { get; set; } = null!;

    public DateTime CreateAt { get; set; }

    public virtual StudySet StudySet { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
