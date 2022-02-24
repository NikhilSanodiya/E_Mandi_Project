using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    [Table("customer")]
    public class Customer
    {
        [Key]
        public int c_id { get; set; }
        [Required]
        public string c_name { get; set; }
        [Required, MaxLength(12), MinLength(12)]
        [Index(IsUnique = true)]
        public string c_aadharno { get; set; }
        [Required, MaxLength(10), MinLength(10)]
        public string c_mobileno { get; set; }
        public string c_address { get; set; }
        [Required, MinLength(8), MaxLength(12)]
        public string c_password { get; set; }
        public System.DateTime c_regdateandtime { get; set; }
        [DefaultValue(0)]
        public Nullable<bool> c_status { get; set; }
        public string c_city { get; set; }
        public string c_pincode { get; set; }
    }
}