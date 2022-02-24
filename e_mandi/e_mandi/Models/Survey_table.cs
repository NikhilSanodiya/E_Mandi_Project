using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace e_mandi.Models
{
    [Table("survey_table")]
    public class Survey_table
    {
        [Key]
        public int s_id { get; set; }

        [Required,MaxLength(10)]
        [Index(IsUnique = true)]
        public string land_survey_no { get; set; }
    }
}