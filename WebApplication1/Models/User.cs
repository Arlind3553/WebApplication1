using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int customer_id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? first_name { get; set; }

        [Required]
        [MaxLength(50)]
        public string? last_name { get; set; }

        [Required]
        [MaxLength(255)]
        public string? pin { get; set; }

        [Required]
        [MaxLength(16)]
        public string? card_number { get; set; }
    }
}
