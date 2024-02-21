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
        public int TransactionID { get; set; }

        [ForeignKey("User")]
        public int? UserID { get; set; }  // Nullable, as indicated in the database structure

        [ForeignKey("Account")]
        public int? AccountID { get; set; }  // Nullable, as indicated in the database structure

        [Required]
        [Column(TypeName = "enum('Deposit','Withdraw','Transfer')")]
        public string TransactionType { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateAndTime { get; set; }
    }

}
