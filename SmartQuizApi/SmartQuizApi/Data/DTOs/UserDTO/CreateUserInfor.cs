namespace SmartQuizApi.Data.DTOs.UserDTO
{
    public class CreateUserInfor
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? PhoneNumber { get; set; }

        //public string? Password { get; set; }

        public string? ImageUrl { get; set; }

        public int GradeId { get; set; }

        public List<int> ListSubjectsId { get; set; }
    }
}
