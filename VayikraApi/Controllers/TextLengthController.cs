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
    public class TextLengthController : Controller
    {
        ReadUpBooksContext context = new ReadUpBooksContext();

        [HttpGet, Route("GetTextLength")]
        public List<TextLength> GetTextLength(int userId)
        {
            try
            {
                return context.TextLength.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
