using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
   public  partial class Library
    {
        // public Library() { }


        public int Id { get; set; }
        public bool editable { get; set; }

        //private-1 public-2
        public int visibility { get; set; }
        public int userId { get; set; }

        public int status { get; set; }
        public int?  number { get; set; }
        public string libraryName { get; set; }
        public int? OrganizationID { get; set; }


    }
}
