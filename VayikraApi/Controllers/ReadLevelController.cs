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
    public class ReadLevelController : ControllerBase
    {
        ReadUpBooksContext context = new ReadUpBooksContext();

        [HttpGet, Route("GetReadingLevels")]
        public List<ReadingLevel> GetReadingLevels(int userId)
        {
            try
            {
                return context.ReadingLevels.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
