using e_mandi.Models.Admins;
using e_mandi.Models.Context;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;



namespace e_mandi.Controllers.Admins
{
    [RoutePrefix("api/admin")]
    public class LoginController : ApiController
    {
        private Contextdb db = new Contextdb();

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login(Login login)
        {
            var log = db.Admins.Where(x => x.a_aadharno.Equals(login.Aadharno) && x.a_password.Equals(login.Password)).FirstOrDefault();

            if (log == null)
            {
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
            }
            else
            {
                var token = GetToken(log.a_aadharno);
                return Ok(new { token = token, status = 200,role="admin", isSuccess = true, message = "User Login successfully" });
                // return Ok(new { token=token,status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
            }
        }

        //token creation
        [Route("gettoken")]
        [HttpGet]
        public static string GetToken(string log)
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



            var token = new JwtSecurityToken(issuer,
                            issuer,
                            permClaims,
                            expires: DateTime.Now.AddMinutes(1),
                            signingCredentials: credentials);
            var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
            return  jwt_token;


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
                var aadhar = claims.Where(p => p.Type == "AadharNo").FirstOrDefault()?.Value;
                return new
                {
                    data = aadhar
                };

            }

            return null;
        }
    }
}
