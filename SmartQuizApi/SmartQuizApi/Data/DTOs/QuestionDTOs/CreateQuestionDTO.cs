using SmartQuizApi.Data.DTOs.AnswerDTOs;

namespace SmartQuizApi.Data.DTOs.QuestionDTOs
{
    public class CreateQuestionDTO
    {
        public string Name { get; set; }

        public string? ImageUrl { get; set; }

        public List<CreateAnwserDTO> Answers { get; set; }
    }
}
