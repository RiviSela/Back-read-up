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
    public class AgeGroupController : ControllerBase
    {
        ReadUpBooksContext context = new ReadUpBooksContext();

        [HttpGet, Route("GetAgeGroup")]
        public List<AgeGroup> GetGenres(int userId)
        {
            try
            {
                return context.AgeGroups.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
