namespace DAL.Models

{
    public class UserLikes
    {
        public int UserId { get; set; } // Cheie externă către tabelul Utilizatori
        public int PostId { get; set; } // Cheie externă către tabelul Posts

        // Relații
        public User User { get; set; }
        public Post Post { get; set; }
    }
}
