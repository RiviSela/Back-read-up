using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class StoriesDetail
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
