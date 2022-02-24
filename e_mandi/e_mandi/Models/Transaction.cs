using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    [Table("transaction")]
    public class Transaction
    {
        [Key]
        public int t_id { get; set; } 
        public System.DateTime t_dateandtime { get; set; }
        [Required]
        public string t_payment_mode { get; set; }
        [Required]
        public decimal t_total_amount { get; set; }
        [DefaultValue(0)]
        public bool t_status { get; set; }

        [Required]
        public int c_id { get; set; }
        public virtual Customer Customer { get; set; }
    }
}