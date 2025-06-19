using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.TextSplit
{
    public class TextAnnotationEntity
    {
        public string Description { get; set; }
        public BoundingPoly BoundingPoly { get; set; }
    }
}
