using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    [Table("farmer")]
    public class Farmer
    {
        [Key]
        public int f_id { get; set; }
        [Required]
        public string f_name { get; set; }
        [Required, MaxLength(12), MinLength(12)]
        [Index(IsUnique = true)]
        public string f_aadharno { get; set; }
        [Required]
        
        public string survey_no { get; set; }
        [Required, MaxLength(10), MinLength(10)]
        public string f_mobileno { get; set; }
        public string f_address { get; set; }
        [Required, MinLength(8), MaxLength(12)]
        public string f_password { get; set; }
        public System.DateTime f_regdateandtime { get; set; }
        [Required]
        [DefaultValue(0)]
        public Nullable<bool> f_status { get; set; }
        [Required]
        public string f_city { get; set; }
        [Required]
        public string f_pincode { get; set; }
    }
}