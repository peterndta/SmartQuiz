﻿namespace SmartQuizApi.Data.DTOs.UserDTO
{
    public class PremiumUserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int BillId { get; set; }

        public int Subcription { get; set; }

        public DateTime EffectiveDate { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}
