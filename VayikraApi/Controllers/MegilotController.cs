using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VayikraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MegilotController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            List<Book> books = context.Books.Where(x => x.IsVayikra == true && x.Gener == 33).ToList();
            return books;
        }
    }
}
