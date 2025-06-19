using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Book
    {
        public Book()
        {
            Chapters = new HashSet<Chapter>();
        }
        public int Id { get; set; }
        public string BookName { get; set; }
        public string BookNameEng { get; set; }
        public string AuthorName { get; set; }
        public DateTime? PublishDate { get; set; }
        public int? NumberOfChapters { get; set; }
        public string Summery { get; set; }
        public double? SentencesGap { get; set; }
        public double? SilenceDecibels { get; set; }
        public double? SilenceTime { get; set; }
        public int? LangId { get; set; }
        public string LangVal { get; set; }
        public int LibraryId { get; set; }
        public int? Gener { get; set; }
        public int? AgeGroup { get; set; }
        public string GenerTxt { get; set; }
        public string AgeGroupTxt { get; set; }
        public string AudioBookName { get; set; }
        public string AudioSummery { get; set; }

        public virtual ICollection<Chapter> Chapters { get; set; }

        public bool IsVayikra { get; set; }
        public bool IsReadup { get; set; }

        public string image { get; set; }

        public int OrganizationId { get; set; }

        public int UserId { get; set; }

        public int State { get; set; }

        public string Announcer { get; set; }
    }
}
