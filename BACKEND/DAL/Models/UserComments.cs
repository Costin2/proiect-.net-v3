namespace DAL.Models

{
    public class UserComments
    {
        public int User_Id { get; set; } 
        public int Post_Id { get; set; } 
        public string ContinutComentariu { get; set; }
        public DateTime DataComentariu { get; set; }

       
        public User User { get; set; }
        public Post Post { get; set; }
    }
}