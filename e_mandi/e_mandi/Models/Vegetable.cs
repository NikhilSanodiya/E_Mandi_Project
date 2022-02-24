using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    [Table("vegetable")]
    public class Vegetable
    {
        [Key]
        public int v_id { get; set; }
        [Required]
        public string v_name { get; set; }
        [Required]
        public int v_quantity { get; set; }
        [Required]
        public decimal v_price { get; set; }
        public System.DateTime v_dateandtime { get; set; }
        public string v_image { get; set; }
        [DefaultValue(1)]
        public bool v_status { get; set; }
        public string v_unit { get; set; }

        [Required]
        public int f_id { get; set; }
 
        public virtual Farmer Farmer { get; set; }

        public ICollection<Order> Order { get; set; }
    }
}