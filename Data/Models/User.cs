using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string Role { get; set; }
        public int? OrganizationId { get; set; }
        public int? LearningCenterId { get; set; }
        public string UserId { get; set; }
        public string LibraryMemberId { get; set; }
        public int? IsUnder18 { get; set; }
        public int? IsMember { get; set; }
        public string ParentName { get; set; }
        public string Interesets { get; set; }
        public string SchoolType { get; set; }
        public string PaymentType { get; set; }
        public string Disabilities { get; set; }
        public string AgeGroup { get; set; }
        public int? ReadingLevel { get; set; }
        public int? NativeLang { get; set; }
        public int? SecondLang { get; set; }
        public string Password { get; set; }
        public int? Purchase { get; set; }
        public int? Allocate { get; set; }
        public int? Availble { get; set; }
        public string City { get; set; }
        public DateTime? BirthDate { get; set; }
        public string TreatmetTypes { get; set; }
        public bool freeze { get; set; }
        public string loginKey { get; set; }

        public virtual LearningCenter LearningCenter { get; set; }
        public virtual Organization Organization { get; set; }

        public DateTime? SubscribeLastDate { get; set; }

        public int? readTimer { get; set; }

        public string guid { get; set; }

        public string? guidTeacher { get; set; }
        public int linkCounter { get; set; }

        public string discount { get; set; }
        public string pricingGroup { get; set; }

        public int? currency { get; set; }

        public int? system { get; set; }



    }
}
