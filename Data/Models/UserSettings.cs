using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public partial class UserSettings
    {
        public int Id { get; set; }
        public int Role { get; set; }
        public string echo { get; set; }
        public string userId { get; set; }
        public string read { get; set; }
        public string marker { get; set; }

    }
}
