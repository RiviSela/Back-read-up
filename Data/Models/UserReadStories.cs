﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class UserReadStories
    {
        public int Id { get; set; }
        public int parashaId { get; set; }

        public int userId { get; set; }
        public int bookId { get; set; }
        public int chapterId { get; set; }
        public int sentenceId { get; set; }
        public string sentenceText { get; set; }
        public int index { get; set; }
        public int i { get; set; }
        public int stories_index { get; set; }
    }
}
