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
    public class UserSettingsController : ControllerBase
    {
        ReadUpBooksContext context = new ReadUpBooksContext();

        [HttpGet, Route("GetUserSettings")]
        public UserSettings GetUserSettings(int userId)
        {
            try
            {
                return context.UserSettings.FirstOrDefault(x => x.userId == userId.ToString());
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost, Route("UpdateUserSettings")]
        public UserSettings UpdateUserSettings(UserSettings us)
        {
            try
            {
                UserSettings tmpUs = context.UserSettings.FirstOrDefault(x => x.userId == us.userId);
                if (tmpUs!=null)
                {
                    tmpUs.echo = us.echo;
                    tmpUs.marker = us.marker;
                    tmpUs.read = us.read;
                    context.UserSettings.Update(tmpUs);
                }
                else
                {
                    context.UserSettings.Add(us);
                }
                
                context.SaveChanges();
            }
            catch (Exception ex)
            {

            }

            return us;
        }


        [HttpGet, Route("GetReadupEn")]
        public List<ReadupEn> GetReadupEn()
        {
            try
            {
                return context.ReadupEn.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet, Route("GetReadupHe")]
        public List<ReadupHe> GetReadupHe()
        {
            try
            {
                return context.ReadupHe.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }


    }
}
