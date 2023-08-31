using Microsoft.AspNetCore.Mvc;
using DAL.Data;
using DAL.Models;
using System;
using System.Linq;

namespace socialapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly Context _context;

        public GroupController(Context context)
        {
            _context = context;
        }

        // GET: api/group
        [HttpGet]
        public IActionResult GetGroups()
        {
            var groups = _context.Groups.ToList();
            return Ok(groups);
        }

        // GET: api/group/{id}
        [HttpGet("{id}")]
        public IActionResult GetGroup(Guid id)
        {
            var group = _context.Groups.Find(id);

            if (group == null)
            {
                return NotFound();
            }

            return Ok(group);
        }

        // POST: api/group
        [HttpPost]
        public IActionResult CreateGroup(Group newGroup)
        {
            _context.Groups.Add(newGroup);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetGroup), new { id = newGroup.ID }, newGroup);
        }

        // PUT: api/group/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateGroup(Guid id, Group updatedGroup)
        {
            var group = _context.Groups.Find(id);

            if (group == null)
            {
                return NotFound();
            }

            // Actualizează proprietățile grupului în funcție de updatedGroup
            // Validează și gestionează erorile, dacă este necesar

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/group/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteGroup(Guid id)
        {
            var group = _context.Groups.Find(id);

            if (group == null)
            {
                return NotFound();
            }

            _context.Groups.Remove(group);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
