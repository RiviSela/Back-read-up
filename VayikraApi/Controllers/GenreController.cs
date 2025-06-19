using Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VayikraApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        ReadUpBooksContext context = new ReadUpBooksContext();

        [HttpGet, Route("GetGenres")]
        public List<Genre> GetGenres(int userId)
        {
            try
            {
                return context.Genres.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
