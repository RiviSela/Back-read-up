using Data.Models;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace VayikraApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : Controller
    {


        [HttpPost, Route("UpdatePass")]
        public IActionResult UpdatePass(Login user)
        {
            try
            {
                ReadUpBooksContext context = new ReadUpBooksContext();
                User users = context.Users.FirstOrDefault(u => u.guid == user.Email);
                users.Password = user.Password;
                context.Users.Update(users);
                context.SaveChanges();
                return Ok(new { res = "ok" });
            }
            catch
            {
                return BadRequest();
            }

        }

        
        [HttpGet, Route("GetIcon")]
        public IActionResult GetIcon(string guid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            User users = context.Users.FirstOrDefault(u => u.guid == guid || u.guidTeacher == guid);
            Organization org = context.Organizations.FirstOrDefault(u => u.Id == users.OrganizationId);

            return Ok(new { line = "https://vayikra-bible.com/"+org.logo });
        }

        [HttpPost, Route("forgot")]
        public IActionResult Forgot(Login user)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            User users = context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (user == null)
                return BadRequest("email not exist");
            else
            {
                Guid guid = Guid.NewGuid();
                users.guid = guid.ToString();
                context.Users.Update(users);
                context.SaveChanges();


                var fromAddress = new MailAddress("vayikra.info@gmail.com", "Readup!");
                var toAddress = new MailAddress(users.Email, users.FirstName);
                string fromPassword = "ltocbfjgcutkgdxz";
                string subject = "Forgot password";
                string body = "https://readupp.com/forgot?guid=" + users.guid;

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }



                return Ok(new { res = "ok" });
            }
        }


        [HttpGet, Route("getUsersOrg")]
        public List<Register> getUsersOrg(int orgID)
        {
            List<Register> UsersOrg = new List<Register>();
            ReadUpBooksContext context = new ReadUpBooksContext();
            List<User> UsersO = context.Users.Where(x => x.OrganizationId == orgID).ToList();
            foreach (var item in UsersO)
            {
                var user = GetUser(item.Id);
                user.userId = item.Id;
                UsersOrg.Add(user);
            }

            return UsersOrg;
        }

        [HttpPost, Route("login")]
        public IActionResult Login(Login user)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            if (user == null)
                return BadRequest("Invalid client request");

            User users = context.Users.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password &&  (u.system == 0 || u.system == 1));
           
            User org = null;
            if (users!=null && users.Role.ToLower() != "student" && users.Role.ToLower() != "trainer")
            {
                org = context.Users.FirstOrDefault(u => u.OrganizationId == users.OrganizationId && u.guid != null && (u.Role.ToLower() == "admin" || u.Role.ToLower() == "organization manager"));
            }


            if (users != null)
            {
                //if(users[0].Role== "User")
                //    return Unauthorized();

                if (users.freeze == true)
            {
                return BadRequest("User is currently frozen");
            }

                string role = users.Role;

                bool exp = false;
                if (org != null && org.SubscribeLastDate != null && org.SubscribeLastDate > DateTime.Now)
                    exp = true;

                if (users.SubscribeLastDate != null && users.SubscribeLastDate > DateTime.Now)
                    exp = true;
                else if (users.SubscribeLastDate != null && users.SubscribeLastDate < DateTime.Now)
                    exp = false;


                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, "login")
                };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ReadupReadupReadup"));
                var cred = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOption = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddHours(10),
                    signingCredentials: cred

                    );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOption);
                users.loginKey = tokenString;
                context.Update(users);
                context.SaveChanges();

               // users.loginKey = tokenString;
               //  context.Update(users);
               // context.SaveChanges();

                return Ok(new { Token = tokenString, role = users.Role, email = users.Email, orgid = users.OrganizationId, lcId = users.LearningCenterId, usrId = users.Id, exp = exp,ok=true });
            }

            return Unauthorized();
        }

        [HttpPost, Route("RegisterOrg")]
        public IActionResult RegisterOrg(Register regUser)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            if (regUser == null)
                return BadRequest("Invalid client request");

            List<User> users = context.Users.Where(u => u.Email == regUser.Email).ToList();
            if (users.Count > 0)
                return BadRequest("Email allready exist");


            Organization org = new Organization();
            org.Name = regUser.OrgName;
            org.system = 1;
            org.EmailAddress = regUser.Email;
            org.CountryCode = "";
            org.Address = "";
            org.City = "";
            org.currency = 1;

            context.Organizations.Add(org);
            context.SaveChanges();


            context = new ReadUpBooksContext();
            User user = new User();
            user.ParentName = "";
            user.Interesets = "";
            user.SchoolType = "";
            user.AgeGroup = "";
            user.PaymentType = "";
            user.Disabilities = "";
            user.FirstName = regUser.FirstName;
            user.LastName = regUser.LastName;
            user.Password = regUser.Password;
            user.TreatmetTypes = regUser.Job;
            user.Email = regUser.Email;
            user.Role = "Organization Manager";
            Guid guid = new Guid();
            guid =  Guid.NewGuid();
            user.guid = guid.ToString();
            // link for teachers  
            Guid guidT = new Guid();
            guidT = Guid.NewGuid();
            user.guidTeacher = guidT.ToString();
            user.OrganizationId = org.Id;
            user.system = 1;

            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, "login")
                };
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ReadupReadupReadup"));
            var cred = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOption = new JwtSecurityToken(
                   claims: claims,
                   expires: DateTime.Now.AddHours(10),
                   signingCredentials: cred

                   );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOption);
            user.loginKey = tokenString;

            context.Add(user);
            context.SaveChanges();

            Library library = new Library();
            library.userId = user.Id;
            library.libraryName = regUser.OrgName + "Library";
            library.OrganizationID = (int)user.OrganizationId;
            LibraryController lc = new LibraryController();
            lc.AddLibrary(library);

            return Ok(new
            {
                ok=true,
                userId = user.Id,
                orgId = org.Id,
                email = user.Email,
                token = user.loginKey,
                role = user.Role

            });
        }




        [HttpPost, Route("RegisterUser")]
        public IActionResult RegisterUser(Register regUser)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            string role = " ";
            List<User> users = context.Users.Where(u => u.Email == regUser.Email).ToList();
            if (users.Count > 0)
                return Ok(new
                {
                    isSucceed = false,
                    message = "Email allready exist"
                });

            if (regUser.guid != null)
            {
                User usr = context.Users.FirstOrDefault(u => u.guid == regUser.guid.ToString() || u.guidTeacher == regUser.guid.ToString());
                   if(usr.guid == regUser.guid.ToString())
                {
                    role = "Student";

                }
                else if(usr.guidTeacher == regUser.guid.ToString())
                {
                    role = "learning central manager";
                }


                    if (usr.linkCounter <= 0)
                    return Ok(new
                    {
                        isSucceed = false,
                        message = "No more users can be register under this account"
                    });
                else
                {
                    usr.linkCounter--;
                    context.Update(usr);
                    context.SaveChanges();
                   
                }
                   if (regUser.orgId ==0)
                     regUser.orgId = (int)usr.OrganizationId;
            }

            context = new ReadUpBooksContext();
            User user = new User();
            user.ParentName = "";
            user.Interesets = "";
            user.SchoolType = "";
            user.AgeGroup = "";
            user.PaymentType = "";
            user.Disabilities = "";
            user.FirstName = regUser.FirstName;
            user.LastName = regUser.LastName;
            user.Password = regUser.Password;
            user.TreatmetTypes = regUser.Job;
            user.NativeLang = regUser.NativeLang;
            user.BirthDate = regUser.BirthDate;
            user.Email = regUser.Email;
            user.system = 1;
            if (regUser.orgId == 0)
            {
                user.OrganizationId = 1;
            }
            else
            {
               user.OrganizationId = regUser.orgId;
            }
               
            if (role == " ")
                user.Role = "Student";
            else
                user.Role = role;

            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, "login")
                };
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ReadupReadupReadup"));
            var cred = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOption = new JwtSecurityToken(
                   claims: claims,
                   expires: DateTime.Now.AddHours(10),
                   signingCredentials: cred

                   );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOption);
            user.loginKey = tokenString;


            context.Add(user);
            context.SaveChanges();

            //create a libary for the user auto
            Library library = new Library();
            library.userId = user.Id;
            library.OrganizationID = (int)user.OrganizationId;
            LibraryController lc = new LibraryController();
            lc.AddLibrary(library); 



            return Ok(new
            {
                ok = true,
                isSucceed = true,
                userId = user.Id,
                email = user.Email,
                token = user.loginKey,
                role = user.Role
            });
        }
        [HttpGet, Route("GetUserGuid")]
        public string GetUserGuid(int userid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            User user = context.Users.FirstOrDefault(x => x.Id == userid);
            return user.guid;
        }

        [HttpPost, Route("CheckToken")]
        public IActionResult CheckToken(CheckToken user)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            User users = context.Users.FirstOrDefault(u => u.Id.ToString() == user.user && u.loginKey == user.token);
            if (users != null)
                return Ok(new { res = "ok" });
            else
                return Ok(new { res = "err" });



        }

        [HttpGet, Route("GetUser")]
        public Register GetUser(int userid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            Register res = new Register();
            try
            {
                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                res.FirstName = user.FirstName;
                res.LastName = user.LastName;
                res.Email = user.Email;
                res.Phone = user.Telephone;
                res.Country = user.Country;
                res.Address = user.Address;
                res.Gender = user.Gender;
                res.City = user.City;
                res.Role = user.Role;
                res.freeze = user.freeze;
                res.orgId = (int)user.OrganizationId;
                try
                {
                    res.NativeLang = (int)user.NativeLang;
                }
                catch { }
                res.Zipcode = user.ZipCode;
                res.Password = user.Password;
                res.BirthDate = user.BirthDate;
                try
                {
                    res.currency = (int)user.currency;
                }
                catch { res.currency = 1; }
                if (user.SubscribeLastDate != null)
                    res.SubscribeLastDate = user.SubscribeLastDate;
                try
                {
                    res.SubscribeLastDateString = ((DateTime)res.SubscribeLastDate).ToLongDateString().Split(',')[1] + ", " + ((DateTime)res.SubscribeLastDate).ToLongDateString().Split(',')[2];
                }
                catch { }
                if(user.Role.ToLower() != "student" && user.guidTeacher != null)
                {
                    try
                {
                   res.guid = context.Users.FirstOrDefault(x => x.OrganizationId == user.OrganizationId && user.OrganizationId != 1 && x.guid != null).guid;
                   res.guidTeacher = context.Users.FirstOrDefault(x => x.OrganizationId == user.OrganizationId && user.OrganizationId != 1 && x.guidTeacher != null).guidTeacher;
                }
                catch
                {
                    res.guid = null;
                }
                }
              

                string answer = "00:00:00";
                try
                {
                    if (user.readTimer == null)
                        user.readTimer = 0;
                    TimeSpan t = TimeSpan.FromSeconds((double)user.readTimer);

                    answer = string.Format("{0:D2}:{1:D2}:{2:D2}",
                                    t.Hours,
                                    t.Minutes,
                                    t.Seconds,
                                    t.Milliseconds);
                }
                catch { }


                res.readTimer = answer;
                res.chaptersCounter = context.UserRead.Where(x => x.userId == userid).ToList().Count();
            }
            catch
            {

            }
            return res;
        }
        [HttpGet, Route("GetLogo")]
        public string GetLogo(string guid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            User usr = context.Users.FirstOrDefault(x => x.guid == guid.ToString());
            Organization org = context.Organizations.FirstOrDefault(x => x.Id == usr.OrganizationId);
            return org.logo;
        }




        [HttpGet, Route("GetOrg")]
        public Register GetOrg(int orgid, int  userid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            Register res = new Register();
            try
            {
                User user = context.Users.FirstOrDefault(x => x.Id == userid);
                if (orgid == -1)
                    orgid = (int)user.OrganizationId;
                Organization org = context.Organizations.FirstOrDefault(x => x.Id == orgid);
                res.orgId = (int)user.OrganizationId;
                res.FirstName = user.FirstName;
                res.LastName = user.LastName;
                res.Email = user.Email;
                res.Phone = user.Telephone;
                res.Country = user.Country;
                res.Address = user.Address;
                res.Gender = user.Gender;
                res.City = user.City;
                res.Zipcode = user.ZipCode;
                res.Password = user.Password;
                res.Job = user.TreatmetTypes;
                res.OrgName = org.Name;
                res.logo = org.logo;
                res.usersCounter = user.linkCounter;
                res.guid = user.guid;
                res.guidTeacher =user.guidTeacher;
                try
                {
                    if(org.Id!=1)
                        res.currency = (int)org.currency;
                    else
                        res.currency = (int)user.currency;
                }
                catch { res.currency = 1; }

                if (user.SubscribeLastDate != null)
                    res.SubscribeLastDate = user.SubscribeLastDate;
                try
                {
                    res.SubscribeLastDateString = ((DateTime)res.SubscribeLastDate).ToLongDateString().Split(',')[1] + ", " + ((DateTime)res.SubscribeLastDate).ToLongDateString().Split(',')[2];
                }
                catch { }

                List<User> users = context.Users.Where(x => x.OrganizationId == user.OrganizationId).ToList();
                int readTimer = 0;
                foreach (var u in users)
                    if (u.readTimer != null)
                        readTimer += (int)u.readTimer;

                string answer = "00:00:00";
                try
                {
                    if (user.readTimer == null)
                        user.readTimer = 0;
                    TimeSpan t = TimeSpan.FromSeconds((double)readTimer);

                    answer = string.Format("{0:D2}:{1:D2}:{2:D2}",
                                    t.Hours,
                                    t.Minutes,
                                    t.Seconds,
                                    t.Milliseconds);
                }
                catch { }


                res.readTimer = answer;

                int chaptersCounter = 0;
                List<UserRead> userReadLast = context.UserRead.ToList();
                foreach (var u in users)
                {
                    chaptersCounter += userReadLast.Where(x => x.userId == u.Id).ToList().Count;
                }
                res.chaptersCounter = chaptersCounter;

            }
            catch
            {

            }
            return res;
        }

     


        [HttpPost, Route("PurchasesSucceed")]
        public IActionResult PurchasesSucceed(Purchase param)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();
            User user = context.Users.FirstOrDefault(u => u.Id == param.userid);
            if (user.SubscribeLastDate != null && user.SubscribeLastDate > DateTime.Now)
            {
                DateTime SubscribeLastDate = (DateTime)user.SubscribeLastDate;
                user.SubscribeLastDate = SubscribeLastDate.AddMonths(param.months);
            }
            else
                user.SubscribeLastDate = DateTime.Now.AddMonths(param.months);
            context.Update(user);
            context.SaveChanges();

            return Ok(user);
        }


        [HttpPost, Route("Purchases")]
        public IActionResult Purchases(Purchase param)
        {
            string res = TranzilaPurchase(param);
            if (res.Contains("Error Message"))
                return BadRequest();
            ReadUpBooksContext context = new ReadUpBooksContext();
            User user = context.Users.FirstOrDefault(u => u.Id == param.userid);
            if (user.SubscribeLastDate != null && user.SubscribeLastDate > DateTime.Now)
            {
                DateTime SubscribeLastDate = (DateTime)user.SubscribeLastDate;
                user.SubscribeLastDate = SubscribeLastDate.AddMonths(param.months);
            }
            else
                user.SubscribeLastDate = DateTime.Now.AddMonths(param.months);
            context.Update(user);
            context.SaveChanges();

            return Ok(user);
        }


        private string TranzilaPurchase(Purchase param)
        {
            string responseInString = "";
            using (var wb = new WebClient())
            {
                var data = new NameValueCollection();
                data["supplier"] = "vayikra22";
                data["sum"] = param.price.ToString();
                data["tranmode"] = "A";
                data["ccno"] = param.ccno;
                data["currency"] = "1";
                data["expdate"] = param.expdate;
                data["cred_type"] = "1";
                data["mycvv"] = param.mycvv;
                data["TranzilaPW"] = "x!3Dems";




                var response = wb.UploadValues("https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi", "POST", data);
                responseInString = Encoding.UTF8.GetString(response);
            }
            return responseInString;

        }


        [HttpPost, Route("UpdateRegisterUser")]
        public IActionResult UpdateRegisterUser(Register regUser)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            User user = context.Users.FirstOrDefault(x => x.Id == regUser.userId);

            user.FirstName = regUser.FirstName;
            user.LastName = regUser.LastName;
            user.Password = regUser.Password;
            user.TreatmetTypes = regUser.Job;
            user.Email = regUser.Email;
           
            user.Telephone = regUser.Phone;
            user.Gender = regUser.Gender;
            user.Country = regUser.Country;
            user.City = regUser.City;
            user.ZipCode = regUser.Zipcode;
            user.BirthDate = regUser.BirthDate;
            user.Password = regUser.Password;
            user.Address = regUser.Address;

            context.Users.Update(user);

            if (regUser.logo!=null && regUser.logo != "")
            {
                try
                {
                    int orgid = (int)context.Users.FirstOrDefault(x => x.Id == regUser.userId).OrganizationId;
                    Organization org = context.Organizations.FirstOrDefault(x => x.Id == orgid);
                    var exeDir = "C:\\inetpub\\wwwroot\\Vayikra1";
                    var imgDir = Path.Combine(exeDir, "logos");
                    regUser.logo = regUser.logo.Split(',')[1];
                    if (System.IO.File.Exists(imgDir + "\\" + org.Name + ".png"))
                    {
                        System.IO.File.Delete(imgDir + "\\" + org.Name + ".png");
                    }



                    System.IO.File.WriteAllBytes(imgDir + "\\" + org.Name + ".png", Convert.FromBase64String(regUser.logo));

                    org.logo = "logos\\" + org.Name + ".png";
                    context.Organizations.Update(org);
                }
                catch (Exception ex)
                {
                
                }
            }


            context.SaveChanges();





            return Ok(new
            {
                ok=true,
                userId = user.Id,
            });
        }
        [HttpPost, Route("FreezeUsersOrg")]
        public bool FreezeUsersOrg(int orgUserId,int id,bool freeze)
        {

            try
            {
                if (freeze) {
                    ReadUpBooksContext context = new ReadUpBooksContext();

                    User manager = context.Users.FirstOrDefault(x => x.Id == orgUserId);
                    User userFreeze = context.Users.FirstOrDefault(x => x.Id == id);
                    if (manager != null && manager.Role.ToLower() == "admin" || manager.Role.ToLower() == "organization manager" && manager.OrganizationId == userFreeze.OrganizationId)
                    {
                        manager.linkCounter = manager.linkCounter + 1;
                        userFreeze.freeze = true;
                        context.Users.Update(manager);
                        context.Users.Update(userFreeze);
                        context.SaveChanges();
                    }
                }
                else if(!freeze) {
                    ReadUpBooksContext context = new ReadUpBooksContext();

                    User manager = context.Users.FirstOrDefault(x => x.Id == orgUserId);
                    User userFreeze = context.Users.FirstOrDefault(x => x.Id == id);
                    if (manager != null && manager.Role.ToLower() == "admin" || manager.Role.ToLower() == "organization manager" && manager.OrganizationId == userFreeze.OrganizationId)
                    {
                        manager.linkCounter = manager.linkCounter - 1;
                        userFreeze.freeze = false;
                        context.Users.Update(manager);
                        context.Users.Update(userFreeze);
                        context.SaveChanges();
                    }
                }
               
                return true;
            }
           catch {
                return false;
            }    
        }

         


        [HttpGet, Route("GetUserPayment")]
        public List<Pricing_users> GetUserPayment(int userid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            User usr = context.Users.FirstOrDefault(x => x.Id == userid);
            if (usr.pricingGroup == null || usr.pricingGroup=="null" || usr.pricingGroup=="")
                usr.pricingGroup = "1";
            List<Pricing_users> pricing = context.Pricing_users.Where(x => x.GroupId == usr.pricingGroup).ToList();

            Pricing_discount discount = context.Pricing_discount.FirstOrDefault(x => x.Id.ToString() == usr.discount);
            if(discount!=null && discount.Value != "0")
            {
                for (int i = 0; i < pricing.Count; i++)
                {
                    pricing[i].eng_value = pricing[i].eng_value+";"+(float.Parse(pricing[i].eng_value) * (100-int.Parse(discount.Value))/100).ToString("0.00");
                    pricing[i].Value = pricing[i].Value+";"+(float.Parse(pricing[i].Value) * (100 -int.Parse(discount.Value)) / 100).ToString("0.00");
                }
            }
            else
            {
                for (int i = 0; i < pricing.Count; i++)
                {
                    pricing[i].eng_value = pricing[i].eng_value + ";" + pricing[i].eng_value;
                    pricing[i].Value = pricing[i].Value + ";" + pricing[i].Value;
                }
            }

            return pricing;


        }

        [HttpGet, Route("GetOrganizationPayment")]
        public List<Pricing_organization> GetOrganizationPayment(int organizaitonid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            Organization org = context.Organizations.FirstOrDefault(x => x.Id == organizaitonid);
            if (org.pricingGroup == null || org.pricingGroup=="null")
                org.pricingGroup = "1";
            List<Pricing_organization> pricing = context.Pricing_organization.Where(x => x.GroupId == org.pricingGroup).ToList();

            Pricing_discount discount = context.Pricing_discount.FirstOrDefault(x => x.Id.ToString() == org.discount);
            if (discount != null && discount.Value!="0")
            {
                for (int i = 0; i < pricing.Count; i++)
                {
                    pricing[i].eng_value = pricing[i].eng_value+";"+(float.Parse(pricing[i].eng_value) * (100-int.Parse(discount.Value)) / 100).ToString("0.00");
                    pricing[i].Value = pricing[i].Value+";"+(float.Parse(pricing[i].Value) * (100-int.Parse(discount.Value)) / 100).ToString("0.00");
                }
            }
            else
            {
                for (int i = 0; i < pricing.Count; i++)
                {
                    pricing[i].eng_value = pricing[i].eng_value + ";" + pricing[i].eng_value;
                    pricing[i].Value = pricing[i].Value + ";" + pricing[i].Value;
                }
            }

            return pricing;
        }


        [HttpGet, Route("GetOrganizationDiscountPayment")]
        public List<Pricing_discount> GetOrganizationDiscountPayment(int organizaitonid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            Organization org = context.Organizations.FirstOrDefault(x => x.Id == organizaitonid);
            List<Pricing_discount> pricing = context.Pricing_discount.Where(x => x.Key == org.discount).ToList();

            return pricing;
        }

        [HttpGet, Route("GetUserDiscountPayment")]
        public List<Pricing_discount> GetUserDiscountPayment(int userid)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            User usr = context.Users.FirstOrDefault(x => x.Id == userid);
            List<Pricing_discount> pricing = context.Pricing_discount.Where(x => x.Key == usr.discount).ToList();

            return pricing;
        }
    }

    public partial class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
    public partial class Register
    {
        public int userId { get; set; }
        public int orgId { get; set; }
        public string OrgName { get; set; }
        public string Job { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int NativeLang { get; set; }

        public string Gender { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Zipcode { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public DateTime? SubscribeLastDate { get; set; }
        public string SubscribeLastDateString { get; set; }
        public string readTimer { get; set; }
        public bool freeze { get; set; }
        public int? chaptersCounter { get; set; }
        public string Role { get; set; }
        public string logo { get; set; }
        public string guid { get; set; }
        public string guidTeacher { get; set; }
        public int currency { get; set; }

        public int usersCounter { get; set; }

    }

    public partial class Purchase
    {
        public int userid { get; set; }

        public string namecc { get; set; }
        public int months { get; set; }
        public string ccno { get; set; }
        public string expdate { get; set; }

        public string mycvv { get; set; }

        public int price { get; set; }


    }
    public partial class CheckToken
    {
        public string user { get; set; }
        public string token { get; set; }

    }
}