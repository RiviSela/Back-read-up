using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class TreatmentPurchase
    {
        public long Id { get; set; }
        public int? OrganizationId { get; set; }
        public int? LearningCenterId { get; set; }
        public int? UserId { get; set; }
        public int Count { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Comment { get; set; }

        public virtual LearningCenter LearningCenter { get; set; }
        public virtual Organization Organization { get; set; }
    }
}
