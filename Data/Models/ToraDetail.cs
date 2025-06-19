using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class ToraDetail
    {
        public int Id { get; set; }
        public int? ParashaId { get; set; }
        public int? BookId { get; set; }
        public int? ChapterId { get; set; }
        public string PasukStart { get; set; }
        public string PasukEnd { get; set; }
        public string SentenceIdStart { get; set; }
        public string SentenceIdEnd { get; set; }
        public string BookName { get; set; }
        public string ChapterName { get; set; }
    }
}
