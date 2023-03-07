using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class StudySetClass
{
    public string StudySetId { get; set; } = null!;

    public string ClassId { get; set; } = null!;

    public DateTime CreateDate { get; set; }

    public virtual Class Class { get; set; } = null!;

    public virtual StudySet StudySet { get; set; } = null!;
}
