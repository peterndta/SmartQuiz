using SmartQuizApi.Data.DTOs.AnswerDTOs;

namespace SmartQuizApi.Data.DTOs.QuestionDTOs
{
    public class GetQuestionDTO
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool MultipleChoice { get; set; }

        public List<GetAnswerDTO>? Answers { get; set; }
    }
}
