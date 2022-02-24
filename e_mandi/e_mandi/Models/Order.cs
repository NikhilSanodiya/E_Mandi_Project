using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    [Table("order")]
    public class Order
    {
        [Key]
        public int order_id { get; set; }
        public int cart_v_quantity { get; set; }
       
        public int v_id { get; set; }
        public virtual Vegetable Vegetable { get; set; }

        public int c_id { get; set; }
        public virtual Customer Customer { get; set; }

        public string payment_mode { get; set; }
        public string order_status { get; set; }


       

    }
}





