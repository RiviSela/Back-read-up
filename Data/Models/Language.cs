using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Language
    {
        public int Id { get; set; }
        public string Language1 { get; set; }
        public bool? Rtl { get; set; }
        public string Stt { get; set; }
    }
}
