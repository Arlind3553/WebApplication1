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
    public class WithdrawRequest
    {
        public int AccountID { get; set; }
        public decimal Amount { get; set; }
        public int UserID { get; set; }
    }
}