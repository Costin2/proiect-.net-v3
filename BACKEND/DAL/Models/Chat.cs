using System;

namespace DAL.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public int SenderId { get; set; } // Cheie externă către tabelul Utilizatori
        public int RecipientId { get; set; } // Cheie externă către tabelul Utilizatori
        public string Content { get; set; }
        public DateTime SentAt { get; set; }

        // Relații
        public User Sender { get; set; }
        public User Recipient { get; set; }
    }
}
