using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Organization
    {
        public Organization()
        {
            LearningCenters = new HashSet<LearningCenter>();
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
        public int? Purchase { get; set; }
        public int? Allocate { get; set; }
        public int? Availble { get; set; }
        public string City { get; set; }

        public string logo { get; set; }

        public virtual ICollection<LearningCenter> LearningCenters { get; set; }
        public virtual ICollection<TreatmentPurchase> TreatmentPurchases { get; set; }
        public virtual ICollection<User> Users { get; set; }

        public string discount { get; set; }
        public string pricingGroup { get; set; }

        public int? currency { get; set; }

        public int? system { get; set; }
    }
}
