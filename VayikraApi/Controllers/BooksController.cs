using Data.Models;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Office2010.Excel;
using Google.Api;
using Google.Cloud.TextToSpeech.V1;
using Google.Cloud.Vision.V1;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NAudio.Wave;
using SelectPdf;
using Spire.Doc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using VayikraApi.Business.BL.TextSplit;

namespace VayikraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly IConfiguration _configuration;

        public BooksController(IConfiguration configuration)
        {

            _configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<Book> Get()
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            List<Book> books = context.Books.Where(x => x.IsVayikra == true && x.Gener == 30).ToList();
            return books;
        }

        [HttpGet, Route("GetAllBooks")]
        public IEnumerable<Book> GetAllBooks()
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            List<Book> books = context.Books.ToList();
            return books;
        }
        [HttpGet, Route("GetCountBooks")]
        public int GetCountBooks(int id, int libraryId)
        {
            int count = 0;
            try
            {

                ReadUpBooksContext context = new ReadUpBooksContext();
                User user = context.Users.FirstOrDefault(x => x.Id == id);
                count = context.Books.Count(x => x.IsReadup == true && x.LibraryId == libraryId && x.State != 2);
                //&&(x.OrganizationId == 1 || x.OrganizationId == 0 || x.OrganizationId == user.OrganizationId));
            }
            catch
            {
                count = 0;
            }
            return count;
        }
        [HttpGet, Route("SearchBooksByName")]
        public IEnumerable<Book> SearchBooksByName(string searchTerm)
        {
            using (ReadUpBooksContext context = new ReadUpBooksContext())
            {
                List<Book> books = context.Books
                    .Where(x => x.BookName.ToUpper().Contains(searchTerm.ToUpper()) && x.IsReadup == true)
                    .ToList();

                return books;
            }
        }
     
 [HttpGet, Route("GetReadupBooks")]
        public IEnumerable<Book> GetReadupBooks(int id)
        {

            ReadUpBooksContext context = new ReadUpBooksContext();
            User user = context.Users.FirstOrDefault(x => x.Id == id);
            List<Book> books = context.Books.Where(x => x.IsReadup == true && x.State != 2 && (x.OrganizationId == 1 || x.OrganizationId == 0 || x.OrganizationId == user.OrganizationId)).ToList();
            //    books = books.Where(x => x.UserId == 0 || x.UserId == user.Id).ToList();

            return books;
        }
        //[HttpGet, Route("GetReadupBooksPagnation")]
        //public IEnumerable<Book> GetReadupBooksPagnation(int id, int pageNumber = 1, int pageSize = 10)
        //{
        //    ReadUpBooksContext context = new ReadUpBooksContext();
        //    User user = context.Users.FirstOrDefault(x => x.Id == id);
        //    if (user == null)
        //    {
        //        return Enumerable.Empty<Book>(); // or handle the null case as needed
        //    }

        //    List<Book> books = context.Books
        //        .Where(x => x.IsReadup == true && x.State != 2 &&
        //                    (x.OrganizationId == 1 || x.OrganizationId == 0 || x.OrganizationId == user.OrganizationId))
        //        .Skip((pageNumber - 1) * pageSize)
        //        .Take(pageSize)
        //        .ToList();

        //    return books;
        //}
        [HttpGet, Route("GetReadupBooksPagnation")]
        public async Task<IEnumerable<bookModel>> GetReadupBooksPagnation(int id, int libarary, int pageNumber = 1, int pageSize = 10)
        {
            using (ReadUpBooksContext context = new ReadUpBooksContext())
            {
                User user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
                if (user == null)
                {
                    return Enumerable.Empty<bookModel>(); // or handle the null case as needed
                }

                var booksQuery = context.Books
                    .Where(x => x.IsReadup == true && x.State != 2 && x.LibraryId == libarary &&
                                (x.OrganizationId == 1 || x.OrganizationId == 0 || x.OrganizationId == user.OrganizationId))
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize);

                var books = await booksQuery.ToListAsync();

                var userReadBooks = await context.UserRead
                    .Where(ur => ur.userId == id)
                    .ToListAsync();

                var bookDtos = books.Select(book => new bookModel(book, userReadBooks.Any(ur => ur.bookId == book.Id))).ToList();

                return bookDtos;
            }
        }

        //[HttpGet, Route("GetReadupBooksPagnation")]
        //public async Task<IEnumerable<BookModel>> GetReadupBooksPagnation(int id, int library, int pageNumber = 1, int pageSize = 10)
        //{
        //    using (ReadUpBooksContext context = new ReadUpBooksContext())
        //    {
        //        User user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
        //        if (user == null)
        //        {
        //            return Enumerable.Empty<BookModel>(); // or handle the null case as needed
        //        }

        //        var booksQuery = context.Books
        //            .Where(x => x.IsReadup == true && x.State != 2 && x.LibraryId == library &&
        //                        (x.OrganizationId == 1 || x.OrganizationId == 0 || x.OrganizationId == user.OrganizationId))
        //            .Skip((pageNumber - 1) * pageSize)
        //            .Take(pageSize);

        //        var books = await booksQuery.ToListAsync();

        //        var userReadBooks = await context.UserRead
        //            .Where(ur => ur.userId == id)
        //            .ToListAsync();

        //        var bookDtos = books.Select(book => new BookModel
        //        {
        //            Id = book.Id,
        //            BookName = book.BookName,
        //            AuthorName = book.AuthorName,
        //            PublishDate = (DateTime)book.PublishDate,
        //            Summery = book.Summery,
        //            LangId = (int)book.LangId,
        //            Gener = (int)book.Gener,
        //            AgeGroup = (int)book.AgeGroup,
        //            AudioBookName = book.AudioBookName,
        //            AudioSummery = book.AudioSummery,
        //            Chapters = (List<Chapter>)book.Chapters,
        //            image = book.image,
        //            OrganizationId = book.OrganizationId,
        //            UserId = book.UserId,
        //            State = book.State,
        //            AgeGroupTxt = book.AgeGroupTxt,
        //            Announcer = book.Announcer,
        //            BookNameEng = book.BookNameEng,
        //            GenerTxt = book.GenerTxt,
        //            IsReadup = book.IsReadup,
        //            IsVayikra = book.IsVayikra,
        //            LangVal = book.LangVal,
        //            LibraryId = book.LibraryId,
        //            NumberOfChapters = (int)book.NumberOfChapters,
        //            SentencesGap = (int)book.SentencesGap,
        //            SilenceDecibels = (int)book.SilenceDecibels,
        //            SilenceTime = (double)book.SilenceTime,
        //            ContinueReading = userReadBooks.Any(ur => ur.bookId == book.Id)
        //        }).ToList();

        //        return bookDtos;
        //    }
        //}

        [HttpGet, Route("GetBookAudioName")]
        public IActionResult GetBookAudioName(int id)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            Book books = context.Books.FirstOrDefault(x => x.Id == id);

            string path = _configuration["AppSettings:path2"];
            string audPath = books.AudioBookName;

            FileInfo fi = new FileInfo(audPath);

            try
            {
                System.IO.File.Copy(audPath, path + fi.Name);
                Thread.Sleep(200);
            }
            catch { }

            return Ok(new { path = fi.Name });

        }





        [HttpGet, Route("GetBookSummery")]
        public IActionResult GetBookSummery(int id)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            Book books = context.Books.FirstOrDefault(x => x.Id == id);

            string path = _configuration["AppSettings:path2"];
            string audPath = books.AudioSummery;

            FileInfo fi = new FileInfo(audPath);

            try
            {
                System.IO.File.Copy(audPath, path + fi.Name);
                Thread.Sleep(200);
            }
            catch { }

            return Ok(new { path = fi.Name });

        }


        [HttpPost, Route("Delete")]
        public ActionResult Delete([FromBody] int bookId)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();


            Book book = context.Books.FirstOrDefault(x => x.Id == bookId);
            Library library = context.Library.FirstOrDefault(x => x.Id == book.LibraryId);
            if (library == null)
            {
                // Return a 404 Not Found response if the book doesn't exist
                return NotFound(new { message = "library not found" });
            }
            if (book == null)
            {
                // Return a 404 Not Found response if the book doesn't exist
                return NotFound(new { message = "Book not found" });
            }

            book.State = 2;

            library.number = library.number - 1;
            context.Update(book);
            context.SaveChanges();
            return Ok();
        }

        [HttpPost, Route("isReadBook")]
        public bool isReadBook(int id, int bookid)
        {
            bool read = false;
            ReadUpBooksContext context = new ReadUpBooksContext();
            try
            {
                List<UserRead> ur = context.UserRead.Where(x => x.userId == id && x.bookId == bookid).ToList();
                if (ur.Count > 0)
                {
                    read = true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return false;
        }



        [HttpGet, Route("DoSplit")]
        public ActionResult DoSplit(string text)
        {
            return Ok(TextSPlit(text));

        }
        [HttpPost, Route("UpdateBook")]

        public async Task<IActionResult> UpdateBook([FromForm] FileModel book)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            Book bookEdit = context.Books.FirstOrDefault(x => x.Id == book.bookId);
            Library oldLibrary = context.Library.FirstOrDefault(x => bookEdit.LibraryId == x.Id);
            try
            {

                if (bookEdit != null)
                {
                    bookEdit.BookName = book.bookName;
                    bookEdit.BookNameEng = book.bookName;
                    bookEdit.UserId = book.userId;
                    bookEdit.AuthorName = book.author;
                    bookEdit.LangId = book.language;
                    //    if (book.language == "eng")
                    //        bookEdit.LangId = 2;
                    //    else
                    //        bookEdit.LangId = 1;
                    //}
                    bookEdit.LibraryId = book.library;
                    Library library = context.Library.FirstOrDefault(x => book.library == x.Id);
                    library.number = library.number + 1;
                    oldLibrary.number = oldLibrary.number - 1;
                    bookEdit.Gener = book.genre;
                    bookEdit.Announcer = book.voice;
                    bookEdit.Summery = book.message != " " ?book.message : " ";
                    if (book.bookFile != null)
                    {
                        using (var ms = new MemoryStream())
                        {
                            book.bookFile.CopyTo(ms);
                            var fileBytes = ms.ToArray();
                            string s = Convert.ToBase64String(fileBytes);
                            bookEdit.image = s;
                        }
                    }
                    context.Books.Update(bookEdit);
                    context.SaveChanges();
                    return Ok(bookEdit);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        




        private string TextSPlit(string flashinstructions)
        {
            string res = "";
            //   flashinstructions = flashinstructions.Replace("\r\n", " ");
            //   flashinstructions = flashinstructions.Replace("\n", " ");
            flashinstructions = flashinstructions.Replace("\"", "");

            ReadUpBooksContext context = new ReadUpBooksContext();
            List<SplitRules> splitruls = context.SplitRules.Where(x => x.Key == "punctuation").ToList();
            List<List<string>> fullList = new List<List<string>>();
            List<string> inner = new List<string>();

            inner = flashinstructions.Split(' ').ToList();

            splitruls = context.SplitRules.Where(x => x.Key == "compound word").ToList();
            //compound word	

            for (int i = 0; i < inner.Count - 1; i++)
            {
                try
                {
                    SplitRules sr = splitruls.FirstOrDefault(x => x.Value.ToLower() == inner[i].ToString().ToLower() + " " + inner[i + 1].ToString().ToLower());
                    if (sr != null && sr.Key == "compound word")
                    {
                        if (inner[i] + " " + inner[i + 1] == sr.Value)
                        {
                            inner[i] = inner[i] + " " + inner[i + 1];
                            inner.RemoveAt(i + 1);
                        }
                    }
                }
                catch { }


            }

            List<string> tmpList = new List<string>();
            splitruls = context.SplitRules.Where(x => x.Key == "punctuation").ToList();

            foreach (var word in inner)
            {
                if (word.Trim() != "")
                {
                    SplitRules sr = splitruls.FirstOrDefault(x => x.Value == word.Trim()[word.Trim().Length - 1].ToString());

                    if (sr != null && sr.Key == "punctuation")
                    {
                        if (sr.Timing == "after")
                        {
                            tmpList.Add(word.Trim());
                            fullList.Add(tmpList);
                            tmpList = new List<string>();
                        }
                        else
                        {
                            fullList.Add(tmpList);
                            tmpList = new List<string>();
                            tmpList.Add(word.Trim());
                        }
                    }
                    else
                    {
                        tmpList.Add(word.Trim());
                    }


                }
            }


            //foreach (string str in flashinstructions.Split(' '))
            //{
            //    try
            //    {

            //        SplitRules sr = splitruls.FirstOrDefault(x => x.Value == str[str.Length - 1].ToString());

            //        //punctuation
            //        if (sr != null && sr.Key == "punctuation")
            //        {
            //            if (sr.Timing == "after")
            //            {
            //                // res += Environment.NewLine + str;
            //                inner.Add(str);
            //                fullList.Add(inner);
            //                inner = new List<string>();
            //            }
            //            else
            //            {
            //                // res += str + Environment.NewLine;
            //                fullList.Add(inner);
            //                inner = new List<string>();
            //                inner.Add(str);
            //            }
            //        }
            //        else
            //        {
            //            //res += str + " ";
            //            inner.Add(str);
            //        }
            //    }

            //    // }
            //    catch
            //    {
            //        //res += str + " ";
            //        inner.Add(str);
            //    }
            //}



            splitruls = context.SplitRules.Where(x => x.Key == "Conjunctions").ToList();
            //Conjunctions
            bool go = true;
            while (go)
            {
                go = false;
                for (int i = 0; i < fullList.Count - 1; i++)
                {
                    var currentList = fullList[i];
                    var nextList = fullList[i + 1];

                    //  if (currentList.Count > 5)
                    //  {
                    // Find the intersection of the current list and splitruls based on the Value property
                    var intersection = currentList
                        .Where(cell => splitruls.Any(rule => rule.Value.ToLower() == cell.ToLower()))
                        .ToList();

                    if (intersection.Any())
                    {
                        // Split the list into two lists
                        int indexToSplit = currentList.IndexOf(intersection.First());
                        while (intersection.Count > 0)
                        {
                            if (indexToSplit > 0)
                                break;
                            else
                                intersection.RemoveAt(0);
                        }
                        if (indexToSplit > 0)
                        {

                            List<string> firstPart = currentList.Take(indexToSplit).ToList();
                            List<string> secondPart = currentList.Skip(indexToSplit).ToList();



                            // Update the original list
                            currentList.Clear();
                            currentList.AddRange(firstPart);
                            go = true;
                            // Insert the second part into the next list
                            //   nextList.InsertRange(0, intersection);
                            if (secondPart.Count > 0)
                                fullList.Insert(i + 1, secondPart);
                            //   nextList.InsertRange(1, secondPart);

                        }
                    }
                    //   }
                }
            }

            //split 7
            for (int i = 0; i < fullList.Count; i++)
            {
                var innerList = fullList[i];

                if (innerList.Count >= 7)
                {
                    // Split the list after the 5th cell
                    List<string> firstPart = innerList.GetRange(0, 5);
                    List<string> secondPart = innerList.GetRange(5, innerList.Count - 5);

                    // Update the original list
                    innerList.Clear();
                    innerList.AddRange(firstPart);

                    // Insert the second part as a new list after the current one
                    fullList.Insert(i + 1, secondPart);
                }
            }

            fullList.RemoveAll(innerList => innerList.Count == 0);
            res = string.Join(Environment.NewLine, fullList.Select(innerList => string.Join(" ", innerList)));

            return res;


            flashinstructions = flashinstructions.Replace("\n\r", " ");
            flashinstructions = flashinstructions.Replace("\r\n", " ");
            flashinstructions = flashinstructions.Replace("\n", " ");
            string[] words = flashinstructions.Split(' ');
            StringBuilder resultBuilder = new StringBuilder();

            int wordCount = 0;
            int capitalCount = 0;

            foreach (string word in words)
            {

                var tmpword = word;

                // if (capitalCount == 0)
                //     tmpword = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(word.ToLower());
                // Check if the word ends with '.' or ','
                bool endsWithPunctuation = word.EndsWith('.') || word.EndsWith(',') || word.EndsWith('?') || word.EndsWith('!') || word.EndsWith(':') || word.EndsWith(';')
                    || word.EndsWith(".\"") || word.EndsWith(",\"") || word.EndsWith("?\"") || word.EndsWith("!\"") || word.EndsWith(":\"") || word.EndsWith(";\"");

                // Add the word to the result



                // If the word ends with punctuation or 5 words have been added, add a newline
                if (word.EndsWith('\n'))
                {
                    resultBuilder.Append(tmpword.Substring(0, tmpword.Length - 1));
                    resultBuilder.Append("\n");
                    wordCount = -1;
                    capitalCount = -1;
                }
                if (endsWithPunctuation)
                {
                    resultBuilder.Append(tmpword);
                    resultBuilder.Append("\n");
                    wordCount = -1;
                    capitalCount = -1;
                }
                else if (wordCount > 4)
                {
                    if (word == "to" || word == "in" || word == "is" || word == "as" || word == "a" || word == "the" || word == "by"
                    || word == "by" || word == "that" || word == "and" || word == "or" || word == "any" || word == "some")
                    {
                        resultBuilder.Append("\n");
                        //  tmpword = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(word.ToLower());
                        resultBuilder.Append(tmpword);
                        resultBuilder.Append(" ");
                        wordCount = 0;
                        capitalCount = 0;
                    }
                    else if (wordCount > 6)
                    {
                        resultBuilder.Append("\n");
                        resultBuilder.Append(tmpword);
                        resultBuilder.Append(" ");
                        wordCount = 0;
                        capitalCount = 0;

                    }
                    else
                    {
                        resultBuilder.Append(tmpword);
                        resultBuilder.Append(" ");
                    }
                }

                else
                {
                    resultBuilder.Append(tmpword);
                    resultBuilder.Append(" ");
                }

                if (word == "to" || word == "in" || word == "is" || word == "as" || word == "a" || word == "the" || word == "by"
                    || word == "by" || word == "that" || word == "and" || word == "or" || word == "any" || word == "some")
                {
                    capitalCount++;
                }
                else
                {
                    wordCount++;
                    capitalCount++;
                }

            }

            return resultBuilder.ToString();










            //-----------------------//

            string tmp = "";
            string finaltmp = "";
            int count = 0;
            bool added = false;
            for (var i = 0; i < flashinstructions.Split(' ').Length; i++)
            {
                if (flashinstructions.Split(' ')[i].ToLower() == "and")
                {
                    finaltmp += tmp + ".\n" + flashinstructions.Split(' ')[i].ToLower() + " ";
                    count = 0;
                    tmp = "";
                }

                else
                {
                    tmp += flashinstructions.Split(' ')[i] + " ";
                    count++;
                    if (flashinstructions.Split(' ')[i].EndsWith('.') || flashinstructions.Split(' ')[i].EndsWith(',') || flashinstructions.Split(' ')[i].EndsWith('!') || flashinstructions.Split(' ')[i].EndsWith('?'))
                    {
                        added = true;
                        if (count <= 5)
                        {
                            count = 0;
                        }

                        if (count > 5)
                        {
                            for (var j = 0; j < tmp.Split(' ').Length; j++)
                            {
                                if (tmp.Split(' ')[j] == "in" || tmp.Split(' ')[j] == "is" || tmp.Split(' ')[j] == "to" || tmp.Split(' ')[j] == "as" || tmp.Split(' ')[j] == "a" || tmp.Split(' ')[j] == "the" || tmp.Split(' ')[j] == "by" || tmp.Split(' ')[j] == "that")
                                {
                                    finaltmp += ".\n";
                                    finaltmp += tmp.Split(' ')[j] + " ";
                                    if (flashinstructions.Split(' ')[j + 1] != "")
                                    {
                                        if (tmp.Split(' ')[j + 1] == "in" || tmp.Split(' ')[j + 1] == "is" || tmp.Split(' ')[j + 1] == "to" || tmp.Split(' ')[j + 1] == "as" || tmp.Split(' ')[j + 1] == "a" || tmp.Split(' ')[j + 1] == "the" || tmp.Split(' ')[j + 1] == "by" || tmp.Split(' ')[j + 1] == "that")
                                        {
                                            j = j + 1;
                                            finaltmp += " " + flashinstructions.Split(' ')[j] + " ";
                                        }
                                    }
                                }
                                else
                                {
                                    finaltmp += tmp.Split(' ')[j] + " ";
                                }

                            }


                            if (flashinstructions.Split(' ')[i].EndsWith(',') || flashinstructions.Split(' ')[i].EndsWith('!') || flashinstructions.Split(' ')[i].EndsWith('?') || flashinstructions.Split(' ')[i].ToLower() == "and")
                            {
                                finaltmp = finaltmp.Substring(0, finaltmp.Length - 1) + ".\n";
                            }
                            else
                            {
                                finaltmp += "\n";
                            }
                            count = 0;
                            added = false;
                            tmp = "";
                        }
                    }
                    if (added)
                    {
                        finaltmp += tmp;


                        if (flashinstructions.Split(' ')[i].EndsWith(',') || flashinstructions.Split(' ')[i].EndsWith('!') || flashinstructions.Split(' ')[i].EndsWith('?') || flashinstructions.Split(' ')[i].ToLower() == "and")
                        {
                            finaltmp = finaltmp.Substring(0, finaltmp.Length - 1) + ".\n";
                        }
                        else if (flashinstructions.Split(' ')[i].EndsWith('.'))
                        {
                            finaltmp += "\n";
                        }

                        tmp = "";
                    }

                    added = false;
                }
            }
            if (!finaltmp.EndsWith(tmp) && tmp.Trim() != "")
            {
                finaltmp += tmp + ".";
            }
            finaltmp = finaltmp.Replace("   ", " ").Replace("  ", " ").Replace(".,", ".").Replace(",.", ".").Replace(", .", ".").Replace(", .", ".").Replace(". ,", ".").Replace(",.", ".");
            flashinstructions = finaltmp;

            flashinstructions = flashinstructions.Replace("\n\n\n", "").Replace("\n\n", "").Replace("\n\n", "").Replace("\n.\n", "").Replace("\n.", "");
            return flashinstructions;

        }


        private void ExecuteCommandSync(object command, string dir)
        {
            try
            {
                // create the ProcessStartInfo using "cmd" as the program to be run,
                // and "/c " as the parameters.
                // Incidentally, /c tells cmd that we want it to execute the command that follows,
                // and then exit.
                System.Diagnostics.ProcessStartInfo procStartInfo =
                    new System.Diagnostics.ProcessStartInfo("cmd", "/c " + command);

                procStartInfo.WorkingDirectory = dir;

                // The following commands are needed to redirect the standard output.
                // This means that it will be redirected to the Process.StandardOutput StreamReader.
                procStartInfo.RedirectStandardOutput = true;
                procStartInfo.UseShellExecute = false;
                // Do not create the black window.
                procStartInfo.CreateNoWindow = true;
                // Now we create a process, assign its ProcessStartInfo and start it
                System.Diagnostics.Process proc = new System.Diagnostics.Process();
                proc.StartInfo = procStartInfo;
                proc.Start();
                // Get the output into a string
                //        string result = proc.StandardOutput.ReadToEnd();

                //        proc.WaitForExit();
                // Display the command output.
                //       Console.WriteLine(result);
                proc.Dispose();
                proc.Close();

            }
            catch (Exception objException)
            {
                // Log the exception
            }
        }



        [HttpPost, Route("UploadFiles")]
        public async Task<ActionResult> UploadFiles([FromForm] FileModel files, bool onlyChapters)

        {
            string text = "";
            string text_pause = "";
            ReadUpBooksContext context = new ReadUpBooksContext();

            Book book = new Book();
            if (!onlyChapters)
            {
                book.LibraryId = files.library;
                Library library = context.Library.FirstOrDefault(x => files.library == x.Id);
                library.number = library.number + 1;
                book.State = 1;
                book.BookName = files.bookName;
                book.BookNameEng = files.bookName;
                book.UserId = files.userId;
                book.IsReadup = true;
                book.Summery = files.description != " " ? files.description : " ";
                book.AuthorName = files.author;
                string lang = "xml:lang='en-US'><voice name='en-US-AvaMultilingualNeural'>";
                if (files.language == 2)
                    book.LangId = 2;
                else
                {
                    book.LangId = 1;
                    lang = "xml:lang='he-IL'><voice name='he-IL-AvriNeural'>";
                }
                book.SilenceDecibels = -30;
                book.SentencesGap = 1;
                book.PublishDate = DateTime.Now;
                book.NumberOfChapters = files.chaptersFiles.Count;
                book.SilenceTime = 0.8;
                book.AgeGroupTxt = files.agegroup;
                try
                {
                  if (files.bookFile != null && files != null)
                {
                    using (var ms = new MemoryStream())
                    {
                        files.bookFile.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string s = Convert.ToBase64String(fileBytes);
                        book.image = s;
                    }
                }
                   else
                {
                    book.image = "";
                }
                }
                catch
                {
                    return BadRequest("image fail");
                }
              
               

                context.Books.Add(book);
                context.SaveChanges();
                int index = 0;
                List<Chapter> chaps = new List<Chapter>();
                System.IO.Directory.CreateDirectory("c:\\readup\\" + book.Id);
                foreach (var chap in files.chaptersNames.Split(";"))
                {
                    if (chap != "")
                    {
                        Chapter chapter = new Chapter();
                        chapter.BookId = book.Id;
                        chapter.ChapterName = chap;
                        chapter.SilenceDecibels = -30;
                        chapter.SilenceTime = 0.8;
                        chapter.ChapterNameEng = chap;
                        context.Chapters.Add(chapter);
                        context.SaveChanges();

                        string chapName = Guid.NewGuid().ToString();


                        chapter.DocPath = "c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\" + chapName + ".txt";
                        chapter.Mp3Path = "c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\" + chapName + ".mp3";
                        chapter.DocPath = chapter.DocPath.Replace(" ", "");
                        chapter.Mp3Path = chapter.Mp3Path.Replace(" ", "");
                        chapter.Status = 1;
                        context.SaveChanges();
                        chaps.Add(chapter);



                        System.IO.Directory.CreateDirectory("c:\\readup\\" + book.Id + "\\" + chapter.Id);
                        using (Stream stream = new FileStream("c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\" + chapName + "." + files.chaptersFiles[index].FileName.Split(".")[1], FileMode.Create))
                        {
                            files.chaptersFiles[index].CopyTo(stream);
                        }

                        try
                        {
                            if (files.chaptersFiles[index].FileName.Split(".")[1] == "pdf")
                            {
                                PdfToText pdfToText = new PdfToText();

                                // load PDF file
                                string fileName = "c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\" + chapName + ".pdf";

                                pdfToText.Load(fileName);


                                // set the properties
                                pdfToText.Layout = TextLayout.Original;
                                // pdfToText.StartPageNumber = 1;
                                // pdfToText.EndPageNumber = endPage;

                                // extract the text
                                string ReadValue = pdfToText.GetText();


                                string[] lines = ReadValue.Replace("=", "").Split(new string[] { "text." }, StringSplitOptions.None);
                                ReadValue = "";
                                for (int i = 1; i < lines.Length; i++)
                                {
                                    ReadValue += lines[i] + " ";
                                }
                                ReadValue = ReadValue.Trim().Replace("Demo Version - Select.Pdf SDK - http://selectpdf.com", "");


                                ReadValue = TextSplitManager.TextSplit(ReadValue);

                                text = ReadValue;


                                using (StreamWriter writer = System.IO.File.AppendText("c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\text.txt"))
                                {
                                    writer.WriteLine(text);
                                }

                                await ConvertToAudio(text, lang, book, chapter);


                            }
                            else if (files.chaptersFiles[index].FileName.Split(".")[1] == "doc" || files.chaptersFiles[index].FileName.Split(".")[1] == "docx")
                            {
                                Document document = new Document();
                                string fileName = "c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\" + chapName + "." + files.chaptersFiles[index].FileName.Split(".")[1];

                                document.LoadFromFile(fileName);

                                string ReadValue = document.GetText();


                                ReadValue = ReadValue.Split(new string[] { " Spire.Doc for .NET." }, StringSplitOptions.None)[1];

                                using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\before split.txt"))
                                {
                                    writer.WriteLine(DateTime.Now + ": text_pause : " + ReadValue);
                                }
                                ReadValue = ReadValue.Trim().Replace("Demo Version - Select.Pdf SDK - http://selectpdf.com", "");
                                ReadValue = TextSplitManager.TextSplit(ReadValue);
                                using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\after split.txt"))
                                {
                                    writer.WriteLine(DateTime.Now + ": text_pause : " + ReadValue);
                                }

                                text = ReadValue;
                                using (StreamWriter writer = System.IO.File.AppendText("c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\text.txt"))
                                {
                                    writer.WriteLine(text);
                                }

                                await ConvertToAudio(text, lang, book, chapter);




                            }
                            else
                            {

                                System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "c:\\tmp\\cred.json");
                                //System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "c:\\tmp\\key.json");

                                var client = ImageAnnotatorClient.Create();
                                var image = Google.Cloud.Vision.V1.Image.FromFile("c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\" + chapName + "." + files.chaptersFiles[index].FileName.Split(".")[1]);
                                var response = client.DetectText(image);
                                using (FileStream fs = System.IO.File.Create(chapter.DocPath))
                                {
                                }

                                foreach (var annonation in response)
                                {
                                    if (annonation.Description != null)
                                    {
                                        using (var sw = new StreamWriter(chapter.DocPath, true))
                                        {
                                            sw.WriteLine(annonation.Description);
                                        }

                                        annonation.Description = TextSplitManager.TextSplit(annonation.Description);


                                        using (StreamWriter writer = System.IO.File.AppendText("c:\\readup\\" + book.Id + "\\" + chapter.Id + "\\text.txt"))
                                        {
                                            writer.WriteLine(annonation.Description);
                                        }



                                        text = annonation.Description;

                                        await ConvertToAudio(text, lang, book, chapter);



                                    }

                                    break;
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                            {
                                writer.WriteLine(DateTime.Now + ": text_pause ex: " + ex.Message);
                            }
                            Console.WriteLine(ex.Message);
                        }











                        index++;
                    }
                }
                foreach (Chapter chap in chaps)
                {
                    chap.Status = 2;
                    context.Chapters.Update(chap);

                }
                context.SaveChanges();



                //   ProcessStartInfo startinfo = new ProcessStartInfo();
                //   startinfo.FileName = "c:\\Readup\\STT\\STT.exe"; ;
                //   startinfo.UseShellExecute = true;
                //     Process myProcess = Process.Start(startinfo);




                return Ok();
            }
            return BadRequest();

        }

        private async Task ConvertToAudio(string text, string lang, Book book, Chapter chapter)
        {
            try
            {

                List<string> textChunks = SplitTextIntoChunks(text, 2000);
                List<string> inputFiles = new List<string>();

                int i = 0;
                foreach (var chunk in textChunks)
                {
                    string outputFilePath = chapter.Mp3Path.Split('.')[0];

                    outputFilePath = outputFilePath + "_" + i + "_.mp3";
                    i++;
                    string text_pause = "<speak version='1.0' xmlns='https://www.w3.org/2001/10/synthesis' " + lang + "<break time='1000ms'/>" + chunk.Replace("\n", "\n<break time='1000ms'/>\n") + " </voice></speak>";
                    //     text_pause = ReadValue;

                    using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                    {
                        writer.WriteLine(DateTime.Now + ": text_pause : " + text_pause);
                    }


                    var config = SpeechConfig.FromSubscription("1ca782f1418641e18302e2788d9e2711", "eastus");

                    if (book.LangId == 1)
                    {
                        config.SpeechSynthesisLanguage = "he-IL";
                        config.SpeechSynthesisVoiceName = "he-IL-AvriNeural";
                    }
                    else
                    {
                        config.SpeechSynthesisLanguage = "en-US";
                        config.SpeechSynthesisVoiceName = "en-US-AvaMultilingualNeural";

                    }

                    // Output file path



                    var audioConfig = Microsoft.CognitiveServices.Speech.Audio.AudioConfig.FromWavFileOutput(outputFilePath + "_tmp");

                    byte[] audioData = new byte[0];




                    using (var synthesizer = new SpeechSynthesizer(config, audioConfig))
                    {
                        // Synthesize speech to an in-memory stream
                        using (var result = await synthesizer.SpeakSsmlAsync(text_pause))
                        {
                            if (result.Reason == ResultReason.SynthesizingAudioCompleted)
                            {
                                Console.WriteLine("Speech synthesized to memory.");

                                // Get the audio data from the result
                                audioData = result.AudioData;

                                // Append the audio data to the file
                                using (var fileStream = new FileStream(outputFilePath, FileMode.Create, FileAccess.Write))
                                {
                                    fileStream.Write(audioData, 0, audioData.Length);
                                    inputFiles.Add(outputFilePath);
                                }

                                Console.WriteLine($"Audio content appended to file '{outputFilePath}'");
                            }
                            else if (result.Reason == ResultReason.Canceled)
                            {
                                var cancellation = SpeechSynthesisCancellationDetails.FromResult(result);
                                Console.WriteLine($"CANCELED: Reason={cancellation.Reason}");
                                Console.WriteLine($"CANCELED: ErrorDetails={cancellation.ErrorDetails}");
                            }
                        }

                    }
                }

                ConcatenateWavFiles(inputFiles, chapter.Mp3Path);





            }
            catch (Exception ex)
            {
                using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                {
                    writer.WriteLine(DateTime.Now + ": ConvertToAudio ex: " + ex.Message);
                }
            }
        }
        private string CreateFileList(List<string> inputFiles, string fileListPath)
        {
            // Define the path to the temporary file that will store the list of MP3 files

            // Write each MP3 file path to the file in the format FFmpeg expects
            using (var writer = new StreamWriter(fileListPath))
            {
                foreach (var mp3File in inputFiles)
                {
                    // FFmpeg expects each file to be prefixed with "file 'path/to/file'"
                    writer.WriteLine($"file '{mp3File}'");
                }
            }

            return fileListPath; // Return the path to the file list
        }

        public static void ConcatenateWavFiles(List<string> inputFiles, string outputFilePath)
        {
            if (inputFiles.Count == 0)
            {
                throw new ArgumentException("No input files specified.");
            }

            // Open the first file to get the WaveFormat
            using (var reader = new WaveFileReader(inputFiles[0]))
            {
                // Create the output file with the same format as the first file
                using (var writer = new WaveFileWriter(outputFilePath, reader.WaveFormat))
                {
                    foreach (var file in inputFiles)
                    {
                        AppendWavFileWithoutHeader(writer, file);
                    }
                }
            }
        }
        private static void AppendWavFileWithoutHeader(WaveFileWriter writer, string fileToAppend)
        {
            using (var reader = new WaveFileReader(fileToAppend))
            {
                // Skip the WAV file header (already written by the WaveFileWriter)
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = reader.Read(buffer, 0, buffer.Length)) > 0)
                {
                    writer.Write(buffer, 0, bytesRead);
                }
            }
        }
        private static void UpdateWavHeader(FileStream output, int totalAudioDataSize)
        {
            // Total size = audio data size + header size - 8 bytes
            int totalFileSize = totalAudioDataSize + 44 - 8;

            // Set the position back to the beginning of the file
            output.Seek(4, SeekOrigin.Begin);

            // Write the total file size
            byte[] totalFileSizeBytes = BitConverter.GetBytes(totalFileSize);
            output.Write(totalFileSizeBytes, 0, 4);

            // Set the position to the data size section of the header
            output.Seek(40, SeekOrigin.Begin);

            // Write the total audio data size
            byte[] totalAudioDataSizeBytes = BitConverter.GetBytes(totalAudioDataSize);
            output.Write(totalAudioDataSizeBytes, 0, 4);
        }
        public static List<string> SplitTextIntoChunks(string text, int chunkSize)
        {
            List<string> chunks = new List<string>();
            int currentIndex = 0;

            while (currentIndex < text.Length)
            {
                // Ensure that chunk size doesn't exceed the remaining text length
                int remainingLength = text.Length - currentIndex;
                int nextChunkLimit = Math.Min(chunkSize, remainingLength);

                // Try to find a newline character within the chunk
                int newlineIndex = text.LastIndexOf('\n', currentIndex + nextChunkLimit - 1, nextChunkLimit);

                if (newlineIndex != -1 && newlineIndex >= currentIndex)
                {
                    // If newline is found within the chunk, split at the newline
                    chunks.Add(text.Substring(currentIndex, newlineIndex - currentIndex + 1)); // Include newline
                    currentIndex = newlineIndex + 1; // Move past the newline for the next chunk
                }
                else
                {
                    // If no newline found, split at the chunk size limit
                    chunks.Add(text.Substring(currentIndex, nextChunkLimit));
                    currentIndex += nextChunkLimit;
                }
            }

            return chunks;
        }
    }
}