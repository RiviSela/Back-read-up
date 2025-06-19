
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace VayikraApi.Controllers
{
    public class LibraryController : Controller
    {
        private readonly IConfiguration _configuration;

        //public LibraryController(IConfiguration configuration)
        //{

        //    _configuration = configuration;
        //}

        //public LibraryController()
        //{
        [HttpGet, Route("getAllLibrarys")]
        public IEnumerable<Library> getAllLibrarys(int Id)
        {
            using (ReadUpBooksContext context = new ReadUpBooksContext())
            {
                List<Library> libraries = new List<Library>();
                User user = context.Users.FirstOrDefault(x => x.Id == Id);

                if (user != null)
                {
                    if (user.OrganizationId != null)
                    {
                        libraries = context.Library.Where(x =>
                            // Private library
                            (x.userId == Id && x.visibility == 1 && x.status != 5) ||
                            // Organization library
                            (x.OrganizationID == user.OrganizationId && x.visibility == 2 && x.status != 5) ||
                            // Global library
                            (x.Id == 1 && x.status != 5)
                        ).ToList();
                    }
                    else
                    {
                        libraries = context.Library.Where(x =>
                            // Private library
                            (x.userId == Id && x.visibility == 1 && x.status != 5) ||
                            // Global library
                            (x.Id == 1 && x.status != 5)
                        ).ToList();
                    }
                }

                return libraries;
            }
        }

        [HttpPost, Route("UpdateLibrary")]
        public async Task<IActionResult> UpdateLibrary([FromForm] Library l)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();
                Library library = context.Library.FirstOrDefault(x => x.Id == l.Id);
                if (library != null)
                {
                    library.libraryName = l.libraryName;
                    library.visibility = l.visibility;
                  
                    context.Library.Update(library);  
                    context.SaveChanges();
                    return Ok(library);
                }
                return NotFound("Library not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost,Route("DeleteLibrary")]
        public async Task<IActionResult> DeleteLibrary(int id)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();
                Library library = context.Library.FirstOrDefault(x => x.Id == id);
                if (library != null)
                {
                    library.status = 5;
                    context.Library.Update(library);
                    context.SaveChanges();
                   

                }
                return Ok(library);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet, Route("getMyLibrary")]
        public IEnumerable<Library> getMyLibrary(int userId)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            List<Library> libraries = context.Library.Where(x => x.visibility == 1 && x.userId == userId && x.status != 0).ToList();
            // gr - global libary add the id 
            return libraries;
        }


        [HttpPost, Route("AddLibrary")]
        public async Task<ActionResult> AddLibrary(Library librarynew)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            User user = context.Users.FirstOrDefault(x => x.Id == librarynew.userId);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            Library library = new Library();

            try
            {
                if (user.OrganizationId != null)
                {
                    // Check if the user is an organization manager or admin
                    User org = context.Users.FirstOrDefault(u =>
                        u.Id == user.Id &&
                        u.OrganizationId == user.OrganizationId &&
                        //u.guid != null || u.guidTeacher != null &&
                        (u.Role.ToLower() == "admin" || u.Role.ToLower() == "organization manager" || u.Role == "learning central manager")
                    );

                    if (org != null)
                    {
                        // User is an organization manager or admin
                        library.libraryName = librarynew.libraryName;
                        library.visibility = librarynew.visibility;                      
                        library.userId = org.Id;
                        library.number = 0;
                        library.status = 1;
                        library.OrganizationID = (int)org.OrganizationId;
                    }
                    else
                    {
                        // User is not an organization manager or admin
                        if (!context.Library.Any(x => x.userId == user.Id && x.visibility == 1))
                        {
                            library.visibility = 1;
                            
                             library.userId = user.Id;
                            library.libraryName = "UserLibrary";
                            library.number = 0;
                            library.status = 1;
                            library.OrganizationID = (int)user.OrganizationId;
                          
                        }
                    }
                }
                else
                {
                    // User does not belong to any organization
                    if (!context.Library.Any(x => x.userId == user.Id && x.visibility == 1))
                    {
                        library.visibility = 1;
                        library.userId = user.Id;
                        library.libraryName = "UserLibrary";
                        library.number = 0;
                        library.status = 1;
                        library.OrganizationID = 0;
                    }
                }

                context.Library.Add(library);
                await context.SaveChangesAsync();

                return Ok(library);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "you alredy have a libary ", details = ex.StackTrace });
            }
        }





    }

}
