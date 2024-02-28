using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.DatabaseContext;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AccountController(MyDbContext context)
        {
            _context = context;
        }
        // http://localhost:5050/api/Account/account/{userid}
        [HttpGet("account/{userId}")]
        public ActionResult<IEnumerable<Account>> GetAccounts(int userId)
        {
            try
            {
                
                var user = _context.User.FirstOrDefault(u => u.UserID == userId);

                if (user == null)
                {
                    return NotFound("User not found.");
                }
                
            
                var accounts = _context.Account.Where(a => a.UserID == userId).ToList();

                if (accounts.Count == 0)
                {
                    return NotFound("No accounts found for the user.");
                }

               
                var accountDetails = accounts.Select(account => new
                {
                    AccountId = account.AccountID,
                    AccountType = account.AccountType,
                    Balance = account.Balance
                    
                });

            
                return Ok(accountDetails);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during account retrieval: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
        // http://localhost:5050/api/Account/account
        [HttpPost("account")]
        public ActionResult<Account> CreateAccount([FromBody] CreateAccountRequest createAccountRequest)
        {
            try
            {
            
                var user = _context.User.FirstOrDefault(u => u.UserID == createAccountRequest.UserID);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

             
                var newAccount = new Account
                {
                    UserID = createAccountRequest.UserID,
                    AccountType = createAccountRequest.AccountType,
                    Balance = createAccountRequest.Balance
                    
                };

             
                _context.Account.Add(newAccount);
                _context.SaveChanges();

                return Ok(newAccount);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during account creation: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


    }
}