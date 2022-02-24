using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models.Admins
{
    [Table("admin")]
    public class Admin
    {
        [Key]
        public int a_id { get; set; }
        [Required]
        public string a_name { get; set; }
        [Required,MaxLength(12),MinLength(12)]
        [Index(IsUnique = true)]
        public string a_aadharno { get; set; }
        [Required,MaxLength(10),MinLength(10)]
        public string a_mobileno { get; set; }

        public string a_address { get; set; }
        [Required,MinLength(8),MaxLength(12)]
        public string a_password { get; set; }

        [DataType(DataType.Date)]
        public DateTime a_regdateandtime { get; set; }
    }
}