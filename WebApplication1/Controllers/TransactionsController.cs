using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using WebApplication1.DatabaseContext;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public TransactionsController(MyDbContext context)
        {
            _context = context;
        }
        // http://localhost:5050/api/Transactions/deposit
        [HttpPost("Deposit")]
        public IActionResult Deposit([FromBody] DepositRequest depositRequest)
        {

            if (depositRequest == null || depositRequest.Amount <= 0)
            {
                return BadRequest("Invalid deposit request. Please provide a valid positive numeric value for Amount.");
            }


            // Assuming you have some validation logic for account existence, you can replace the next line accordingly.
            var account = _context.Account.FirstOrDefault(a => a.AccountID == depositRequest.AccountID);

            if (account == null)
            {
                return NotFound("Account not found");
            }

            // Create a new transaction for the deposit
            var depositTransaction = new Transactions
            {
                AccountID = depositRequest.AccountID,
                TransactionType = "Deposit",
                Amount = depositRequest.Amount,
                UserID = depositRequest.UserID,
                DateAndTime = DateTime.Now
            };

            // Update the account balance
            account.Balance += depositRequest.Amount;

            // Add the transaction to the database
            _context.Transactions.Add(depositTransaction);
            _context.SaveChanges();
            return Ok();
        }
        // http://localhost:5050/api/Transactions/Withdraw
        [HttpPost("Withdraw")]
        public IActionResult Withdraw([FromBody] WithdrawRequest withdrawRequest)
        {
            if (withdrawRequest == null || withdrawRequest.Amount <= 0 || withdrawRequest.AccountID <= 0)
            {
                return BadRequest("Invalid withdrawal request");
            }

            var account = _context.Account.FirstOrDefault(a => a.AccountID == withdrawRequest.AccountID);

            if (account == null)
            {
                return NotFound("Account not found");
            }

            if (account.Balance < withdrawRequest.Amount)
            {
                return BadRequest("Insufficient funds");
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Create a new transaction for the withdrawal
                    var withdrawalTransaction = new Transactions
                    {
                        AccountID = withdrawRequest.AccountID,
                        TransactionType = "Withdraw", // Assuming you have an enum for TransactionType
                        Amount = withdrawRequest.Amount,
                        UserID = withdrawRequest.UserID,
                        DateAndTime = DateTime.Now
                    };

                    // Update the account balance
                    account.Balance -= withdrawRequest.Amount;

                    // Add the transaction to the database
                    _context.Transactions.Add(withdrawalTransaction);
                    _context.SaveChanges();

                    transaction.Commit(); // Commit the transaction if everything is successful

                    return Ok();
                }
                catch (Exception)
                {
                    transaction.Rollback(); // Rollback the transaction if there's an exception
                    return StatusCode(500, "Internal server error");
                }
            }
        }
        // http://localhost:5050/api/Transactions/Transfer
        [HttpPost("Transfer")]
        public IActionResult Transfer([FromBody] TransferRequest transferRequest)
        {
            if (transferRequest == null || transferRequest.Amount <= 0 || transferRequest.FromAccountID <= 0 || transferRequest.ToAccountID <= 0)
            {
                return BadRequest("Invalid transfer request");
            }

            var fromAccount = _context.Account.FirstOrDefault(a => a.AccountID == transferRequest.FromAccountID);
            var toAccount = _context.Account.FirstOrDefault(a => a.AccountID == transferRequest.ToAccountID);

            if (fromAccount == null || toAccount == null)
            {
                return NotFound("One or more accounts not found");
            }

            if (fromAccount.Balance < transferRequest.Amount)
            {
                return BadRequest("Insufficient funds in the source account");
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Create a new transaction for the withdrawal from the source account
                    var withdrawalTransaction = new Transactions
                    {
                        AccountID = transferRequest.FromAccountID,
                        TransactionType = "Transfer",
                        Amount = transferRequest.Amount,
                        UserID = transferRequest.UserID, // Set UserID
                        DateAndTime = DateTime.Now
                    };

                    // Update the source account balance
                    fromAccount.Balance -= transferRequest.Amount;

                    // Create a new transaction for the deposit to the destination account
                    var depositTransaction = new Transactions
                    {
                        AccountID = transferRequest.ToAccountID,
                        TransactionType = "Transfer",
                        Amount = transferRequest.Amount,
                        UserID = transferRequest.UserID, // Set UserID
                        DateAndTime = DateTime.Now
                    };

                    // Update the destination account balance
                    toAccount.Balance += transferRequest.Amount;

                    // Add both transactions to the database
                    _context.Transactions.Add(withdrawalTransaction);
                    _context.Transactions.Add(depositTransaction);
                    _context.SaveChanges();

                    transaction.Commit(); // Commit the transaction if everything is successful

                    return Ok();
                }
                catch (Exception)
                {
                    transaction.Rollback(); // Rollback the transaction if there's an exception
                    return StatusCode(500, "Internal server error");
                }
            }
        }

        // http://localhost:5050/api/Transactions/GetTransactionsByAccountId/{accountID}
        [HttpGet("GetTransactionsByAccountId/{accountId}")]
        public ActionResult<IEnumerable<Transactions>> GetTransactionsByAccountId(int accountId)
        {
            var transactions = _context.Transactions
                .Where(t => t.AccountID == accountId)
                .ToList();

            if (transactions == null || transactions.Count == 0)
            {
                return NotFound("No transactions found for the specified account ID");
            }

            return Ok(transactions);
        }
        // http://localhost:5050/api/Transactions/GetTransactionsByAccountId/{userId}
        [HttpGet("GetTransactionsByUserId/{userId}")]
        public ActionResult<IEnumerable<Transactions>> GetTransactionsByUserId(int userId)
        {
            var transactions = _context.Transactions
                .Where(t => t.UserID == userId)
                .ToList();

            if (transactions == null || transactions.Count == 0)
            {
                return NotFound("No transactions found for the specified user ID");
            }

            return Ok(transactions);
        }

    }
}