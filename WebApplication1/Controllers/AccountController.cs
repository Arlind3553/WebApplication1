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
                // Find the user by the provided userId
                var user = _context.User.FirstOrDefault(u => u.UserID == userId);

                if (user == null)
                {
                    return NotFound("User not found.");
                }
                
                // Find all accounts associated with the user
                var accounts = _context.Account.Where(a => a.UserID == userId).ToList();

                if (accounts.Count == 0)
                {
                    return NotFound("No accounts found for the user.");
                }

                // Include the account details in the response
                var accountDetails = accounts.Select(account => new
                {
                    AccountId = account.AccountID,
                    AccountType = account.AccountType,
                    Balance = account.Balance
                    // Add other properties as needed
                });

                // Return the account details
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
                // Find the user by the provided userId
                var user = _context.User.FirstOrDefault(u => u.UserID == createAccountRequest.UserID);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                // Create a new account for the user
                var newAccount = new Account
                {
                    UserID = createAccountRequest.UserID,
                    AccountType = createAccountRequest.AccountType,
                    Balance = createAccountRequest.Balance
                    // Add other properties as needed
                };

                // Add the new account to the database
                _context.Account.Add(newAccount);
                _context.SaveChanges();

                // Return the newly created account details
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