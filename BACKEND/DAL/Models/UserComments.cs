namespace DAL.Models

{
    public class UserComments
    {
        public int User_Id { get; set; } // Cheie externă către tabelul Utilizatori
        public int Post_Id { get; set; } // Cheie externă către tabelul Posts
        public string ContinutComentariu { get; set; }
        public DateTime DataComentariu { get; set; }

        // Relații
        public User User { get; set; }
        public Post Post { get; set; }
    }
}