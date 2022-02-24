using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    [Table("cart")]
    public class Cart
    {
        [Key]
        public int cart_id { get; set; }
        [Required]
        public int cart_v_quantity { get; set; }

        [Required]
        public int v_id { get; set; }
        public virtual Vegetable Vegetable { get; set; }

        [Required]
        public int c_id { get; set; }
        public virtual Customer Customer { get; set; }
        
    }
}