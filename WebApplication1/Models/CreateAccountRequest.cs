using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    [NotMapped]
    public class CreateAccountRequest
    {
        public int UserID { get; set; }
        public string AccountType { get; set; }
        public decimal Balance { get; set; }
    }
}