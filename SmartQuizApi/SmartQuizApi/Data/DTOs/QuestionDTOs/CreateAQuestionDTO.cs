using SmartQuizApi.Data.DTOs.AnswerDTOs;

namespace SmartQuizApi.Data.DTOs.QuestionDTOs
{
    public class CreateAQuestionDTO
    {
        public string Name { get; set; }

        public string StudySetId { get; set; }

        public string? ImageUrl { get; set; }

        public List<CreateAnwserDTO> Answers { get; set; }
    }
}
