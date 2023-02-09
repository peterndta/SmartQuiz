using System.ComponentModel.DataAnnotations.Schema;

namespace SmartQuizApi.Data.Models
{
    public class BookMark
    {
        [Column("User_id")]
        public int UserId { get; set; }
        [Column("Study_set_id")]
        public string StudySetId { get; set; }
        public virtual StudySet StudySet { get;set; }
        public virtual User User { get; set; }
    }
}
