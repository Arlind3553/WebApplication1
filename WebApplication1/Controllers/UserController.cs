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
        // GET: api/user
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

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // Implement your logic to retrieve a specific user from the database based on the id
            User user = null;
            // Add your logic here

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/user
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            // Implement your logic to create a new user in the database
            // Add your logic here

            return CreatedAtAction(nameof(Get), new { id = user.customer_id }, user);
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User user)
        {
            // Implement your logic to update an existing user in the database based on the id
            // Add your logic here

            return NoContent();
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Implement your logic to delete a user from the database based on the id
            // Add your logic here

            return NoContent();
        }
    }
}
