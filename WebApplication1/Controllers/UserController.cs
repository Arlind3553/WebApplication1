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
    public class UserController : ControllerBase
    {

        private readonly MyDbContext _context;

        public UserController(MyDbContext context)
        {
            _context = context;
        }
        // http://localhost:5050/api/user
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            try
            {
                Console.WriteLine("Here");
                var users = _context.User.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error 11111: {ex.Message}");
            }
        }
        // http://localhost:5050/api/user/login
        [HttpPost("login")]
        public ActionResult<User> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var user = _context.User.FirstOrDefault(u => u.CardNumber == loginRequest.CardNumber && u.PIN == loginRequest.PIN);
           
                if (user != null)
                {
                 
                    user.PIN = null;
                    return Ok(user);
                }
                else
                {
                    
                    return BadRequest("Invalid card number or PIN.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during login: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
        // http://localhost:5050/api/user/register
        [HttpPost("register")]
        public ActionResult<User> Register([FromBody] RegisterRequest registerRequest)
        {
            try
            {
               
                var existingUser = _context.User.FirstOrDefault(u => u.CardNumber == registerRequest.CardNumber);

                if (existingUser != null)
                {
                    return BadRequest("User with the provided card number already exists.");
                }

              
                var newUser = new User
                {
                    FirstName = registerRequest.FirstName,
                    LastName = registerRequest.LastName,
                    PIN = registerRequest.PIN,
                    CardNumber = registerRequest.CardNumber
                   
                };

               
                _context.User.Add(newUser);
                _context.SaveChanges();

               
                newUser.PIN = null;
                return Ok(newUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during user registration: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}


