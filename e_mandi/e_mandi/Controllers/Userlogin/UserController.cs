using e_mandi.Models.Context;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using e_mandi.Models.Userlogin;
using System.Security.Claims;
using System.Text;
using System.Web.Http;

namespace e_mandi.Controllers.Userlogin
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private Contextdb db = new Contextdb();

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login(User login)
        {
            if(login.Role == "farmer")
            {
                var log = db.Farmers.Where(x => x.f_aadharno.Equals(login.Aadharno) && x.f_password.Equals(login.Password)).FirstOrDefault();
                Console.WriteLine("Check log" + login.Aadharno);
                if (log == null)
                {
                    return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
                }
                else
                {
                    var token = GetToken(log.f_aadharno, login.Role);
                    return Ok(new { token = token,role= login.Role, status = 200, isSuccess = true, message = "User Login successfully", userDetails = log });
                    // return Ok(new { token=token,status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
                }
            }
       else if (login.Role == "customer")
            {
                var log = db.Customers.Where(x => x.c_aadharno.Equals(login.Aadharno) && x.c_password.Equals(login.Password)).FirstOrDefault();

                if (log == null)
                {
                    return Ok(new { status = 401, isSuccess = false, message = "Invalid User" });
                }
                else
                {
                    var token = GetToken(log.c_aadharno, login.Role);
                    return Ok(new { token = token, role = login.Role, status = 200, isSuccess = true, message = "User Login successfully", userDetails = log });
                    // return Ok(new { token=token,status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
                }
            }
            else if(login.Role=="admin")
            {
                var log = db.Admins.Where(x => x.a_aadharno.Equals(login.Aadharno) && x.a_password.Equals(login.Password)).FirstOrDefault();

                if (log == null)
                {
                    return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
                }
                else
                {
                    var token = GetToken(log.a_aadharno, login.Role);
                    return Ok(new { token = token, status = 200, role =login.Role, isSuccess = true, message = "User Login successfully" });
                    // return Ok(new { token=token,status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
                }
            }
            else
            {
                return Ok(new { status = 401, isSuccess = false, message = "Please select User" });
            }
        }

        //token creation
        [Route("gettoken")]
        [HttpGet]
        public static string GetToken(string log, string Role)
        {
            string key = "my_secret_key_12345";
            var issuer = "https://localhost:44328/";
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //var permClaims = new List<Claim>();
            //permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            //permClaims.Add(new Claim("valid", "1"));
            //permClaims.Add(new Claim("userid", "1"));
            //permClaims.Add(new Claim("name", "bilal"));


            var permClaims = new List<Claim>();
            permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            permClaims.Add(new Claim("AadharNo", log));
            permClaims.Add(new Claim("Role", Role));

            var token = new JwtSecurityToken(issuer,
                            issuer,
                            permClaims,
                            expires: DateTime.Now.AddHours(5),
                            signingCredentials: credentials);
            var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt_token;


        }
        [Route("getdata")]
        [Authorize]
        [HttpPost]
        public Object Getdata()
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;
                var details = claims.Where(p => p.Type == "AadharNo" && p.Type == "Role").FirstOrDefault()?.Value;
                return new
                {
                    data = details

                };

            }

            return null;
        }

    }
}
