using Data.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VayikraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParashotController : ControllerBase
    {
        private readonly IHostingEnvironment _HostEnvironment;
        private IMemoryCache _cache;
        private readonly IConfiguration _configuration;


        public ParashotController(IHostingEnvironment HostEnvironment, IMemoryCache cache, IConfiguration configuration)
        {
            _HostEnvironment = HostEnvironment;
            _cache = cache;
            _configuration = configuration;
        }

        [HttpGet("[action]")]
        public IEnumerable<Parashot> Get()
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            List<Parashot> parashot = context.Parashots.ToList();
            return parashot;
        }

        [HttpGet("[action]")]
        public IEnumerable<ParashotChapters> GetChapters(int id, int user)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            List<ParashaDetails> parashotDetails = context.ParashaDetails.Where(x => x.BookId == id).ToList();
            List<Chapter> chapters = context.Chapters.Where(x => x.BookId == id).ToList();
            List<int> chaptersIds = new List<int>();
            foreach (var c in chapters)
            {
                chaptersIds.Add(c.Id);
            }
            List<Sentence> sentences = context.Sentences.Where(x => chaptersIds.Contains((int)x.ChapterId)).ToList();

            List<ParashotChapters> parashotChapters = new List<ParashotChapters>();
            Parashot parashot = new Parashot();
            List<UserReadParashot> userReadParashot = context.UserReadParashot.Where(x => x.userId == user && x.bookId == id).ToList();

            User user1 = context.Users.FirstOrDefault(x => x.Id == user);
            User org = context.Users.FirstOrDefault(u => u.OrganizationId == user1.OrganizationId && u.guid != null && (u.Role.ToLower() == "admin" || u.Role.ToLower() == "organization manager"));
            if (user1.OrganizationId == 1 && (user1.Role.ToLower() == "student" || user1.Role.ToLower() == "trainer"))
                org = null;

            foreach (ParashaDetails pd in parashotDetails)
            {
                try
                {
                    if ((user1.SubscribeLastDate != null && user1.SubscribeLastDate > DateTime.Now) ||
                            (org != null && org.SubscribeLastDate != null && org.SubscribeLastDate > DateTime.Now && org.Id != 1) || pd.ChapterIdEnd == 362)
                    {

                        bool exist = false;

                        if (parashot.Id != pd.StoryId)
                        {
                            parashot = context.Parashots.FirstOrDefault(x => x.Id == pd.StoryId);
                            string shortStory = parashot.shortStory;
                            string name = parashot.Value;


                            ParashotChapters p = new ParashotChapters();
                            p.BookId = pd.BookId;

                            try
                            {
                                UserReadParashot ur = context.UserReadParashot.FirstOrDefault(x => x.userId == user && x.parashaId == pd.StoryId);
                                p.LastSentence = ur.sentenceText;
                                p.status = "read";
                                p.i = ur.i;
                                p.parashot_index = ur.parashot_index;


                            }
                            catch
                            {
                                p.status = "start";
                                try
                                {
                                    p.LastSentence = sentences.OrderBy(x=>x.Confidence).FirstOrDefault(x => x.ChapterId == pd.ChapterIdStart && (x.notTitles == null || x.notTitles == false)).Transcript;

                                }
                                catch
                                {
                                    p.LastSentence = "";
                                }
                            }

                            var fromto = parashotDetails.Where(x => x.StoryId == pd.StoryId).ToList();
                            p.Name = name;
                            p.fromto = fromto[0].PasukStart.Replace("פרק", "") + " - " + fromto[fromto.Count - 1].PasukEnd.Replace("פרק", "");
                            p.Id = pd.StoryId;
                            p.totali = 0;


                            var tmpPD = parashotDetails.Where(x => x.StoryId == pd.StoryId).ToList();
                            foreach (var tpd in tmpPD)
                            {
                                p.totali += int.Parse(tpd.SentenceIdEnd) - int.Parse(tpd.SentenceIdStart);
                            }
                            p.finish = 100 * p.i / p.totali;
                            double gap = 100 / p.totali;

                            p.i = 100 - p.finish;
                            parashotChapters.Add(p);
                        }
                    }
                    else
                    {
                        if (parashot.Id != pd.StoryId)
                        {
                            ParashotChapters p = new ParashotChapters();
                            p.status = "na";
                            parashot = context.Parashots.FirstOrDefault(x => x.Id == pd.StoryId);
                            p.Name = parashot.Value;
                            p.LastSentence = sentences.OrderBy(x => x.Confidence).FirstOrDefault(x => x.ChapterId == pd.ChapterIdStart && (x.notTitles == null || x.notTitles == false)).Transcript;
                            parashotChapters.Add(p);
                        }
                    }
                }
                catch
                {

                }
               
            }
            parashotChapters = parashotChapters.OrderBy(x => x.Id).ToList();
            return parashotChapters;
        }

        [HttpGet("[action]")]
        public PlayerParasha GetParashaById(int id,int userid)
        {
            try
            {
                PlayerParasha pp = new PlayerParasha();
                List<Sentence> sentences = new List<Sentence>();
 
                ReadUpBooksContext context = new ReadUpBooksContext();

                List<ParashaDetails> parashotDetails = context.ParashaDetails.Where(x => x.StoryId == id).ToList();
                pp.Name = context.Parashots.FirstOrDefault(x => x.Id == id).Value;
                pp.chapters = new List<int>();
                foreach (ParashaDetails pd in parashotDetails)
                {
                    try
                    {
                        int startConfidence = (int)context.Sentences.FirstOrDefault(x => x.Id == int.Parse(pd.SentenceIdStart)).Confidence;
                        int endConfidence = (int)context.Sentences.FirstOrDefault(x => x.Id == int.Parse(pd.SentenceIdEnd)).Confidence;
                        int chapter = (int)context.Sentences.FirstOrDefault(x => x.Id == int.Parse(pd.SentenceIdStart)).ChapterId;
                    
                    List<Sentence> s = context.Sentences.Where(x => x.ChapterId== chapter &&  x.Confidence >= startConfidence && x.Confidence <= endConfidence).OrderBy(x => x.Confidence).ToList();
                        sentences.AddRange(s);
                        pp.chapters.Add(pd.ChapterIdStart);
                    }
                    catch { }
                    
                    
                }
                pp.sentences = sentences;
                _cache.Set("Parashot;" + userid, sentences);

      

                return pp;
            }
            catch (Exception EX)
            {
                return new PlayerParasha();
            }
        }

        [HttpGet, Route("GetLastChapter")]
        public UserReadLastParashot GetLastChapter(int id, int user)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();
                UserReadLastParashot userReadLast = context.UserReadLastParashot.FirstOrDefault(x => x.userId == user && x.bookId==id );
                Parashot parashot = context.Parashots.FirstOrDefault(x => x.Id == userReadLast.parashaId);
                if (userReadLast != null)
                {
                    List<ParashaDetails> pd = context.ParashaDetails.Where(x => x.StoryId == userReadLast.parashaId).ToList();
                    int total = 0;
                    foreach (var p in pd)
                    {
                        List<Sentence> s = context.Sentences.Where(x => x.ChapterId == p.Id).ToList();
                        total += int.Parse(p.SentenceIdEnd) - int.Parse(p.SentenceIdStart);
                    }
                    try
                    {
                        
                        
                       
                    }
                    catch { }
                    userReadLast.index = (userReadLast.i * 100/ total);
                    userReadLast.i = 100 - userReadLast.index;
                    userReadLast.sentenceText += ";" + parashot.Value + ";" + parashot.Value;
                    return userReadLast;
                }
                else
                {
                   
                }
            }
            catch (Exception ex)
            { 
            
            }
            return null;
        }


    }



    public class ParashotChapters
    {
        public int Id { get; set; }
        public int BookId { get; set; }

        public string Name { get; set; }
        public string fromto { get; set; }
        public string LastSentence { get; set; }

        public int i { get; set; }

        public int totali { get; set; }
        public int finish { get; set; }
        public string status { get; set; }

        public int parashot_index { get; set; }
    }


    public class PlayerParasha
    {
        public List<Sentence> sentences { get; set; }

        public string Name { get; set; }

        public List<int> chapters { get; set; }

    }
}
