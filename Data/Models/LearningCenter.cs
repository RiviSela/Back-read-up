using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class LearningCenter
    {
        public LearningCenter()
        {
            TreatmentPurchases = new HashSet<TreatmentPurchase>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Telephone { get; set; }
        public int? Fax { get; set; }
        public string CountryCode { get; set; }
        public string ZipCode { get; set; }
        public string EmailAddress { get; set; }
        public int? OrganizationId { get; set; }
        public int? Purchase { get; set; }
        public int? Allocate { get; set; }
        public int? Availble { get; set; }
        public string City { get; set; }

        public virtual Organization Organization { get; set; }
        public virtual ICollection<TreatmentPurchase> TreatmentPurchases { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
