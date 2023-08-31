using System;

namespace DAL.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public int SenderId { get; set; } 
        public int RecipientId { get; set; } 
        public string Content { get; set; }
        public DateTime SentAt { get; set; }

       
        public User Sender { get; set; }
        public User Recipient { get; set; }
    }
}
