using Microsoft.AspNetCore.Mvc;
using DAL.Data;
using DAL.Models;
using System;
using System.Linq;

namespace socialapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly Context _context;

        public PostController(Context context)
        {
            _context = context;
        }

        // GET: api/post
        [HttpGet]
        public IActionResult GetPosts()
        {
            var posts = _context.Posts.ToList();
            return Ok(posts);
        }

        // GET: api/post/{id}
        [HttpGet("{id}")]
        public IActionResult GetPost(Guid id)
        {
            var post = _context.Posts.Find(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // POST: api/post
        [HttpPost]
        public IActionResult CreatePost(Post newPost)
        {
            // Realizează logica pentru crearea unei postări

            _context.Posts.Add(newPost);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetPost), new { id = newPost.ID }, newPost);
        }

        // PUT: api/post/{id}
        [HttpPut("{id}")]
        public IActionResult UpdatePost(Guid id, Post updatedPost)
        {
            var post = _context.Posts.Find(id);

            if (post == null)
            {
                return NotFound();
            }

            // Realizează logica pentru actualizarea unei postări

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/post/{id}
        [HttpDelete("{id}")]
        public IActionResult DeletePost(Guid id)
        {
            var post = _context.Posts.Find(id);

            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
