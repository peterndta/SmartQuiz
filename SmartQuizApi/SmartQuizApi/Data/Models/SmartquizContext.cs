using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SmartQuizApi.Data.Models;

public partial class SmartquizContext : DbContext
{
    public SmartquizContext()
    {
    }

    public SmartquizContext(DbContextOptions<SmartquizContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Bill> Bills { get; set; }

    public virtual DbSet<Class> Classes { get; set; }

    public virtual DbSet<ClassMember> ClassMembers { get; set; }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<Method> Methods { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<School> Schools { get; set; }

    public virtual DbSet<StudySet> StudySets { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<TestResult> TestResults { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<BookMark> BookMarks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=34.143.204.78;Database=Smartquiz;uid=sqlserver;pwd=123456789;Trusted_Connection=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookMark>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.StudySetId });
            entity.HasOne(e => e.StudySet)
            .WithMany(e => e.BookMarks)
            .HasForeignKey(e => e.StudySetId)
            ;
            entity.HasOne(e => e.User)
            .WithMany(e => e.BookMarks)
            .HasForeignKey(e => e.UserId)
            ;
        });
        modelBuilder.Entity<Answer>(entity =>
        {
            entity.Property(e => e.IsCorrectAnswer).HasColumnName("Is_correct_answer");
            entity.Property(e => e.QuestionId)
                .HasMaxLength(50)
                .HasColumnName("Question_id");

            entity.HasOne(d => d.Question).WithMany(p => p.Answers)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
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
            entity.Property(e => e.MethodId).HasColumnName("Method_id");
            entity.Property(e => e.NumberOfMonths).HasColumnName("Number_of_months");
            entity.Property(e => e.PaymentDate)
                .HasColumnType("date")
                .HasColumnName("Payment_date");
            entity.Property(e => e.TotalAmount).HasColumnName("Total_amount");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.Method).WithMany(p => p.Bills)
                .HasForeignKey(d => d.MethodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Bills_Methods");

            entity.HasOne(d => d.User).WithMany(p => p.Bills)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Bills_Users");
        });

        modelBuilder.Entity<Class>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreateAt)
                .HasColumnType("date")
                .HasColumnName("Create_at");
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
            entity.HasKey(e => new { e.ClassId, e.MemberId });

            entity.ToTable("ClassMember");

            entity.Property(e => e.ClassId).HasColumnName("Class_id");
            entity.Property(e => e.MemberId).HasColumnName("Member_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("date")
                .HasColumnName("Create_at");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("date")
                .HasColumnName("Update_at");

            entity.HasOne(d => d.Class).WithMany(p => p.ClassMembers)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassMember_Classes");

            entity.HasOne(d => d.Member).WithMany(p => p.ClassMembers)
                .HasForeignKey(d => d.MemberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassMember_Users");
        });

        modelBuilder.Entity<Grade>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Method>(entity =>
        {
            entity.Property(e => e.AmountPerMonth).HasColumnName("Amount_per_month");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(50);
            entity.Property(e => e.StudySetId)
                .HasMaxLength(50)
                .HasColumnName("Study_set_id");

            entity.HasOne(d => d.StudySet).WithMany(p => p.Questions)
                .HasForeignKey(d => d.StudySetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questions_StudySets");
        });

        modelBuilder.Entity<School>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Schools_1");
        });

        modelBuilder.Entity<StudySet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Study_set");

            entity.Property(e => e.Id).HasMaxLength(50);
            entity.Property(e => e.ClassId).HasColumnName("Class_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("date")
                .HasColumnName("Create_at");
            entity.Property(e => e.GradeId).HasColumnName("Grade_id");
            entity.Property(e => e.IsPublic).HasColumnName("Is_public");
            entity.Property(e => e.SchoolId).HasColumnName("School_id");
            entity.Property(e => e.SubjectId).HasColumnName("Subject_id");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("date")
                .HasColumnName("Update_at");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.Class).WithMany(p => p.StudySets)
                .HasForeignKey(d => d.ClassId)
                .HasConstraintName("FK_StudySets_Classes");

            entity.HasOne(d => d.Grade).WithMany(p => p.StudySets)
                .HasForeignKey(d => d.GradeId)
                .HasConstraintName("FK_StudySets_Grades");

            entity.HasOne(d => d.School).WithMany(p => p.StudySets)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_StudySets_Schools");

            entity.HasOne(d => d.Subject).WithMany(p => p.StudySets)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK_StudySets_Subjects");

            entity.HasOne(d => d.User).WithMany(p => p.StudySetsNavigation)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudySets_Users");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(50);
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
                .OnDelete(DeleteBehavior.ClientSetNull)
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
            entity.Property(e => e.ImageUrl).HasColumnName("Image_url");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .HasColumnName("Phone_number");
            entity.Property(e => e.Role)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasMany(d => d.StudySets).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Bookmark",
                    r => r.HasOne<StudySet>().WithMany()
                        .HasForeignKey("StudySetId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_Bookmarks_StudySets"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_Bookmarks_Users"),
                    j =>
                    {
                        j.HasKey("UserId", "StudySetId");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
