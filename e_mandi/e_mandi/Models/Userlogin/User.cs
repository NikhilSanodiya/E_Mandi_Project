using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_mandi.Models.Userlogin
{
    public class User
    {
        public string Aadharno { get; set; }
        public string Role { get; set; }
       // public bool Status { get; set; }
        public string Password { get; set; }
    }
}