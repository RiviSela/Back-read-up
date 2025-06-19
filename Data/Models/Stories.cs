using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Stories
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }

        public string Image { get; set; }

        public string shortStory { get; set; }
    }
}
