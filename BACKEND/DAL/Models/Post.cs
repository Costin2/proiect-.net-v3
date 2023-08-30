namespace DAL.Models
{
    public class Post
    {
        public int ID { get; set; }
        public int UserID { get; set; } // Cheie externă către tabelul Utilizatori
        public string TextulPostarii { get; set; }
        public DateTime DataPostarii { get; set; }
        public string ImagineURL { get; set; }

        // Relații
        public User User { get; set; }
        public List<UserLikes> UserLikes { get; set; }
        public List<UserComments> UserComments { get; set; }
    }
}
