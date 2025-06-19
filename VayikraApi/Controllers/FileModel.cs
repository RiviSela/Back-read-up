using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace VayikraApi.Controllers
{
    public class FileModel
    {
        public int bookId { get; set; }
        public string bookName { get; set; }
        public string chaptersNames { get; set; }

        public IFormFile bookFile { get; set; }

        public List<IFormFile> chaptersFiles { get; set; }

        public int userId { get; set; }

        public int library { get; set; } 
        public string author { get; set; }
        public string undername { get; set; }
        public int language { get; set; }
        public string agegroup { get; set; }
        public int genre { get; set; }
        public string style { get; set; }
        public string voice { get; set; }
        public string message { get; set; }
        public string description { get; set; }
       public bool onlyChapters { get; set; }
    }
}