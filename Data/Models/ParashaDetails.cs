using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class ParashaDetails
    {
        public int Id { get; set; }
        public int StoryId { get; set; }
        public int BookId { get; set; }
        public int ChapterIdStart { get; set; }
        public int ChapterIdEnd { get; set; }
        public string PasukStart { get; set; }
        public string PasukEnd { get; set; }
        public string SentenceIdStart { get; set; }
        public string SentenceIdEnd { get; set; }
        public string BookName { get; set; }
        public string ChapterNameStart { get; set; }
        public string ChapterNameEnd { get; set; }
    }
}
