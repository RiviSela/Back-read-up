using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VayikraApi.Models
{
    public class SentenceRsp
    {
        public SentenceRsp()
        {
            WordsNavigation = new HashSet<Word>();
        }

        public int Id { get; set; }
        public string Transcript { get; set; }
        public double? Confidence { get; set; }
        public DateTime? InsertDate { get; set; }
        public int? Words { get; set; }
        public int? ChapterId { get; set; }
        public string ChapterName { get; set; }
        public string ChapterNameEng { get; set; }
        public bool nextChapter { get; set; }
        
        public double? Start { get; set; }
        public double? End { get; set; }

        public virtual Chapter Chapter { get; set; }
        public virtual ICollection<Word> WordsNavigation { get; set; }

        public string Pasuk { get; set; }
        public string Lastpasuk { get; set; }

        
    }
}
