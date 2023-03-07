using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SmartQuizApi.Data.Models;

public partial class DbA95102SmartquizContext : DbContext
{
    public DbA95102SmartquizContext()
    {
    }

    public DbA95102SmartquizContext(DbContextOptions<DbA95102SmartquizContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Bill> Bills { get; set; }

    public virtual DbSet<Bookmark> Bookmarks { get; set; }

    public virtual DbSet<Class> Classes { get; set; }

    public virtual DbSet<ClassMember> ClassMembers { get; set; }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<History> Histories { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<StudySet> StudySets { get; set; }

    public virtual DbSet<StudySetClass> StudySetClasses { get; set; }

    public virtual DbSet<StudySetRating> StudySetRatings { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<SubjectsOfGrade> SubjectsOfGrades { get; set; }

    public virtual DbSet<TestResult> TestResults { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=SQL8002.site4now.net;Database=db_a95102_smartquiz;uid=db_a95102_smartquiz_admin;pwd=aA@1234567890;Trusted_Connection=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Answer>(entity =>
        {
            entity.Property(e => e.IsCorrectAnswer).HasColumnName("Is_correct_answer");
            entity.Property(e => e.QuestionId)
                .HasMaxLength(50)
                .HasColumnName("Question_id");

            entity.HasOne(d => d.Question).WithMany(p => p.Answers)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK_Answers_Questions");
        });

        modelBuilder.Entity<Bill>(entity =>
        {
            entity.Property(e => e.EffectiveDate)
                .HasColumnType("date")
                .HasColumnName("Effective_date");
            entity.Property(e => e.ExpirationDate)
                .HasColumnType("date")
                .HasColumnName("Expiration_date");
            entity.Property(e => e.PayId)
                .HasMaxLength(50)
                .HasColumnName("Pay_id");
            entity.Property(e => e.PaymentDate)
                .HasColumnType("date")
                .HasColumnName("Payment_date");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.User).WithMany(p => p.Bills)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Bills_Users");
        });

        modelBuilder.Entity<Bookmark>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.StudySetId });

            entity.Property(e => e.UserId).HasColumnName("User_id");
            entity.Property(e => e.StudySetId)
                .HasMaxLength(50)
                .HasColumnName("Study_set_id");
            entity.Property(e => e.CreateDate)
                .HasColumnType("datetime")
                .HasColumnName("Create_date");

            entity.HasOne(d => d.StudySet).WithMany(p => p.Bookmarks)
                .HasForeignKey(d => d.StudySetId)
                .HasConstraintName("FK_Bookmarks_StudySets");

            entity.HasOne(d => d.User).WithMany(p => p.Bookmarks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Bookmarks_Users");
        });

