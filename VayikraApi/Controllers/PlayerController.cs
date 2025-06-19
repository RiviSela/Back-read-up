using Data.Models;
using DocumentFormat.OpenXml.Bibliography;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using VayikraApi.Models;
using File = Google.Apis.Drive.v3.Data.File;


namespace VayikraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        ReadUpBooksContext context = new ReadUpBooksContext();

        private readonly IHostingEnvironment _HostEnvironment;
        private IMemoryCache _cache;
        private readonly IConfiguration _configuration;


        public PlayerController(IHostingEnvironment HostEnvironment, IMemoryCache cache, IConfiguration configuration)
        {
            _HostEnvironment = HostEnvironment;
            _cache = cache;
            _configuration = configuration;
        }

        [HttpGet, Route("PrePareAudio")]
        public IActionResult PrePareAudio(string chapterid, int usrId)
        {
            Chapter c = context.Chapters.Where(x => x.Id == int.Parse(chapterid) && x.Status != 7).ToList()[0];
            UserRead ur = context.UserRead.FirstOrDefault(x => x.userId == usrId && x.chapterId == int.Parse(chapterid));
            
            if (ur!=null)
            {
                _cache.Set("index;" + usrId, ur.index);
                _cache.Set("i;" + usrId, ur.i);
            }
            else
            {
                _cache.Set("index;" + usrId, 0);
                _cache.Set("i;" + usrId, 0);
            }
           

            bool exists = System.IO.Directory.Exists("C:\\ReadUp\\users\\" + usrId + "\\");

            if (!exists)
                System.IO.Directory.CreateDirectory("C:\\ReadUp\\users\\" + usrId + "\\");

            System.IO.File.Copy(c.Mp3Path, "C:\\ReadUp\\users\\" + usrId + "\\aud.mp3", true);
            System.IO.File.Copy("C:\\ReadUp\\users\\ffmpeg.exe", "C:\\ReadUp\\users\\" + usrId + "\\ffmpeg.exe", true);

            try
            {
                System.IO.File.Copy("c:\\tmp\\ffmpeg.exe", "C:\\ReadUp\\users\\ffmpeg.exe");

            }
            catch { }



            return Ok();
        }

        [HttpGet, Route("PrePareAudioStop")]
        public IActionResult PrePareAudioStop(string chapterid, int usrId)
        {
            try
            {
                Chapter c = context.Chapters.Where(x => x.Id == int.Parse(chapterid) && x.Status != 7).ToList()[0];
                List<Sentence> sentences = context.Sentences.Where(x => x.ChapterId == int.Parse(chapterid)).OrderBy(x => x.Confidence).ToList();
                Sentence s = new Sentence();
                foreach (Sentence sen in sentences)
                {
                    if (sen.notTitles != true)
                    {
                        s = sen;
                        break;
                    }
                }



                _cache.Set("index;" + usrId, 0);
                _cache.Set("i;" + usrId, 0);

                try
                {
                    UserRead ur = context.UserRead.FirstOrDefault(x => x.userId == usrId && x.chapterId == int.Parse(chapterid));
                    ur.bookId = int.Parse(c.BookId.ToString());
                    ur.chapterId = c.Id;
                    ur.i = 0;
                    ur.index = 0;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = s.Transcript.Replace("  ", " ");
                    ur.userId = usrId;
                    context.UserRead.Update(ur);
                    context.SaveChanges();
                
                
                    UserReadLast url = context.UserReadLast.FirstOrDefault(x => x.userId == usrId && x.bookId == int.Parse(c.BookId.ToString()));
                    url.bookId = int.Parse(c.BookId.ToString());
                    url.chapterId = c.Id;
                    url.i = 0;
                    url.index = 0;
                    url.sentenceId = s.Id;
                    url.sentenceText = s.Transcript.Replace("  ", " ");
                    url.userId = usrId;
                    context.UserRead.Update(ur);
                    context.SaveChanges();
                }
                catch { }



                bool exists = System.IO.Directory.Exists("C:\\ReadUp\\users\\" + usrId + "\\");

                if (!exists)
                    System.IO.Directory.CreateDirectory("C:\\ReadUp\\users\\" + usrId + "\\");

                System.IO.File.Delete("C:\\ReadUp\\users\\" + usrId + "\\aud.mp3");
                System.IO.File.Copy(c.Mp3Path, "C:\\ReadUp\\users\\" + usrId + "\\aud.mp3", true);
                System.IO.File.Copy("C:\\ReadUp\\users\\ffmpeg.exe", "C:\\ReadUp\\users\\" + usrId + "\\ffmpeg.exe", true);

                try
                {
                    System.IO.File.Copy("c:\\tmp\\ffmpeg.exe", "C:\\ReadUp\\users\\ffmpeg.exe");

                }
                catch { }
            }
            catch { }



            return Ok();
        }

        [HttpGet, Route("GetBooks")]
        public IEnumerable<Book> GetBooks()
        {
            IEnumerable<Book> b = context.Books.OrderBy(x => x.BookName).ToList();
            //     IEnumerable<Books> b = context.Books.Where(x=>x.Id==42).ToList();

            IEnumerable<Language> l = context.Languages.ToList();

            foreach (var bbb in b)
            {
                foreach (var lll in l)
                {
                    if (lll.Id == bbb.LangId)
                    {
                        bbb.LangVal = lll.Language1;
                    }
                }
            }

            return b;
        }

        [HttpGet, Route("GetBookChapters")]
        public IEnumerable<Chapter> GetBookChapters(int id)
        {
            IEnumerable<Chapter> b = context.Chapters.Where(x => x.BookId == id).ToList();
            return b;
        }


        [HttpGet, Route("Next")]
        public SentenceRsp Next(int bookid, int chapterid, int userid)
        {
            try
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";

                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);



                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;


                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");


                List<Sentence> sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];


                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();


                System.IO.File.Delete(audPath + "9.mp3");

                //     string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;
                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                        end = end.Substring(0, 6);

                        if (double.Parse(end) - double.Parse(start) > 0.5)
                        {
                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");


                            ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 9.mp3", audPath);
                            Thread.Sleep(500);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\9.mp3", path + "\\" + s.Id + ".mp3", true);



                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch
                {

                }


                index++;
                _cache.Set("index;" + userid, index);
                _cache.Set("pressNext;" + userid, "true");
                _cache.Set("pressBack;" + userid, "false");


                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;
               


                return rsp;
            }
            catch
            {
                return null;
            }


        }

        [HttpGet, Route("Back")]
        public SentenceRsp Back(int bookid, int chapterid, int userid)
        {
            try
            {

                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                index--;
                i--; ;


                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");


                List<Sentence> sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();


                System.IO.File.Delete(audPath + "9.mp3");

                // string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                        end = end.Substring(0, 6);

                        if (double.Parse(end) - double.Parse(start) > 0.5)
                        {
                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");


                            ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 9.mp3", audPath);
                            Thread.Sleep(500);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\9.mp3", path + "\\" + s.Id + ".mp3", true);



                        }
                        i--;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch
                {

                }


                //  index--;
                _cache.Set("index;" + userid, index);
                _cache.Set("pressBack;" + userid, "true");
                _cache.Set("pressNext;" + userid, "false");

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;


                return rsp;
            }
            catch
            {
                return null;
            }
        }


        [HttpPost, Route("SendRecord")]
        public void SendRecord(Record record)
        {
            try
            {
                System.IO.File.WriteAllBytes(@"c:\Records\" + record.userid + "_" + record.sentenceid + "_" + DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss") + "_.MP3", Convert.FromBase64String(record.base64data));
                //     recordToDrive(@"c:\Records\" + record.userid + "_" + record.sentenceid + "_" + DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss") + "_.MP3");
            }
            catch(Exception ex)
            {
                using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                {
                    writer.WriteLine(DateTime.Now + ": Record ex1: " + ex.Message);
                }
            }
        }

        [HttpPost, Route("TestRecord")]
        public void TestRecord()
        {
            recordToDrive(@"c:\tmp\aaa.pdf");
        }

        static string[] Scopes = { DriveService.Scope.Drive };
        static string ApplicationName = "readupp";

        private async void recordToDrive(string path)
        {
            var userName = "user";

            // scope of authorization needed from the user
            var scopes = new[] { DriveService.Scope.Drive };

            // file to upload

            var filePath = path;
            var fileName = Path.GetFileName(filePath);
            var folderToUploadTo = "root";


            var credential = GoogleWebAuthorizationBroker.AuthorizeAsync(GoogleClientSecrets.FromFile("c:\\tmp\\cred.json").Secrets,
                scopes,
                userName,
                CancellationToken.None).Result;


            // Create the  Drive service.
            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "test"
            });


            // Upload file photo.jpg on drive.
            var fileMetadata = new Google.Apis.Drive.v3.Data.File()
            {
                Name = fileName,
                Parents = new List<string>() { folderToUploadTo }
            };

            var fsSource = System.IO.File.OpenRead(filePath);

            // Create a new file, with metadatafileName and stream.
            var request = service.Files.Create(
                fileMetadata, fsSource, "mp3");
            request.Fields = "id";

            var results = await request.UploadAsync(CancellationToken.None);

            if (results.Status == UploadStatus.Failed)
            {
                Console.WriteLine($"Error uploading file: {results.Exception.Message}");
            }

            // the file id of the new file we created
            var fileId = request.ResponseBody?.Id;
        }
        private static UserCredential GetCredentials()
        {
            UserCredential credential;

            using (var stream = new FileStream("c:\\tmp\\cred.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = "c:\\tmp";

                credPath = Path.Combine(credPath, "token.json");

                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                // Console.WriteLine("Credential file saved to: " + credPath);
            }

            return credential;
        }




        [HttpGet, Route("GetNextLine")]
        public SentenceRsp GetNextLine(int bookid, int chapterid, int micid, int userid,bool repit,int speed)
        {
            try
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                string isNext;
                _cache.TryGetValue("pressNext;" + userid, out isNext);
                string isBack;
                _cache.TryGetValue("pressBack;" + userid, out isBack);


                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                if(isNext=="true")
                {
                    if (i > 1)
                    {
                        i--;
                        _cache.Set("pressNext;" + userid, "false");
                    }
                    if (index > 0)
                        index--;
                }

                System.IO.File.AppendAllText("c:\\tmp\\log.txt","repit:" + repit + Environment.NewLine);
                if (repit)
                {
                    System.IO.File.AppendAllText("c:\\tmp\\log.txt", "repit:" + repit + Environment.NewLine);

                    i--;
                    index--;
                }

                int orgIndex = index;
                int orgI = i;

                if (index < 0)
                    index = 0;
                if (i < 0)
                    index = 0;



                List<Sentence> sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();
                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");

                int k = 0;
                if (micid != 0)
                {
                    for (int j = 0; j < sentences.Count; j++)
                    {

                        if (micid == sentences[j].Id)
                        {
                            i = j + 1 + k;
                            index = j;
                            break;
                        }
                        else
                        {
                            try
                            {
                                string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                                start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                                string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                                end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                                end = end.Substring(0, 6);
                                try
                                {
                                    if (sentences[j].Words == 0 || (sentences[j].Words > 1 && double.Parse(end) - double.Parse(start) <= 0.5))
                                        k++;
                                }
                                catch { }
                            }
                            catch { }

                        }

                    }
                }

                int tick = int.Parse(DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString());


                string pasuk = "";
                Sentence s = sentences[index];
                for(int w=index;w>=0;w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }
                    
                }
                string lastpasuk = "";
                for (int w = sentences.Count-1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }

                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + "9.mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }
                

                // string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                exists = System.IO.Directory.Exists(path);

                if (!exists)
                    System.IO.Directory.CreateDirectory(path);


                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = "0";
                        if (s.Start == null)
                        {
                            start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            start = start.Substring(0, 6);
                        }
                        else
                            start = s.Start.ToString();
                        //start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = "0";
                        if (s.End == null)
                        {
                            end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                        }
                        else
                            end = s.End.ToString();




                        try
                        {
                            end = end.Split('\r')[0];
                            start = start.Split('\r')[0];
                            end = end.Split('\n')[0];
                            start = start.Split('\n')[0];
                            end = end.Split('[')[0];
                            start = start.Split('[')[0];


                        }
                        catch (Exception ex)
                        {
                            using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                            {
                                writer.WriteLine(DateTime.Now + ": PlayController ex1: " + ex.Message);
                            }

                        }

                        if (s.Words == 1 || (s.Words > 1 && double.Parse(end) - double.Parse(start) > 0.3))
                        {

                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");

                            if (speed == 0)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 9.wav", audPath);
                                Thread.Sleep(700);
                            }
                            else if(speed==1)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.wav", audPath);
                                Thread.Sleep(700);
                                ExecuteCommandSync("ffmpeg -i 8.wav -filter:a atempo=0.875 -vn 9.wav", audPath);
                                Thread.Sleep(600);
                            }
                            else if (speed == 2)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.wav", audPath);
                                Thread.Sleep(700);
                                ExecuteCommandSync("ffmpeg -i 8.wav -filter:a atempo=0.75 -vn 9.wav", audPath);
                                Thread.Sleep(600);
                            }
                            else if (speed == 3)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.wav", audPath);
                                Thread.Sleep(700);
                                ExecuteCommandSync("ffmpeg -i 8.wav -filter:a atempo=0.625 -vn 9.wav", audPath);
                                Thread.Sleep(600);
                            }
                            else if (speed == 4)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.wav", audPath);
                                Thread.Sleep(700);
                                ExecuteCommandSync("ffmpeg -i 8.wav -filter:a atempo=0.5 -vn 9.wav", audPath);
                                Thread.Sleep(600);
                            }
                            else if (speed == 5)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.wav", audPath);
                                Thread.Sleep(700);
                                ExecuteCommandSync("ffmpeg -i 8.wav -filter:a atempo=1.25 -vn 9.wav", audPath);
                                Thread.Sleep(600);
                            }
                            else if (speed == 6)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.wav", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.wav -filter:a atempo=1.5 -vn 9.wav", audPath);
                                Thread.Sleep(600);
                            }

                            System.IO.File.Copy(audPath + "9.wav", audPath + "9.mp3");
                            Thread.Sleep(600);
                            System.IO.File.Delete(audPath + "8.wav");
                            System.IO.File.Delete(audPath + "9.wav");

                            if (!System.IO.File.Exists(audPath + "\\9.mp3"))
                                Thread.Sleep(400);

                            if (!System.IO.File.Exists(audPath + "\\9.mp3"))
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 9.mp3", audPath);
                                Thread.Sleep(800);
                                if (!System.IO.File.Exists(audPath + "\\9.mp3"))
                                    Thread.Sleep(400);
                            }
                            if (!System.IO.File.Exists(audPath + "\\9.mp3"))
                                s.Id = 0;
                            else
                            {
                                System.IO.File.Copy(audPath + "\\9.mp3", path + "\\" + s.Id + "_" + tick + ".mp3", true);
                                 System.IO.File.Copy(audPath + "\\9.mp3",@"c:\Records\" + userid + "_" +s.Id+ "_" + DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss") +".MP3", true);
                            }



                        }
                        if (go)
                        {
                            if (s.End != null && s.Start != null)
                            {
                                index++;
                                s = sentences[index];
                            }
                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch (Exception ex)
                {
                    using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                    {
                        writer.WriteLine(DateTime.Now + ": PlayController ex2: " + ex.Message);
                    }
                }

                index++;
                _cache.Set("index;" + userid, index);


                Sentence lastS = s;
                try
                {
                    if (s.notTitles == true)
                    {
                        for (int z = index; z < sentences.Count; z++)
                        {
                            if (sentences[z].notTitles != true)
                            {
                                lastS = sentences[z];
                                break;
                            }
                        }
                    }

                }
                catch { }

                

                UserRead ur = context.UserRead.FirstOrDefault(x => x.userId == userid && x.chapterId == chapterid);
                if(ur==null)
                {
                    ur = new UserRead();
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = orgI;
                    ur.index = orgIndex;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = lastS.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    context.UserRead.Add(ur);
                    context.SaveChanges();
                }
                else
                {
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = orgI;
                    ur.index = orgIndex;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = lastS.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    context.UserRead.Update(ur);
                    context.SaveChanges();
                }


                UserReadLast url = context.UserReadLast.FirstOrDefault(x => x.userId == userid && x.bookId == bookid);

                if (url == null)
                {
                    url = new UserReadLast();
                    url.bookId = bookid;
                    url.chapterId = chapterid;
                    url.i = orgI;
                    url.index = orgIndex;
                    url.sentenceId = s.Id;
                    url.sentenceText = lastS.Transcript.Replace("  ", " ");
                    url.userId = userid;
                    context.UserReadLast.Add(url);
                    context.SaveChanges();
                }
                else
                {
                    url.bookId = bookid;
                    url.chapterId = chapterid;
                    url.i = orgI;
                    url.index = orgIndex;
                    url.sentenceId = s.Id;
                    url.sentenceText = lastS.Transcript.Replace("  ", " ");
                    url.userId = userid;
                    context.UserReadLast.Update(url);
                    context.SaveChanges();
                }


                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                if (user.readTimer == null)
                    user.readTimer = 0;
                user.readTimer += Convert.ToInt32(s.End - s.Start);
                context.Users.Update(user);
                context.SaveChanges();

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                s.Words = tick;
                s.Transcript = s.Transcript.Replace("  ", " ");


                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.ChapterNameEng = c.ChapterNameEng;
                rsp.ChapterName = c.ChapterName;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;


                List<Word> words = rsp.WordsNavigation.ToList();
                if (speed == 0)
                {

                }
                else if (speed == 1)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.25;
                        words[w].EndTime = words[w].EndTime * 1.25;
                    }
                }
                else if (speed == 2)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.5;
                        words[w].EndTime = words[w].EndTime * 1.5;
                    }
                }
                else if (speed == 3)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.75;
                        words[w].EndTime = words[w].EndTime * 1.75;
                    }
                }
                else if (speed == 4)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 2;
                        words[w].EndTime = words[w].EndTime * 2;
                    }
                }
                else if (speed == 5)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 0.875;
                        words[w].EndTime = words[w].EndTime * 0.875;
                    }
                }
                else if (speed == 6)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 0.75;
                        words[w].EndTime = words[w].EndTime * 0.75;
                    }
                }

                rsp.WordsNavigation = words;

                return rsp;
            }
            catch (Exception ex2)
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);

                int tick = int.Parse(DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString());


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                List<Sentence> sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();
                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");

                int k = 0;
                if (micid != 0)
                {
                    for (int j = 1; j < sentences.Count; j++)
                    {

                        if (micid == sentences[j].Id)
                        {
                            i = j + 1 + k;
                            index = j;
                            break;
                        }
                        else
                        {

                            string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                            start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                            string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                            try
                            {
                                if (sentences[j].Words == 0 || (sentences[j].Words > 1 && double.Parse(end) - double.Parse(start) <= 0.5))
                                    k++;
                            }
                            catch { }

                        }

                    }
                }



                if (sentences.Count() <= index)
                {
                    SentenceRsp rsp2 = new SentenceRsp();
                    rsp2.Transcript = "finish";
                    return rsp2;
                }
                Sentence s = sentences[index];

                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + "9.mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                //   string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = "0";
                        if (s.Start == null)
                        {
                            start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            start = start.Substring(0, 6);
                        }
                        else
                            start = s.Start.ToString();
                        //start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = "0";
                        if (s.End == null)
                        {
                            end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                        }
                        else
                            end = s.End.ToString();




                        try
                        {
                            end = end.Split('\r')[0];
                            start = start.Split('\r')[0];
                            end = end.Split('\n')[0];
                            start = start.Split('\n')[0];
                            end = end.Split('[')[0];
                            start = start.Split('[')[0];


                        }
                        catch (Exception ex)
                        {
                            using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                            {
                                writer.WriteLine(DateTime.Now + ": PlayController ex1: " + ex.Message);
                            }

                        }

                        if (s.Words == 1 || (s.Words > 1 && double.Parse(end) - double.Parse(start) > 0.3))
                        {

                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");
                            if (speed == 0)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 9.mp3", audPath);
                                Thread.Sleep(800);
                            }
                            else if (speed == 1)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.875 -vn 9.mp3", audPath);
                            }
                            else if (speed == 2)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.75 -vn 9.mp3", audPath);
                            }
                            else if (speed == 3)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.625 -vn 9.mp3", audPath);
                            }
                            else if (speed == 4)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.5 -vn 9.mp3", audPath);
                            }
                            else if (speed == 5)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.25 -vn 9.mp3", audPath);
                            }
                            else if (speed == 6)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.5 -vn 9.mp3", audPath);
                            }

                            //  ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 9.mp3", audPath);
                            Thread.Sleep(650);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\9.mp3", path + "\\" + s.Id + "_" + tick + ".mp3", true);


                        }
                        if (go)
                        {
                            if (s.End != null && s.Start != null)
                            {
                                index++;
                                s = sentences[index];
                            }
                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch (Exception ex)
                {
                    using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                    {
                        writer.WriteLine(DateTime.Now + ": PlayController ex2: " + ex.Message);
                    }
                }

                index++;
                _cache.Set("index;" + userid, index);



                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                if (user.readTimer == null)
                    user.readTimer = 0;
                user.readTimer += Convert.ToInt32(s.End - s.Start);
                context.Users.Update(user);
                context.SaveChanges();

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                s.Words = tick;


                string pasuk = "";
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }
                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;


                List<Word> words = rsp.WordsNavigation.ToList();
                if (speed == 0)
                {
                    
                }
                else if (speed == 1)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.5;
                        words[w].EndTime = words[w].EndTime * 1.5;
                    }
                }
                else if (speed == 2)
                {
                    for(int w=0;w< words.Count;w++)
                    {
                        words[w].StartTime = words[w].StartTime * 2;
                        words[w].EndTime = words[w].EndTime * 2;
                    }
                }
                rsp.WordsNavigation = words;

                return rsp;
            }

        }

        private string GenTimeSpanFromSeconds(double seconds)
        {
            // Create a TimeSpan object and TimeSpan string from 
            // a number of seconds.
            TimeSpan interval = TimeSpan.FromSeconds(seconds);
            string timeInterval = interval.ToString();

            // Pad the end of the TimeSpan string with spaces if it 
            // does not contain milliseconds.
            int pIndex = timeInterval.IndexOf(':');
            pIndex = timeInterval.IndexOf('.', pIndex);
            if (pIndex < 0) timeInterval += "        ";

            return timeInterval.Substring(0, 12);
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
                //   System.Diagnostics.Process proc = new System.Diagnostics.Process();
                //   proc.StartInfo = procStartInfo;
                //   proc.Start();

                //   proc.Dispose();
                //  proc.Close();
                using (System.Diagnostics.Process proc = new System.Diagnostics.Process())
                {
                    proc.StartInfo = procStartInfo;
                    proc.Start();
                    if (!proc.WaitForExit(5000)) // Wait up to 30 seconds
                    {
                        // If the process hasn't exited, kill it
                        proc.Kill();
                    }

                }
            }
            catch (Exception objException)
            {
                // Log the exception
            }
        }





        #region PARASHOT


        [HttpGet, Route("PrePareAudioParashot")]
        public IActionResult PrePareAudioParashot(int parasha, int chapter, int usrId)
        {
            Chapter c = context.Chapters.Where(x => x.Id == chapter).ToList()[0];
            UserReadParashot ur = context.UserReadParashot.FirstOrDefault(x => x.userId == usrId && x.parashaId == parasha);

            if (ur != null)
            {
                _cache.Set("index;" + usrId, ur.index);
                _cache.Set("i;" + usrId, ur.i);
            }
            else
            {
                _cache.Set("index;" + usrId, 0);
                _cache.Set("i;" + usrId, 0);
            }

            List<Sentence> sentences = (List<Sentence>)_cache.Get("Parashot;" + usrId);
            if (sentences == null)
                sentences = context.Sentences.Where(x => x.ChapterId == chapter).OrderBy(x => x.Confidence).ToList();
            int index = 0;
            _cache.TryGetValue("index;" + usrId, out index);

            chapter = (int)sentences[index].ChapterId;


            bool exists = System.IO.Directory.Exists("C:\\ReadUp\\users\\" + usrId + "\\");

            if (!exists)
                System.IO.Directory.CreateDirectory("C:\\ReadUp\\users\\" + usrId + "\\");

            System.IO.File.Copy(c.Mp3Path, "C:\\ReadUp\\users\\" + usrId + "\\aud.mp3", true);
            System.IO.File.Copy("C:\\ReadUp\\users\\ffmpeg.exe", "C:\\ReadUp\\users\\" + usrId + "\\ffmpeg.exe", true);

            try
            {
                System.IO.File.Copy("c:\\tmp\\ffmpeg.exe", "C:\\ReadUp\\users\\ffmpeg.exe");

            }
            catch { }



            return Ok();
        }


        [HttpGet, Route("GetNextLineParashot")]
        public SentenceRsp GetNextLineParashot(int parasha,int bookid, int chapterid, int micid, int userid, bool repit,int parashot_index, int speed)
        {

            string filename = bookid.ToString() + chapterid.ToString() + userid.ToString();
            try
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                string isNext;
                _cache.TryGetValue("pressNext;" + userid, out isNext);
                string isBack;
                _cache.TryGetValue("pressBack;" + userid, out isBack);


                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                if (isNext == "true")
                {
                    if (i > 1)
                    {
                        i--;
                        _cache.Set("pressNext;" + userid, "false");
                    }
                    if (index > 0)
                        index--;
                }
                if (repit)
                {
                    i--;
                    index--;
                }

                int orgIndex = index;
                int orgI = i;

                List<Sentence> sentences;
                try
                {
                   sentences = (List<Sentence>)_cache.Get("Parashot;" + userid);
                }
                catch
                {
                    sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();
                }
                if(sentences==null)
                    sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();


                chapterid = (int)sentences[index].ChapterId;
                filename = bookid.ToString() + chapterid.ToString() + userid.ToString();

                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");

                int k = 0;
                if (micid != 0)
                {
                    for (int j = 0; j < sentences.Count; j++)
                    {

                        if (micid == sentences[j].Id)
                        {
                            i = j + 1 + k;
                            index = j;
                            break;
                        }
                        else
                        {
                            try
                            {
                                string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                                start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                                string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                                end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                                end = end.Substring(0, 6);
                                try
                                {
                                    if (sentences[j].Words == 0 || (sentences[j].Words > 1 && double.Parse(end) - double.Parse(start) <= 0.5))
                                        k++;
                                }
                                catch { }
                            }
                            catch { }

                        }

                    }
                }

                int tick = int.Parse(DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString());


                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                //for (int w = sentences.Count - 1; w >= 0; w--)
                //{
                //    if (sentences[w].Transcript.Contains("("))
                //    {
                //        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                //        break;
                //    }

                //}
                try
                {
                    lastpasuk = context.ParashaDetails.FirstOrDefault(x => x.BookId == bookid && s.ChapterId <= x.ChapterIdEnd && s.Id >= x.ChapterIdStart).PasukEnd.Split(":")[1].ToString();
                }
                catch { }

                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                // string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                exists = System.IO.Directory.Exists(path);

                if (!exists)
                    System.IO.Directory.CreateDirectory(path);


                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = "0";
                        if (s.Start == null)
                        {
                            start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            start = start.Substring(0, 6);
                        }
                        else
                            start = s.Start.ToString();
                        //start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = "0";
                        if (s.End == null)
                        {
                            end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                        }
                        else
                            end = s.End.ToString();




                        try
                        {
                            end = end.Split('\r')[0];
                            start = start.Split('\r')[0];
                            end = end.Split('\n')[0];
                            start = start.Split('\n')[0];
                            end = end.Split('[')[0];
                            start = start.Split('[')[0];


                        }
                        catch (Exception ex)
                        {
                            using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                            {
                                writer.WriteLine(DateTime.Now + ": PlayController ex1: " + ex.Message);
                            }

                        }

                        if (s.Words == 1 || (s.Words > 1 && double.Parse(end) - double.Parse(start) > 0.3))
                        {

                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");
                            if (speed == 0)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy " + filename + ".mp3", audPath);
                                Thread.Sleep(800);
                            }
                            else if (speed == 1)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.875 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 2)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.75 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 3)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.625 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 4)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.5 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 5)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.25 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 6)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.5 -vn " + filename + ".mp3", audPath);
                            }

                            //    ExecuteCommandSync("ffmpeg -i " + audPath + "aud_"+chapterid+".mp3 -ss " + startTime + " -to " + endTime + " -c copy "+ filename+".mp3", audPath);
                            Thread.Sleep(650);


                            if (!System.IO.File.Exists(audPath + "\\"+ filename + ".mp3"))
                                Thread.Sleep(400);

                            if (!System.IO.File.Exists(audPath + "\\"+ filename + ".mp3"))
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy "+ filename + ".mp3", audPath);
                                Thread.Sleep(800);
                                if (!System.IO.File.Exists(audPath + "\\"+ filename + ".mp3"))
                                    Thread.Sleep(400);
                            }
                            if (!System.IO.File.Exists(audPath + "\\"+ filename + ".mp3"))
                                s.Id = 0;
                            else
                                System.IO.File.Copy(audPath + "\\"+ filename + ".mp3", path + "\\" + s.Id + "_" + tick + ".mp3", true);


                        }
                        if (go)
                        {
                            if (s.End != null && s.Start != null)
                            {
                                index++;
                                s = sentences[index];
                            }
                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch (Exception ex)
                {
                    using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                    {
                        writer.WriteLine(DateTime.Now + ": PlayController ex2: " + ex.Message);
                    }
                }

                index++;
                _cache.Set("index;" + userid, index);


                Sentence lastS = s;
                try
                {
                    if (s.notTitles == true)
                    {
                        for (int z = index; z < sentences.Count; z++)
                        {
                            if (sentences[z].notTitles != true)
                            {
                                lastS = sentences[z];
                                break;
                            }
                        }
                    }

                }
                catch { }



                UserReadParashot ur = context.UserReadParashot.FirstOrDefault(x => x.userId == userid && x.parashaId == parasha);
                if (ur == null)
                {
                    ur = new UserReadParashot();
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = i;
                    ur.index = index;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = lastS.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    ur.parashaId = parasha;
                    ur.parashot_index = parashot_index;
                    context.UserReadParashot.Add(ur);
                    context.SaveChanges();
                }
                else
                {
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = i;
                    ur.index = index;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = lastS.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    ur.parashaId = parasha;
                    ur.parashot_index = parashot_index;
                    context.UserReadParashot.Update(ur);
                    context.SaveChanges();
                }


                UserReadLastParashot url = context.UserReadLastParashot.FirstOrDefault(x => x.userId == userid && x.bookId == bookid);

                if (url == null)
                {
                    url = new UserReadLastParashot();
                    url.bookId = bookid;
                    url.chapterId = chapterid;
                    url.i = i;
                    url.index = index;
                    url.sentenceId = s.Id;
                    url.sentenceText = lastS.Transcript.Replace("  ", " ");
                    url.userId = userid;
                    url.parashaId = parasha;
                    url.parashot_index = parashot_index;
                    context.UserReadLastParashot.Add(url);
                    context.SaveChanges();
                }
                else
                {
                    url.bookId = bookid;
                    url.chapterId = chapterid;
                    url.i = i;
                    url.index = index;
                    url.sentenceId = s.Id;
                    url.sentenceText = lastS.Transcript.Replace("  ", " ");
                    url.userId = userid;
                    url.parashot_index = parashot_index;
                    url.parashaId = parasha;
                    context.UserReadLastParashot.Update(url);
                    context.SaveChanges();
                }


                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                if (user.readTimer == null)
                    user.readTimer = 0;
                user.readTimer += Convert.ToInt32(s.End - s.Start);
                context.Users.Update(user);
                context.SaveChanges();

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                s.Words = tick;
                s.Transcript = s.Transcript.Replace("  ", " ");


                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.ChapterName = c.ChapterName;
                rsp.ChapterNameEng = c.ChapterNameEng;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;
                try
                {
                    if (sentences[index].Confidence == 0 && index>3)
                        rsp.nextChapter = true;
                    else
                        rsp.nextChapter = false;
                }
                catch
                {

                }


                List<Word> words = rsp.WordsNavigation.ToList();
                if (speed == 0)
                {

                }
                else if (speed == 1)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.25;
                        words[w].EndTime = words[w].EndTime * 1.25;
                    }
                }
                else if (speed == 2)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.5;
                        words[w].EndTime = words[w].EndTime * 1.5;
                    }
                }
                else if (speed == 3)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.75;
                        words[w].EndTime = words[w].EndTime * 1.75;
                    }
                }
                else if (speed == 4)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 2;
                        words[w].EndTime = words[w].EndTime * 2;
                    }
                }
                else if (speed == 5)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 0.875;
                        words[w].EndTime = words[w].EndTime * 0.875;
                    }
                }
                else if (speed == 6)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 0.75;
                        words[w].EndTime = words[w].EndTime * 0.75;
                    }
                }

                rsp.WordsNavigation = words;


                return rsp;
            }
            catch (Exception ex2)
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);

                int tick = int.Parse(DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString());


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                List<Sentence> sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();
                
                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");

                int k = 0;
                if (micid != 0)
                {
                    for (int j = 1; j < sentences.Count; j++)
                    {

                        if (micid == sentences[j].Id)
                        {
                            i = j + 1 + k;
                            index = j;
                            break;
                        }
                        else
                        {

                            string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                            start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                            string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                            try
                            {
                                if (sentences[j].Words == 0 || (sentences[j].Words > 1 && double.Parse(end) - double.Parse(start) <= 0.5))
                                    k++;
                            }
                            catch { }

                        }

                    }
                }




                Sentence s = sentences[index];
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                //   string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = "0";
                        if (s.Start == null)
                        {
                            start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            start = start.Substring(0, 6);
                        }
                        else
                            start = s.Start.ToString();
                        //start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = "0";
                        if (s.End == null)
                        {
                            end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                        }
                        else
                            end = s.End.ToString();




                        try
                        {
                            end = end.Split('\r')[0];
                            start = start.Split('\r')[0];
                            end = end.Split('\n')[0];
                            start = start.Split('\n')[0];
                            end = end.Split('[')[0];
                            start = start.Split('[')[0];


                        }
                        catch (Exception ex)
                        {
                            using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                            {
                                writer.WriteLine(DateTime.Now + ": PlayController ex1: " + ex.Message);
                            }

                        }

                        if (s.Words == 1 || (s.Words > 1 && double.Parse(end) - double.Parse(start) > 0.3))
                        {

                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");
                            if (speed == 0)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy " + filename + ".mp3", audPath);
                                Thread.Sleep(800);
                            }
                            else if (speed == 1)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.875 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 2)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.75 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 3)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.625 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 4)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.5 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 5)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.25 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 6)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.5 -vn " + filename + ".mp3", audPath);
                            }

                            //   ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy "+ filename + ".mp3", audPath);
                            Thread.Sleep(650);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\"+ filename + ".mp3", path + "\\" + s.Id + "_" + tick + ".mp3", true);


                        }
                        if (go)
                        {
                            if (s.End != null && s.Start != null)
                            {
                                index++;
                                s = sentences[index];
                            }
                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch (Exception ex)
                {
                    using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                    {
                        writer.WriteLine(DateTime.Now + ": PlayController ex2: " + ex.Message);
                    }
                }

                index++;
                _cache.Set("index;" + userid, index);



                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                if (user.readTimer == null)
                    user.readTimer = 0;
                user.readTimer += Convert.ToInt32(s.End - s.Start);
                context.Users.Update(user);
                context.SaveChanges();

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                s.Words = tick;


                string pasuk = "";
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }
                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;


                return rsp;
            }

        }



        [HttpGet, Route("NextParashot")]
        public SentenceRsp NextParashot(int bookid, int chapterid, int userid)
        {
            string filename = bookid.ToString() + chapterid.ToString() + userid.ToString();
            try
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";

                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);



                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;


                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");


                List<Sentence> sentences = (List<Sentence>)_cache.Get("Parashot;" + userid);
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];


                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                //     string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;
                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                        end = end.Substring(0, 6);

                        if (double.Parse(end) - double.Parse(start) > 0.5)
                        {
                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");


                            ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy "+ filename + ".mp3", audPath);
                            Thread.Sleep(500);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\"+ filename + ".mp3", path + "\\" + s.Id + ".mp3", true);



                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch
                {

                }


                index++;
                _cache.Set("index;" + userid, index);
                _cache.Set("pressNext;" + userid, "true");
                _cache.Set("pressBack;" + userid, "false");


                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;
                try
                {
                    if (sentences[index].Confidence == 0)
                        rsp.nextChapter = true;
                    else
                        rsp.nextChapter = false;
                }
                catch
                {

                }

                return rsp;
            }
            catch
            {
                return null;
            }


        }

        [HttpGet, Route("BackParashot")]
        public SentenceRsp BackParashot(int bookid, int chapterid, int userid,int parasha, int parashot_index)
        {
            string filename = bookid.ToString() + chapterid.ToString() + userid.ToString();

            try
            {

                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                index--;
                i--;
                if (index < 0)
                    index = 0;
                if (i < 0)
                    i = 0;

                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");


                List<Sentence> sentences = (List<Sentence>)_cache.Get("Parashot;" + userid);
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                // string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                        end = end.Substring(0, 6);

                        if (double.Parse(end) - double.Parse(start) > 0.5)
                        {
                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");


                            ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy "+ filename + ".mp3", audPath);
                            Thread.Sleep(500);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\"+ filename + ".mp3", path + "\\" + s.Id + ".mp3", true);



                        }
                        i--;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch
                {

                }
                UserReadParashot ur = context.UserReadParashot.FirstOrDefault(x => x.userId == userid && x.parashaId == parasha);
                if (ur == null)
                {
                    ur = new UserReadParashot();
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = i;
                    ur.index = index;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = s.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    ur.parashaId = parasha;
                    ur.parashot_index = parashot_index;
                    context.UserReadParashot.Add(ur);
                    context.SaveChanges();
                }
                else
                {
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = i;
                    ur.index = index;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = s.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    ur.parashaId = parasha;
                    ur.parashot_index = parashot_index;
                    context.UserReadParashot.Update(ur);
                    context.SaveChanges();
                }

                //  index--;
                _cache.Set("index;" + userid, index);
                _cache.Set("pressBack;" + userid, "true");
                _cache.Set("pressNext;" + userid, "false");

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;
                try
                {
                    if (sentences[index+1].Confidence == 0)
                        rsp.nextChapter = true;
                    else
                        rsp.nextChapter =  false;
                }
                catch
                {
                }

                return rsp;
            }
            catch
            {
                return null;
            }
        }


        [HttpGet, Route("PrePareAudioStopParashot")]
        public IActionResult PrePareAudioStopParashot(int parasha,int chapter, int usrId,bool isNew)
        {
            try
            {
                string chapterid = chapter.ToString();
                Chapter c = context.Chapters.Where(x => x.Id == int.Parse(chapterid)).ToList()[0];
                
                    List<Sentence> sentences = (List<Sentence>)_cache.Get("Parashot;" + usrId);
                if(sentences==null)
                    sentences = context.Sentences.Where(x => x.ChapterId == int.Parse(chapterid)).OrderBy(x => x.Confidence).ToList();

                Sentence s = new Sentence();
                    foreach (Sentence sen in sentences)
                    {
                        if (sen.notTitles != true)
                        {
                            s = sen;
                            break;
                        }
                    }






                if (isNew)
                {

                    _cache.Set("index;" + usrId, 0);
                    _cache.Set("i;" + usrId, 0);
                }
                int index = 0;
                _cache.TryGetValue("index;" + usrId, out index);

                chapterid = sentences[index].ChapterId.ToString();

                UserReadParashot ur = context.UserReadParashot.FirstOrDefault(x => x.userId == usrId && x.parashaId == parasha);
                ur.parashaId = parasha;
                ur.bookId = int.Parse(c.BookId.ToString());
                ur.chapterId = c.Id;
                ur.i = 0;
                ur.index = 0;
                ur.sentenceId = s.Id;
                ur.sentenceText = s.Transcript.Replace("  ", " ");
                ur.userId = usrId;
                ur.parashot_index = 0;
                context.UserReadParashot.Update(ur);
                context.SaveChanges();

                UserReadLastParashot url = context.UserReadLastParashot.FirstOrDefault(x => x.userId == usrId && x.bookId == int.Parse(c.BookId.ToString()));
                url.parashaId = parasha;
                url.bookId = int.Parse(c.BookId.ToString());
                url.chapterId = c.Id;
                url.i = 0;
                url.index = 0;
                url.sentenceId = s.Id;
                url.sentenceText = s.Transcript.Replace("  ", " ");
                url.userId = usrId;
                url.parashot_index = 0;
                context.UserReadParashot.Update(ur);
                context.SaveChanges();



                bool exists = System.IO.Directory.Exists("C:\\ReadUp\\users\\" + usrId + "\\");

                if (!exists)
                    System.IO.Directory.CreateDirectory("C:\\ReadUp\\users\\" + usrId + "\\");

                System.IO.File.Copy(c.Mp3Path, "C:\\ReadUp\\users\\" + usrId + "\\aud_"+ chapterid + ".mp3", true);
                System.IO.File.Copy("C:\\ReadUp\\users\\ffmpeg.exe", "C:\\ReadUp\\users\\" + usrId + "\\ffmpeg.exe", true);

                try
                {
                    System.IO.File.Copy("c:\\tmp\\ffmpeg.exe", "C:\\ReadUp\\users\\ffmpeg.exe");

                }
                catch { }
            }
            catch { }



            return Ok();
        }


        #endregion


        #region STORIES


        [HttpGet, Route("PrePareAudioStories")]
        public IActionResult PrePareAudioStories(int parasha, int chapter, int usrId)
        {
            Chapter c = context.Chapters.Where(x => x.Id == chapter).ToList()[0];
            UserReadStories ur = context.UserReadStories.FirstOrDefault(x => x.userId == usrId && x.parashaId == parasha);

            if (ur != null)
            {
                _cache.Set("index;" + usrId, ur.index);
                _cache.Set("i;" + usrId, ur.i);
            }
            else
            {
                _cache.Set("index;" + usrId, 0);
                _cache.Set("i;" + usrId, 0);
            }

            List<Sentence> sentences = (List<Sentence>)_cache.Get("Stories;" + usrId);
            if(chapter!=0)
                sentences = context.Sentences.Where(x => x.ChapterId == chapter).OrderBy(x => x.Confidence).ToList();
            _cache.Set("Stories;" + usrId, sentences);
            int index = 0;
            _cache.TryGetValue("index;" + usrId, out index);

            chapter = (int)sentences[index].ChapterId;


            bool exists = System.IO.Directory.Exists("C:\\ReadUp\\users\\" + usrId + "\\");

            if (!exists)
                System.IO.Directory.CreateDirectory("C:\\ReadUp\\users\\" + usrId + "\\");

            System.IO.File.Copy(c.Mp3Path, "C:\\ReadUp\\users\\" + usrId + "\\aud.mp3", true);
            System.IO.File.Copy("C:\\ReadUp\\users\\ffmpeg.exe", "C:\\ReadUp\\users\\" + usrId + "\\ffmpeg.exe", true);

            try
            {
                System.IO.File.Copy("c:\\tmp\\ffmpeg.exe", "C:\\ReadUp\\users\\ffmpeg.exe");

            }
            catch { }



            return Ok();
        }


        [HttpGet, Route("GetNextLineStories")]
        public SentenceRsp GetNextLineStories(int parasha, int bookid, int chapterid, int micid, int userid, bool repit, int parashot_index, int speed)
        {
            string filename = bookid.ToString() + chapterid.ToString() + userid.ToString();

            try
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                string isNext;
                _cache.TryGetValue("pressNext;" + userid, out isNext);
                string isBack;
                _cache.TryGetValue("pressBack;" + userid, out isBack);


                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                if (isNext == "true")
                {
                    if (i > 1)
                    {
                        i--;
                        _cache.Set("pressNext;" + userid, "false");
                    }
                    if (index > 0)
                        index--;
                }
                if (repit)
                {
                    i--;
                    index--;
                }

                int orgIndex = index;
                int orgI = i;

                List<Sentence> sentences;
                try
                {
                    sentences = (List<Sentence>)_cache.Get("Stories;" + userid);
                }
                catch
                {
                    sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();
                }
                if(sentences==null)
                    sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();

                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");

                int k = 0;
                if (micid != 0)
                {
                    for (int j = 0; j < sentences.Count; j++)
                    {

                        if (micid == sentences[j].Id)
                        {
                            i = j + 1 + k;
                            index = j;
                            break;
                        }
                        else
                        {
                            try
                            {
                                string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                                start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                                string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                                end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                                end = end.Substring(0, 6);
                                try
                                {
                                    if (sentences[j].Words == 0 || (sentences[j].Words > 1 && double.Parse(end) - double.Parse(start) <= 0.5))
                                        k++;
                                }
                                catch { }
                            }
                            catch { }

                        }

                    }
                }

                int tick = int.Parse(DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString());


                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                //for (int w = sentences.Count - 1; w >= 0; w--)
                //{
                //    if (sentences[w].Transcript.Contains("("))
                //    {
                //        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                //        break;
                //    }

                //}
                try
                {
                    lastpasuk = context.StoriesDetail.FirstOrDefault(x => x.BookId == bookid && s.ChapterId <= x.ChapterIdEnd && s.Id >= x.ChapterIdStart).PasukEnd.Split(":")[1].ToString();
                }
                catch { }

                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                // string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                exists = System.IO.Directory.Exists(path);

                if (!exists)
                    System.IO.Directory.CreateDirectory(path);


                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = "0";
                        if (s.Start == null)
                        {
                            start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            start = start.Substring(0, 6);
                        }
                        else
                            start = s.Start.ToString();
                        //start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = "0";
                        if (s.End == null)
                        {
                            end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                        }
                        else
                            end = s.End.ToString();




                        try
                        {
                            end = end.Split('\r')[0];
                            start = start.Split('\r')[0];
                            end = end.Split('\n')[0];
                            start = start.Split('\n')[0];
                            end = end.Split('[')[0];
                            start = start.Split('[')[0];


                        }
                        catch (Exception ex)
                        {
                            using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                            {
                                writer.WriteLine(DateTime.Now + ": PlayController ex1: " + ex.Message);
                            }

                        }

                        if (s.Words == 1 || (s.Words > 1 && double.Parse(end) - double.Parse(start) > 0.3))
                        {

                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");
                            if (speed == 0)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy "+ filename + ".mp3", audPath);
                                Thread.Sleep(800);
                            }
                            else if (speed == 1)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.875 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 2)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.75 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 3)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.625 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 4)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.5 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 5)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.25 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 6)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.5 -vn " + filename + ".mp3", audPath);
                            }

                            //    ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy " + filename + ".mp3", audPath);
                            Thread.Sleep(800);
                           

                            if (!System.IO.File.Exists(audPath + "\\" + filename + ".mp3"))
                                Thread.Sleep(400);

                            if (!System.IO.File.Exists(audPath + "\\" + filename + ".mp3"))
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy " + filename + ".mp3", audPath);
                                Thread.Sleep(800);
                                if (!System.IO.File.Exists(audPath + "\\" + filename + ".mp3"))
                                    Thread.Sleep(400);
                            }
                            if (!System.IO.File.Exists(audPath + "\\" + filename + ".mp3"))
                                s.Id = 0;
                            else
                                System.IO.File.Copy(audPath + "\\" + filename + ".mp3", path + "\\" + s.Id + "_" + tick + ".mp3", true);


                        }
                        if (go)
                        {
                            if (s.End != null && s.Start != null)
                            {
                                index++;
                                s = sentences[index];
                            }
                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch (Exception ex)
                {
                    using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                    {
                        writer.WriteLine(DateTime.Now + ": PlayController ex2: " + ex.Message);
                    }
                }

                index++;
                _cache.Set("index;" + userid, index);


                Sentence lastS = s;
                try
                {
                    if (s.notTitles == true)
                    {
                        for (int z = index; z < sentences.Count; z++)
                        {
                            if (sentences[z].notTitles != true)
                            {
                                lastS = sentences[z];
                                break;
                            }
                        }
                    }

                }
                catch { }



                UserReadStories ur = context.UserReadStories.FirstOrDefault(x => x.userId == userid && x.parashaId == parasha);
                if (ur == null)
                {
                    ur = new UserReadStories();
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = orgI;
                    ur.index = orgIndex;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = lastS.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    ur.parashaId = parasha;
                    ur.stories_index = parashot_index;
                    context.UserReadStories.Add(ur);
                    context.SaveChanges();
                }
                else
                {
                    ur.bookId = bookid;
                    ur.chapterId = chapterid;
                    ur.i = orgI;
                    ur.index = orgIndex;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = lastS.Transcript.Replace("  ", " ");
                    ur.userId = userid;
                    ur.parashaId = parasha;
                    ur.stories_index = parashot_index;
                    context.UserReadStories.Update(ur);
                    context.SaveChanges();
                }


                UserReadLastStories url = context.UserReadLastStories.FirstOrDefault(x => x.userId == userid && x.bookId == bookid);

                if (url == null)
                {
                    url = new UserReadLastStories();
                    url.bookId = bookid;
                    url.chapterId = chapterid;
                    url.i = orgI;
                    url.index = orgIndex;
                    url.sentenceId = s.Id;
                    url.sentenceText = lastS.Transcript.Replace("  ", " ");
                    url.userId = userid;
                    url.parashaId = parasha;
                    url.stories_index = parashot_index;
                    context.UserReadLastStories.Add(url);
                    context.SaveChanges();
                }
                else
                {
                    url.bookId = bookid;
                    url.chapterId = chapterid;
                    url.i = orgI;
                    url.index = orgIndex;
                    url.sentenceId = s.Id;
                    url.sentenceText = lastS.Transcript.Replace("  ", " ");
                    url.userId = userid;
                    url.stories_index = parashot_index;
                    url.parashaId = parasha;
                    context.UserReadLastStories.Update(url);
                    context.SaveChanges();
                }


                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                if (user.readTimer == null)
                    user.readTimer = 0;
                user.readTimer += Convert.ToInt32(s.End - s.Start);
                context.Users.Update(user);
                context.SaveChanges();

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                s.Words = tick;
                s.Transcript = s.Transcript.Replace("  ", " ");


                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.ChapterName = c.ChapterName;
                rsp.ChapterNameEng = c.ChapterNameEng;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;
                try
                {
                    if (sentences[index].Confidence == 0 && index > 3)
                        rsp.nextChapter = true;
                    else
                        rsp.nextChapter = false;
                }
                catch
                {

                }




                List<Word> words = rsp.WordsNavigation.ToList();
                if (speed == 0)
                {

                }
                else if (speed == 1)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.25;
                        words[w].EndTime = words[w].EndTime * 1.25;
                    }
                }
                else if (speed == 2)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.5;
                        words[w].EndTime = words[w].EndTime * 1.5;
                    }
                }
                else if (speed == 3)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 1.75;
                        words[w].EndTime = words[w].EndTime * 1.75;
                    }
                }
                else if (speed == 4)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 2;
                        words[w].EndTime = words[w].EndTime * 2;
                    }
                }
                else if (speed == 5)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 0.875;
                        words[w].EndTime = words[w].EndTime * 0.875;
                    }
                }
                else if (speed == 6)
                {
                    for (int w = 0; w < words.Count; w++)
                    {
                        words[w].StartTime = words[w].StartTime * 0.75;
                        words[w].EndTime = words[w].EndTime * 0.75;
                    }
                }

                rsp.WordsNavigation = words;
                return rsp;
            }
            catch (Exception ex2)
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);

                int tick = int.Parse(DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString());


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                List<Sentence> sentences = context.Sentences.Where(x => x.ChapterId == chapterid).OrderBy(x => x.Confidence).ToList();

                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");

                int k = 0;
                if (micid != 0)
                {
                    for (int j = 1; j < sentences.Count; j++)
                    {

                        if (micid == sentences[j].Id)
                        {
                            i = j + 1 + k;
                            index = j;
                            break;
                        }
                        else
                        {

                            string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                            start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                            string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[j];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                            try
                            {
                                if (sentences[j].Words == 0 || (sentences[j].Words > 1 && double.Parse(end) - double.Parse(start) <= 0.5))
                                    k++;
                            }
                            catch { }

                        }

                    }
                }


                if (sentences.Count() <= index)
                {
                    SentenceRsp rsp2 = new SentenceRsp();
                    rsp2.Transcript = "finish";
                    return rsp2;
                }

                Sentence s = sentences[index];
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }


                //   string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = "0";
                        if (s.Start == null)
                        {
                            start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            start = start.Substring(0, 6);
                        }
                        else
                            start = s.Start.ToString();
                        //start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = "0";
                        if (s.End == null)
                        {
                            end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                            end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                            end = end.Substring(0, 6);
                        }
                        else
                            end = s.End.ToString();




                        try
                        {
                            end = end.Split('\r')[0];
                            start = start.Split('\r')[0];
                            end = end.Split('\n')[0];
                            start = start.Split('\n')[0];
                            end = end.Split('[')[0];
                            start = start.Split('[')[0];


                        }
                        catch (Exception ex)
                        {
                            using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                            {
                                writer.WriteLine(DateTime.Now + ": PlayController ex1: " + ex.Message);
                            }

                        }

                        if (s.Words == 1 || (s.Words > 1 && double.Parse(end) - double.Parse(start) > 0.3))
                        {

                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");
                            if (speed == 0)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy "+ filename + ".mp3", audPath);
                                Thread.Sleep(800);
                            }
                            else if (speed == 1)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.875 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 2)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.75 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 3)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.625 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 4)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=0.5 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 5)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.25 -vn " + filename + ".mp3", audPath);
                            }
                            else if (speed == 6)
                            {
                                ExecuteCommandSync("ffmpeg -i " + audPath + "aud.mp3 -ss " + startTime + " -to " + endTime + " -c copy 8.mp3", audPath);
                                Thread.Sleep(800);
                                ExecuteCommandSync("ffmpeg -i 8.mp3 -filter:a atempo=1.5 -vn " + filename + ".mp3", audPath);
                            }

                            //   ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy " + filename + ".mp3", audPath);
                            Thread.Sleep(650);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\" + filename + ".mp3", path + "\\" + s.Id + "_" + tick + ".mp3", true);


                        }
                        if (go)
                        {
                            if (s.End != null && s.Start != null)
                            {
                                index++;
                                s = sentences[index];
                            }
                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch (Exception ex)
                {
                    using (StreamWriter writer = System.IO.File.AppendText(@"c:\log\log.txt"))
                    {
                        writer.WriteLine(DateTime.Now + ": PlayController ex2: " + ex.Message);
                    }
                }

                index++;
                _cache.Set("index;" + userid, index);



                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                if (user.readTimer == null)
                    user.readTimer = 0;
                user.readTimer += Convert.ToInt32(s.End - s.Start);
                context.Users.Update(user);
                context.SaveChanges();

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                s.Words = tick;


                string pasuk = "";
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }
                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;


                return rsp;
            }

        }



        [HttpGet, Route("NextStories")]
        public SentenceRsp NextStories(int bookid, int chapterid, int userid)
        {
            string filename = bookid.ToString() + chapterid.ToString() + userid.ToString();
            try
            {
                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";

                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);



                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;


                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");


                List<Sentence> sentences = (List<Sentence>)_cache.Get("Stories;" + userid);
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];


                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                //     string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;
                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                        end = end.Substring(0, 6);

                        if (double.Parse(end) - double.Parse(start) > 0.5)
                        {
                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");


                            ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy " + filename + ".mp3", audPath);
                            Thread.Sleep(500);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\" + filename + ".mp3", path + "\\" + s.Id + ".mp3", true);



                        }
                        i++;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch
                {

                }


                index++;
                _cache.Set("index;" + userid, index);
                _cache.Set("pressNext;" + userid, "true");
                _cache.Set("pressBack;" + userid, "false");


                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;
                try
                {
                    if (sentences[index].Confidence == 0)
                        rsp.nextChapter = true;
                    else
                        rsp.nextChapter = false;
                }
                catch
                {

                }

                return rsp;
            }
            catch
            {
                return null;
            }


        }

        [HttpGet, Route("BackStories")]
        public SentenceRsp BackStories(int bookid, int chapterid, int userid)
        {
            string filename = bookid.ToString() + chapterid.ToString() + userid.ToString();

            try
            {

                string audPath = "C:\\ReadUp\\users\\" + userid + "\\";
                bool exists = System.IO.Directory.Exists(audPath);

                if (!exists)
                    System.IO.Directory.CreateDirectory(audPath);


                int index = 0;
                _cache.TryGetValue("index;" + userid, out index);

                int i = 1;
                _cache.TryGetValue("i;" + userid, out i);
                if (i == 0)
                    i = 1;

                index--;
                i--;
                if (index < 0)
                    index = 0;
                if (i < 0)
                    i = 0;

                string text = System.IO.File.ReadAllText("c:\\readup\\" + bookid + "\\" + chapterid + "\\vol.txt");


                List<Sentence> sentences = (List<Sentence>)_cache.Get("Stories;" + userid);
                Chapter c = context.Chapters.Where(x => x.Id == chapterid).ToList()[0];

                string pasuk = "";
                Sentence s = sentences[index];
                for (int w = index; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        pasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }
                string lastpasuk = "";
                for (int w = sentences.Count - 1; w >= 0; w--)
                {
                    if (sentences[w].Transcript.Contains("("))
                    {
                        lastpasuk = sentences[w].Transcript.Split("(")[1].Split(")")[0];
                        break;
                    }

                }

                s.WordsNavigation = context.Words.Where(x => x.SentenceId == s.Id).ToList();

                try
                {
                    System.IO.File.Delete(audPath + filename + ".mp3");
                    System.IO.File.Delete(audPath + "8.mp3");
                }
                catch { }

                // string path = "C:\\Users\\diama\\source\\repos\\VayikraUI\\Vayikra1\\Files\\play\\" + userid;
                string path = _configuration["AppSettings:path"] + userid;

                System.IO.DirectoryInfo di = new DirectoryInfo(path);
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
                try
                {
                    bool go = true;
                    while (go)
                    {
                        string start = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        start = start.Split(new string[] { "| " }, StringSplitOptions.None)[0];

                        string end = text.Split(new string[] { "silence_end: " }, StringSplitOptions.None)[i];
                        end = end.Split(new string[] { "silence_start: " }, StringSplitOptions.None)[1];
                        end = end.Substring(0, 6);

                        if (double.Parse(end) - double.Parse(start) > 0.5)
                        {
                            go = false;
                            string startTime = GenTimeSpanFromSeconds(double.Parse(start) - 0.1);
                            string endTime = GenTimeSpanFromSeconds(double.Parse(end) + 0.2);
                            //      File.Delete("c:\\tmp\\9.mp3");


                            ExecuteCommandSync("ffmpeg -i " + audPath + "aud_" + chapterid + ".mp3 -ss " + startTime + " -to " + endTime + " -c copy " + filename + ".mp3", audPath);
                            Thread.Sleep(500);
                            //ExecuteCommandSync("ffmpeg -i 9.mp3 9.flac", "c:\\readup\\" + bookid + "\\" + chapterid + "\\");
                            //Thread.Sleep(500);



                            System.IO.File.Copy(audPath + "\\" + filename + ".mp3", path + "\\" + s.Id + ".mp3", true);



                        }
                        i--;
                        _cache.Set("i;" + userid, i);
                    }
                }
                catch
                {

                }


                //  index--;
                _cache.Set("index;" + userid, index);
                _cache.Set("pressBack;" + userid, "true");
                _cache.Set("pressNext;" + userid, "false");

                for (int j = 0; j < s.WordsNavigation.Count; j++)
                {
                    s.WordsNavigation.ToList()[j].Sentence = null;
                }
                s.Chapter = null;

                SentenceRsp rsp = new SentenceRsp();
                rsp.Chapter = s.Chapter;
                rsp.ChapterId = s.ChapterId;
                rsp.Confidence = s.Confidence;
                rsp.End = s.End;
                rsp.Id = s.Id;
                rsp.InsertDate = s.InsertDate;
                rsp.Pasuk = pasuk;
                rsp.Lastpasuk = lastpasuk;
                rsp.Start = s.Start;
                rsp.Words = s.Words;
                rsp.WordsNavigation = s.WordsNavigation;
                rsp.Transcript = s.Transcript;
                try
                {
                    if (sentences[index].Confidence == 0)
                        rsp.nextChapter = true;
                    else
                        rsp.nextChapter = false;
                }
                catch
                {
                }

                return rsp;
            }
            catch
            {
                return null;
            }
        }


        [HttpGet, Route("PrePareAudioStopStories")]
        public IActionResult PrePareAudioStopStories(int parasha, int chapter, int usrId, bool isNew)
        {
            try
            {
                string chapterid = chapter.ToString();
                Chapter c = context.Chapters.Where(x => x.Id == int.Parse(chapterid)).ToList()[0];

                List<Sentence> sentences = (List<Sentence>)_cache.Get("Stories;" + usrId);
                if (sentences == null)
                    sentences = context.Sentences.Where(x => x.ChapterId == int.Parse(chapterid)).OrderBy(x => x.Confidence).ToList();

                Sentence s = new Sentence();
                foreach (Sentence sen in sentences)
                {
                    if (sen.notTitles != true)
                    {
                        s = sen;
                        break;
                    }
                }






                if (isNew)
                {

                    _cache.Set("index;" + usrId, 0);
                    _cache.Set("i;" + usrId, 0);
                }
                int index = 0;
                _cache.TryGetValue("index;" + usrId, out index);

                chapterid = sentences[index].ChapterId.ToString();

                try
                {

                    UserReadStories ur = context.UserReadStories.FirstOrDefault(x => x.userId == usrId && x.parashaId == parasha);
                    ur.parashaId = parasha;
                    ur.bookId = int.Parse(c.BookId.ToString());
                    ur.chapterId = c.Id;
                    ur.i = 0;
                    ur.index = 0;
                    ur.sentenceId = s.Id;
                    ur.sentenceText = s.Transcript.Replace("  ", " ");
                    ur.userId = usrId;
                    ur.stories_index = 0;
                    context.UserReadStories.Update(ur);
                    context.SaveChanges();

                    UserReadLastStories url = context.UserReadLastStories.FirstOrDefault(x => x.userId == usrId && x.bookId == int.Parse(c.BookId.ToString()));
                    url.parashaId = parasha;
                    url.bookId = int.Parse(c.BookId.ToString());
                    url.chapterId = c.Id;
                    url.i = 0;
                    url.index = 0;
                    url.sentenceId = s.Id;
                    url.sentenceText = s.Transcript.Replace("  ", " ");
                    url.userId = usrId;
                    url.stories_index = 0;
                    context.UserReadStories.Update(ur);
                    context.SaveChanges();
                }
                catch { }



                bool exists = System.IO.Directory.Exists("C:\\ReadUp\\users\\" + usrId + "\\");

                if (!exists)
                    System.IO.Directory.CreateDirectory("C:\\ReadUp\\users\\" + usrId + "\\");

                System.IO.File.Copy(c.Mp3Path, "C:\\ReadUp\\users\\" + usrId + "\\aud_" + chapterid + ".mp3", true);
                System.IO.File.Copy("C:\\ReadUp\\users\\ffmpeg.exe", "C:\\ReadUp\\users\\" + usrId + "\\ffmpeg.exe", true);

                try
                {
                    System.IO.File.Copy("c:\\tmp\\ffmpeg.exe", "C:\\ReadUp\\users\\ffmpeg.exe");

                }
                catch { }
            }
            catch { }



            return Ok();
        }


        #endregion
    }

    public class Record
    {
        public string base64data  { get;set;}
        public string userid { get; set; }

        public int sentenceid { get; set; }
    }
}
