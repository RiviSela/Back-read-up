using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace VayikraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChaptersController : Controller
    {
        [HttpGet, Route("GetLastChapter")]
        public UserReadLast GetLastChapter(int id, int user)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();
                UserReadLast userReadLast = context.UserReadLast.FirstOrDefault(x => x.userId == user && x.bookId == id);
                if (userReadLast != null)
                {
                    Chapter c = context.Chapters.FirstOrDefault(x => x.Id == userReadLast.chapterId && x.Status != 7);
                    List<Sentence> s = context.Sentences.Where(x => x.ChapterId == c.Id).ToList();
                    try
                    {
                        string presentage = (((float)userReadLast.index / (float)c.Sentences.Count) * 100).ToString();
                        userReadLast.index = int.Parse(presentage.Split('.')[0].ToString());
                        userReadLast.i = 100 - userReadLast.index;
                    }
                    catch { }


                    userReadLast.sentenceText += ";" + c.ChapterName + ";" + c.ChapterNameEng;
                    return userReadLast;
                }
                else
                {
                    userReadLast = new UserReadLast();
                    Chapter c = context.Chapters.FirstOrDefault(x => x.BookId == id && x.Status != 7);
                    List<Sentence> s = context.Sentences.Where(x => x.ChapterId == c.Id && x.notTitles == false).OrderBy(x => x.Confidence).ToList();
                    if (s.Count == 0)
                        s = context.Sentences.Where(x => x.ChapterId == c.Id && x.Transcript.Contains("(")).OrderBy(x => x.Confidence).ToList();
                    userReadLast.bookId = id;
                    userReadLast.chapterId = c.Id;
                    userReadLast.index = 0;
                    userReadLast.i = 100;
                    userReadLast.sentenceId = s.FirstOrDefault().Id;
                    userReadLast.sentenceText = s.FirstOrDefault().Transcript + ";" + c.ChapterName + ";" + c.ChapterNameEng;
                    userReadLast.userId = user;

                    return userReadLast;
                }
            }
            catch { }
            return null;
        }


        [HttpGet, Route("GetBookChapters")]
        public IEnumerable<Chapter> GetBookChapters(int id, int user)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();
                //  context.Sentences.Where(x=>x.Confidence<4).ToList();
                //   context.Sentences.ToList();
                List<Chapter> chapters = context.Chapters.Where(x => x.Status==5 && x.BookId == id).OrderBy(x => x.LibraryId).ToList();
                List<int?> chps = new List<int?>();
                foreach (var c in chapters)
                {
                    chps.Add(c.Id);
                }

                context.Sentences.Where(x => chps.Contains(x.ChapterId)).ToList();

                User user1 = context.Users.FirstOrDefault(x => x.Id == user);
                User org = context.Users.FirstOrDefault(u => u.OrganizationId == user1.OrganizationId && u.guid != null && (u.Role.ToLower() == "admin" || u.Role.ToLower() == "organization manager"));
                if (user1.OrganizationId == 1 && (user1.Role.ToLower() == "student" || user1.Role.ToLower() == "trainer"))
                    org = null;

                List<UserRead> userRead = context.UserRead.Where(x => x.userId == user && x.bookId == id).ToList();
                for (int i = 0; i < chapters.Count; i++)
                {
                    try
                    {
                        UserRead ur = userRead.FirstOrDefault(x => x.chapterId == chapters[i].Id);
                        if ((user1.SubscribeLastDate != null && user1.SubscribeLastDate > DateTime.Now) ||
                            (org != null && org.SubscribeLastDate != null && org.SubscribeLastDate > DateTime.Now && org.Id != 1) || chapters[i].Id == 362)
                        {

                            if (ur == null)
                            {
                                for (int w = 0; w < chapters[i].Sentences.Count; w++)
                                {
                                    if (chapters[i].Sentences.OrderBy(x => x.Confidence).ToList()[w].notTitles != true)
                                    {
                                        chapters[i].LibraryId = chapters[i].Sentences.OrderBy(x => x.Confidence).ToList()[w].Transcript;
                                        break;
                                    }
                                }
                                chapters[i].SttLines = "start";
                            }
                            else
                            {
                                chapters[i].LibraryId = ur.sentenceText;
                                if (ur.sentenceId == chapters[i].Sentences.OrderBy(x => x.Confidence).ToList()[chapters[i].Sentences.Count - 1].Id)
                                    chapters[i].SttLines = "fin";
                                else
                                {
                                    chapters[i].SttLines = (((float)ur.index / (float)chapters[i].Sentences.Count) * 100).ToString();
                                    chapters[i].SttLines = chapters[i].SttLines.Split('.')[0] + "%";
                                    chapters[i].Mp3Path = (100 - float.Parse(chapters[i].SttLines.Split('%')[0])).ToString() + "%";
                                }

                            }
                            if (chapters[i].Title != null && chapters[i].Title != "" && chapters[i].Title != "null")
                                chapters[i].LibraryId = chapters[i].Title;
                            chapters[i].Sentences = null;
                        }
                        else
                        {
                            for (int w = 0; w < chapters[i].Sentences.Count; w++)
                            {
                                if (chapters[i].Sentences.OrderBy(x => x.Confidence).ToList()[w].notTitles != true)
                                {
                                    chapters[i].LibraryId = chapters[i].Sentences.OrderBy(x => x.Confidence).ToList()[w].Transcript;
                                    break;
                                }
                            }

                            chapters[i].SttLines = "na";
                            chapters[i].Sentences = null;
                            if (chapters[i].Title != null && chapters[i].Title != "" && chapters[i].Title != "null")
                                chapters[i].LibraryId = chapters[i].Title;
                        }



                    }
                    catch
                    {


                        chapters[i].Sentences = null;
                        chapters[i].LibraryId = "";
                    }
                }
                return chapters;
            }
            catch (Exception EX)
            {
                return new List<Chapter>();
            }
        }

        [HttpGet, Route("GetChapterById")]
        public Chapter GetChapterById(int id)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();
                context.Sentences.Where(x => x.ChapterId == id).ToList();
                Chapter chapter = context.Chapters.FirstOrDefault(x => x.Id == id && x.Status != 7);
                foreach (var s in chapter.Sentences)
                {
                    s.Chapter = null;
                }

                return chapter;
            }
            catch (Exception EX)
            {
                return new Chapter();
            }
        }

        [HttpPost, Route("DeleteCapter")]

        public ActionResult DeleteCapter(int id, int bookid)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();

                List<Chapter> chapters = context.Chapters.Where(x => x.BookId == bookid).ToList();
                Chapter c = chapters.Where(x => x.Id == id).FirstOrDefault();

                c.Status = 7;
                context.Update(c);
                context.SaveChanges();
             
                return Ok(c.Id);
            }
            catch
            {
                return BadRequest();
            }

           }

        }
    }
