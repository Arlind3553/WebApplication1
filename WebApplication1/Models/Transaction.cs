using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace WebApplication1.Models
{
    public class Transactions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int transaction_id { get; set; }

        [ForeignKey("Account")]
        public int account_id { get; set; }

        public string? transaction_type { get; set; }

        public decimal amount { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime timestamp { get; set; }
    }


}
