﻿using SmartQuizApi.Data.DTOs.QuestionDTOs;
using SmartQuizApi.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace SmartQuizApi.Data.DTOs.StudySetDTOs
{
    public class GetStudySetDetailsDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Creator { get; set; }

        public int UserId { get; set; }

        public int SchoolId { get; set; }

        public int GradeId { get; set; }

        public int SubjectId { get; set; }

        public int? ClassId { get; set; }

        public bool IsPublic { get; set; }

        public List<GetQuestionDTO>? Questions { get; set; }
    }
}