using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Chapter
    {
        public Chapter()
        {
            Sentences = new HashSet<Sentence>();
        }

        public int Id { get; set; }
        public string ChapterName { get; set; }
        public string ChapterNameEng { get; set; }
        
        public int? BookId { get; set; }
        public string DocPath { get; set; }
        public string Mp3Path { get; set; }
        public int? Status { get; set; }
        public string LibraryId { get; set; }
        public string Title { get; set; }
        
        public string SttLines { get; set; }
        public double? SilenceDecibels { get; set; }
        public double? SilenceTime { get; set; }

        public virtual Book Book { get; set; }
        public virtual ICollection<Sentence> Sentences { get; set; }
    }
}
