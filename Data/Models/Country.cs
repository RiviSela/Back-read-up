using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Country
    {
        public string Iso { get; set; }
        public string BigName { get; set; }
        public string Name { get; set; }
        public string Iso3 { get; set; }
        public short? Numcode { get; set; }
    }
}
