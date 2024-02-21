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
    public class LoginRequest
    {
        public string CardNumber { get; set; }
        public string PIN { get; set; }
    }

}