using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    
    [Table("feedback")]
    public class Feedback
    {
        [Key]
        public int feedback_id { get; set; }
        public Nullable<int> c_id { get; set; }
        public string rating { get; set; }
        public string descriptions { get; set; }
     

        public virtual Customer Customer { get; set; }
       
        public System.DateTime feedbackdateandtime { get; set; }
    }

}