using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class UserProfile1
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
        public string Time { get; set; }
        public int? Usrid { get; set; }
        public int? UsersId { get; set; }
    }
}
