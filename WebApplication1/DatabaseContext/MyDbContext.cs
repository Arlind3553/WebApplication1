using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.DatabaseContext
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }

        public DbSet<Account> Account { get; set; }
        public DbSet<Transactions> Transactions { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<LoginRequest> LoginRequest { get; set; }


        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySql("server=localhost;database=ATM;user=mondi;password=Arlind123", new MySqlServerVersion(new Version(8, 0, 36)));
    }

    }

}