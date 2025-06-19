using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Sentence
    {
        public Sentence()
        {
            WordsNavigation = new HashSet<Word>();
        }

        public int Id { get; set; }
        public string Transcript { get; set; }
        public double? Confidence { get; set; }
        public DateTime? InsertDate { get; set; }
        public int? Words { get; set; }
        public int? ChapterId { get; set; }
        public double? Start { get; set; }
        public double? End { get; set; }

        public virtual Chapter Chapter { get; set; }
        public virtual ICollection<Word> WordsNavigation { get; set; }

        public bool? notTitles { get; set; }
    }
}