        modelBuilder.Entity<Class>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(50);
            entity.Property(e => e.CreateAt)
                .HasColumnType("date")
                .HasColumnName("Create_at");
            entity.Property(e => e.JoinCode)
                .HasMaxLength(50)
                .HasColumnName("Join_code");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("date")
                .HasColumnName("Update_at");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.User).WithMany(p => p.Classes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Classes_Users");
        });

        modelBuilder.Entity<ClassMember>(entity =>
        {
            entity.HasKey(e => new { e.ClassId, e.UserId });

            entity.ToTable("ClassMember");

            entity.Property(e => e.ClassId)
                .HasMaxLength(50)
                .HasColumnName("Class_id");
            entity.Property(e => e.UserId).HasColumnName("User_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("date")
                .HasColumnName("Create_at");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("date")
                .HasColumnName("Update_at");

            entity.HasOne(d => d.Class).WithMany(p => p.ClassMembers)
                .HasForeignKey(d => d.ClassId)
                .HasConstraintName("FK_ClassMember_Classes");

            entity.HasOne(d => d.User).WithMany(p => p.ClassMembers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassMember_Users");
        });

        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.SubjectsOfGradeId });

            entity.Property(e => e.UserId).HasColumnName("User_id");
            entity.Property(e => e.SubjectsOfGradeId).HasColumnName("Subjects_of_grade_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("Create_at");

            entity.HasOne(d => d.SubjectsOfGrade).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.SubjectsOfGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Favorites_SubjectsOfGrade");

            entity.HasOne(d => d.User).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Favorites_Users");
        });

        modelBuilder.Entity<Grade>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<History>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.StudySetId });

            entity.Property(e => e.UserId).HasColumnName("User_id");
            entity.Property(e => e.StudySetId)
                .HasMaxLength(50)
                .HasColumnName("Study_set_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("Create_at");

            entity.HasOne(d => d.StudySet).WithMany(p => p.Histories)
                .HasForeignKey(d => d.StudySetId)
                .HasConstraintName("FK_Histories_StudySets");

            entity.HasOne(d => d.User).WithMany(p => p.Histories)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Histories_Users");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(50);
            entity.Property(e => e.ImageUrl).HasColumnName("Image_url");
            entity.Property(e => e.StudySetId)
                .HasMaxLength(50)
                .HasColumnName("Study_set_id");

            entity.HasOne(d => d.StudySet).WithMany(p => p.Questions)
                .HasForeignKey(d => d.StudySetId)
                .HasConstraintName("FK_Questions_StudySets");
        });

        modelBuilder.Entity<StudySet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Study_set");

            entity.Property(e => e.Id).HasMaxLength(50);
            entity.Property(e => e.CreateAt)
                .HasColumnType("date")
                .HasColumnName("Create_at");
            entity.Property(e => e.IsPublic).HasColumnName("Is_public");
            entity.Property(e => e.SubjectsOfGradeId).HasColumnName("SubjectsOfGrade_id");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("date")
                .HasColumnName("Update_at");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.SubjectsOfGrade).WithMany(p => p.StudySets)
                .HasForeignKey(d => d.SubjectsOfGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudySets_SubjectsOfGrade");

            entity.HasOne(d => d.User).WithMany(p => p.StudySets)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudySets_Users");
        });

        modelBuilder.Entity<StudySetClass>(entity =>
        {
            entity.HasKey(e => new { e.StudySetId, e.ClassId });

            entity.Property(e => e.StudySetId)
                .HasMaxLength(50)
                .HasColumnName("Study_set_id");
            entity.Property(e => e.ClassId)
                .HasMaxLength(50)
                .HasColumnName("Class_id");
            entity.Property(e => e.CreateDate)
                .HasColumnType("datetime")
                .HasColumnName("Create_date");

            entity.HasOne(d => d.Class).WithMany(p => p.StudySetClasses)
                .HasForeignKey(d => d.ClassId)
                .HasConstraintName("FK_StudySetClasses_Classes");

            entity.HasOne(d => d.StudySet).WithMany(p => p.StudySetClasses)
                .HasForeignKey(d => d.StudySetId)
                .HasConstraintName("FK_StudySetClasses_StudySets");
        });

        modelBuilder.Entity<StudySetRating>(entity =>
        {
            entity.HasKey(e => new { e.StudySetId, e.UserId });

            entity.Property(e => e.StudySetId)
                .HasMaxLength(50)
                .HasColumnName("Study_set_id");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.StudySet).WithMany(p => p.StudySetRatings)
                .HasForeignKey(d => d.StudySetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudySetRatings_StudySets");

            entity.HasOne(d => d.User).WithMany(p => p.StudySetRatings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudySetRatings_Users");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<SubjectsOfGrade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_SubjectsOfGrade_1");

            entity.ToTable("SubjectsOfGrade");

            entity.Property(e => e.GradeId).HasColumnName("Grade_id");
            entity.Property(e => e.SubjectId).HasColumnName("Subject_id");

            entity.HasOne(d => d.Grade).WithMany(p => p.SubjectsOfGrades)
                .HasForeignKey(d => d.GradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectsOfGrade_Grades");

            entity.HasOne(d => d.Subject).WithMany(p => p.SubjectsOfGrades)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectsOfGrade_Subjects");
        });

        modelBuilder.Entity<TestResult>(entity =>
        {
            entity.Property(e => e.EndTime)
                .HasColumnType("date")
                .HasColumnName("End_time");
            entity.Property(e => e.StartTime)
                .HasColumnType("date")
                .HasColumnName("Start_time");
            entity.Property(e => e.StudySetId)
                .HasMaxLength(50)
                .HasColumnName("Study_set_id");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.StudySet).WithMany(p => p.TestResults)
                .HasForeignKey(d => d.StudySetId)
                .HasConstraintName("FK_TestResults_StudySets");

            entity.HasOne(d => d.User).WithMany(p => p.TestResults)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TestResults_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_User");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.GradeId).HasColumnName("Grade_id");
            entity.Property(e => e.ImageUrl).HasColumnName("Image_url");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .HasColumnName("Phone_number");
            entity.Property(e => e.Role).HasMaxLength(50);

            entity.HasOne(d => d.Grade).WithMany(p => p.Users)
                .HasForeignKey(d => d.GradeId)
                .HasConstraintName("FK_Users_Grades");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
