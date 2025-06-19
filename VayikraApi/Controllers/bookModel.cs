using Data.Models;
using DocumentFormat.OpenXml.Office.CoverPageProps;
using DocumentFormat.OpenXml.Office2010.Excel;
using System.ComponentModel.DataAnnotations.Schema;
using static Google.Cloud.Vision.V1.BatchOperationMetadata.Types;

public class bookModel : Book
{
    [NotMapped]
    public bool ContinueReading { get; set; }

    public bookModel(Book book, bool continueReading)
    {
        // Copy all properties from Book
        Id = book.Id;
        BookName = book.BookName;
        AuthorName = book.AuthorName;
        PublishDate = book.PublishDate;
        Summery = book.Summery;
        LangId = book.LangId;
        Gener = book.Gener;
        AgeGroup = book.AgeGroup;
        AudioBookName = book.AudioBookName;
        AudioSummery = book.AudioSummery;
        Chapters = book.Chapters;
        image = book.image;
        OrganizationId = book.OrganizationId;
        UserId = book.UserId;
        State = book.State;
        AgeGroupTxt = book.AgeGroupTxt;
        Announcer = book.Announcer;
        BookNameEng = book.BookNameEng;
        GenerTxt = book.GenerTxt;
        IsReadup = book.IsReadup;
        IsVayikra = book.IsVayikra;
        LangVal = book.LangVal;
        LibraryId = book.LibraryId;
        NumberOfChapters = book.NumberOfChapters;
        SentencesGap = book.SentencesGap;
        SilenceDecibels = book.SilenceDecibels;
        SilenceTime = book.SilenceTime;

        // Set the ContinueReading property
        ContinueReading = continueReading;
    }
}
