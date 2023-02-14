using SmartQuizApi.Data.DTOs.AnswerDTOs;

namespace SmartQuizApi.Data.DTOs.QuestionDTOs
{
    public class UpdateQuestionDTO
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public List<UpdateAnswerDTO> Answers { get; set; }
    }
}
