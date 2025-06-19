using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Word
    {
        public int Id { get; set; }
        public double? StartTime { get; set; }
        public double? EndTime { get; set; }
        public string Word1 { get; set; }
        public int? SentenceId { get; set; }

        public virtual Sentence Sentence { get; set; }
    }
}
