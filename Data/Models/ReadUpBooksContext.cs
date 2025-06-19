using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Data.Models
{
    public partial class ReadUpBooksContext : DbContext
    {
        public ReadUpBooksContext()
        {
        }

        public ReadUpBooksContext(DbContextOptions<ReadUpBooksContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AgeGroup> AgeGroups { get; set; }
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Chapter> Chapters { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Disability> Disabilities { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }
        public virtual DbSet<ReadupEn> ReadupEn { get; set; }

        public virtual DbSet<ReadupHe> ReadupHe { get; set; }

        public virtual DbSet<Library> Library { get; set; }

        public virtual DbSet<HaftaraDetail> HaftaraDetails { get; set; }
        public virtual DbSet<Interest> Interests { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<LearningCenter> LearningCenters { get; set; }
        public virtual DbSet<Organization> Organizations { get; set; }
        public virtual DbSet<Parashot> Parashots { get; set; }
        public virtual DbSet<PaymentType> PaymentTypes { get; set; }
        public virtual DbSet<ReadingLevel> ReadingLevels { get; set; }
        public virtual DbSet<SchoolType> SchoolTypes { get; set; }
        public virtual DbSet<Sentence> Sentences { get; set; }
        public virtual DbSet<StoriesDetail> StoriesDetail { get; set; }
        public virtual DbSet<Stories> Stories { get; set; }
        public virtual DbSet<ToraDetail> ToraDetails { get; set; }
        public virtual DbSet<TreatmentPurchase> TreatmentPurchases { get; set; }
        public virtual DbSet<TreatmetType> TreatmetTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserProfile1> UserProfile1s { get; set; }
        public virtual DbSet<Word> Words { get; set; }
        public virtual DbSet<UserSettings> UserSettings { get; set; }

        public virtual DbSet<UserRead> UserRead { get; set; }

        public virtual DbSet<UserReadLast> UserReadLast { get; set; }
        public virtual DbSet<ParashaDetails> ParashaDetails { get; set; }

        public virtual DbSet<UserReadParashot> UserReadParashot { get; set; }

        public virtual DbSet<UserReadLastParashot> UserReadLastParashot { get; set; }

        public virtual DbSet<UserReadStories> UserReadStories { get; set; }

        public virtual DbSet<UserReadLastStories> UserReadLastStories { get; set; }

        public virtual DbSet<Pricing_organization> Pricing_organization { get; set; }
        public virtual DbSet<Pricing_users> Pricing_users { get; set; }
        public virtual DbSet<Pricing_discount> Pricing_discount { get; set; }

        public virtual DbSet<TextLength> TextLength { get; set; }


        public virtual DbSet<SplitRules> SplitRules { get; set; }






        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //       optionsBuilder.UseSqlServer("Server=199.244.49.20;Database=ReadUpBooks;User Id=admin;Password=LmC958Pgah");
                //PROD
                //optionsBuilder.UseSqlServer("Server=104.238.214.197;Database=ReadUpBooks_prod;User Id=admin;Password=aN5jA2dH9dH7hX");

                //TEST
                //optionsBuilder.UseSqlServer("Server=104.238.215.172,61320;Database=ReadUpBooks_prod_new;User Id=admin;Password=aN5jA2dH9dH7hX;Connect Timeout=30;",
                //    options => options.EnableRetryOnFailure(
                //        maxRetryCount: 3,
                //        maxRetryDelay: TimeSpan.FromSeconds(5),
                //        errorNumbersToAdd: null)
                //    );

                // optionsBuilder.UseSqlServer("Server=3U7SWIZ2Q8LTDJ\\SQLEXPRESS;Database=ReadUpBooks_prod_new;User Id=admin;Password=  3U7SWIZ2Q8LTDJ\SQLEXPRESS;TrustServerCertificate=True;");

                //optionsBuilder.UseSqlServer("Server=DESKTOP-KND1ATC\\SQLEXPRESS;Database=ReadUpBooks_prod_new;Trusted_Connection=True;TrustServerCertificate=True;");

                optionsBuilder.UseSqlServer("Server=104.238.215.172;Database=ReadUpBooks_prod;User Id=admin;Password=aN5jA2dH9dH7hX");


            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserSettings>().ToTable("UserSettings");
            modelBuilder.Entity<UserRead>().ToTable("UserRead");
            modelBuilder.Entity<UserReadLast>().ToTable("UserReadLast");
            modelBuilder.Entity<ParashaDetails>().ToTable("ParashaDetails");
            modelBuilder.Entity<UserReadLastParashot>().ToTable("UserReadLastParashot");
            modelBuilder.Entity<UserReadParashot>().ToTable("UserReadParashot");
            modelBuilder.Entity<UserReadLastStories>().ToTable("UserReadLastStories");
            modelBuilder.Entity<UserReadStories>().ToTable("UserReadStories");

            modelBuilder.Entity<Pricing_organization>().ToTable("Pricing_organization");
            modelBuilder.Entity<Pricing_users>().ToTable("Pricing_users");  
            modelBuilder.Entity<Pricing_discount>().ToTable("Pricing_discount");
            modelBuilder.Entity<TextLength>().ToTable("TextLength");
            modelBuilder.Entity<SplitRules>().ToTable("SplitRules");
            




            modelBuilder.Entity<ReadupEn>().ToTable("ReadupEn");


            modelBuilder.Entity<ReadupHe>().ToTable("ReadupHe");



            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AgeGroup>(entity =>
            {
                entity.ToTable("AgeGroup");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AgeGroup).HasColumnName("ageGroup");

                entity.Property(e => e.AgeGroupTxt)
                    .HasMaxLength(120)
                    .HasColumnName("ageGroupTxt");

                entity.Property(e => e.AudioBookName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("audioBookName");

                entity.Property(e => e.AudioSummery)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("audioSummery");

                entity.Property(e => e.AuthorName).HasMaxLength(255);

                entity.Property(e => e.BookName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Gener).HasColumnName("gener");

                entity.Property(e => e.GenerTxt)
                    .HasMaxLength(120)
                    .HasColumnName("generTxt");

                entity.Property(e => e.LangVal)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.NumberOfChapters).HasColumnName("numberOfChapters");

                entity.Property(e => e.PublishDate).HasColumnType("datetime");

                entity.Property(e => e.Summery).HasMaxLength(4000);
            });

            modelBuilder.Entity<Chapter>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ChapterName).HasMaxLength(255);

                entity.Property(e => e.DocPath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LibraryId)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("LibraryID");

                entity.Property(e => e.Mp3Path)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SttLines)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("sttLines");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Chapters)
                    .HasForeignKey(d => d.BookId)
                    .HasConstraintName("FK__Chapters__BookId__25869641");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.HasKey(e => e.Iso)
                    .HasName("PK__Country__DC509074693CA210");

                entity.ToTable("Country");

                entity.Property(e => e.Iso)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("iso")
                    .IsFixedLength(true);

                entity.Property(e => e.BigName)
                    .IsRequired()
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Iso3)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("iso3")
                    .IsFixedLength(true);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(80)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Numcode).HasColumnName("numcode");
            });

            modelBuilder.Entity<Disability>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<Genre>(entity =>
           {
                entity.ToTable("Genre");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<HaftaraDetail>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BookName).HasMaxLength(200);

                entity.Property(e => e.ChapterName).HasMaxLength(200);

                entity.Property(e => e.PasukEnd).HasMaxLength(200);

                entity.Property(e => e.PasukStart).HasMaxLength(200);

                entity.Property(e => e.SentenceIdEnd).HasMaxLength(200);

                entity.Property(e => e.SentenceIdStart).HasMaxLength(200);
            });

            modelBuilder.Entity<Interest>(entity =>
            {
                entity.ToTable("Interest");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Language1)
                    .HasMaxLength(100)
                    .HasColumnName("Language");

                entity.Property(e => e.Rtl).HasColumnName("RTL");

                entity.Property(e => e.Stt)
                    .HasMaxLength(20)
                    .HasColumnName("STT");
            });

            modelBuilder.Entity<LearningCenter>(entity =>
            {
                entity.ToTable("LearningCenter");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Allocate).HasColumnName("allocate");

                entity.Property(e => e.Availble).HasColumnName("availble");

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .HasColumnName("city");

                entity.Property(e => e.CountryCode).HasMaxLength(50);

                entity.Property(e => e.EmailAddress).HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.OrganizationId).HasColumnName("organizationId");

                entity.Property(e => e.Purchase).HasColumnName("purchase");

                entity.Property(e => e.ZipCode).HasMaxLength(100);

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.LearningCenters)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK__LearningC__organ__0DAF0CB0");
            });

            modelBuilder.Entity<Organization>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Allocate).HasColumnName("allocate");

                entity.Property(e => e.Availble).HasColumnName("availble");

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .HasColumnName("city");

                entity.Property(e => e.CountryCode).HasMaxLength(50);

                entity.Property(e => e.EmailAddress).HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Purchase).HasColumnName("purchase");

                entity.Property(e => e.ZipCode).HasMaxLength(100);
            });
            modelBuilder.Entity<Library>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.editable).HasColumnName("editable");
                entity.Property(e => e.visibility).HasColumnName("visibility");
                entity.Property(e=> e.userId).HasColumnName("UserId");
                entity.Property(e => e.libraryName).HasColumnName("libraryName");
                entity.Property(e => e.OrganizationID).HasColumnName("OrganizationID");

            });
            modelBuilder.Entity<Parashot>(entity =>
            {
                entity.ToTable("Parashot");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<PaymentType>(entity =>
            {
                entity.ToTable("PaymentType");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<ReadingLevel>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<SchoolType>(entity =>
            {
                entity.ToTable("SchoolType");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<Sentence>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ChapterId).HasColumnName("chapterId");

                entity.Property(e => e.Confidence).HasColumnName("confidence");

                entity.Property(e => e.End).HasColumnName("end");

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasColumnName("insertDate");

                entity.Property(e => e.Start).HasColumnName("start");

                entity.Property(e => e.Transcript)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("transcript");

                entity.Property(e => e.Words).HasColumnName("words");

                entity.HasOne(d => d.Chapter)
                    .WithMany(p => p.Sentences)
                    .HasForeignKey(d => d.ChapterId)
                    .HasConstraintName("FK__Sentences__chapt__3A81B327");
            });

            modelBuilder.Entity<StoriesDetail>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BookName).HasMaxLength(200);

                entity.Property(e => e.ChapterNameStart).HasMaxLength(200);

                entity.Property(e => e.ChapterNameEnd).HasMaxLength(200);

                entity.Property(e => e.PasukEnd).HasMaxLength(200);

                entity.Property(e => e.PasukStart).HasMaxLength(200);

                entity.Property(e => e.SentenceIdEnd).HasMaxLength(200);

                entity.Property(e => e.SentenceIdStart).HasMaxLength(200);
            });

            modelBuilder.Entity<Stories>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<ToraDetail>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BookName).HasMaxLength(200);

                entity.Property(e => e.ChapterName).HasMaxLength(200);

                entity.Property(e => e.PasukEnd).HasMaxLength(200);

                entity.Property(e => e.PasukStart).HasMaxLength(200);

                entity.Property(e => e.SentenceIdEnd).HasMaxLength(200);

                entity.Property(e => e.SentenceIdStart).HasMaxLength(200);
            });

            modelBuilder.Entity<TreatmentPurchase>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.CreatedByName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LearningCenterId).HasColumnName("LearningCenterID");

                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.LearningCenter)
                    .WithMany(p => p.TreatmentPurchases)
                    .HasForeignKey(d => d.LearningCenterId)
                    .HasConstraintName("FK__Treatment__Learn__08B54D69");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TreatmentPurchases)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK__Treatment__Organ__09A971A2");
            });

            modelBuilder.Entity<TreatmetType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.AgeGroup)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Allocate).HasColumnName("allocate");

                entity.Property(e => e.Availble).HasColumnName("availble");

                entity.Property(e => e.BirthDate)
                    .HasColumnType("datetime")
                    .HasColumnName("birthDate");

                entity.Property(e => e.City)
                    .HasMaxLength(105)
                    .HasColumnName("city");

                entity.Property(e => e.Country).HasMaxLength(200);

                entity.Property(e => e.Disabilities)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Email)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Gender)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Interesets)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.LearningCenterId).HasColumnName("learningCenterId");

                entity.Property(e => e.LibraryMemberId)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationId).HasColumnName("organizationId");

                entity.Property(e => e.ParentName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.PaymentType)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Purchase).HasColumnName("purchase");

                entity.Property(e => e.Role)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.SchoolType)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Telephone)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TreatmetTypes).HasMaxLength(255);

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ZipCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.LearningCenter)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.LearningCenterId)
                    .HasConstraintName("FK__Users__learningC__2C3393D0");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK__Users__organizat__2D27B809");
            });

            modelBuilder.Entity<UserProfile1>(entity =>
            {
                entity.ToTable("UserProfile1");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Level).HasMaxLength(200);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Time).HasMaxLength(200);

                entity.Property(e => e.Usrid).HasColumnName("usrid");
            });

            modelBuilder.Entity<Word>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.EndTime).HasColumnName("endTime");

                entity.Property(e => e.SentenceId).HasColumnName("sentenceID");

                entity.Property(e => e.StartTime).HasColumnName("startTime");

                entity.Property(e => e.Word1)
                    .HasMaxLength(150)
                    .HasColumnName("word");

                entity.HasOne(d => d.Sentence)
                    .WithMany(p => p.WordsNavigation)
                    .HasForeignKey(d => d.SentenceId)
                    .HasConstraintName("FK__Words__sentenceI__4E88ABD4");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
