namespace DAL.Models
{
    public class Group
    {
        public int ID { get; set; }
        public string NumeGrup { get; set; }
        public string DescriereGrup { get; set; }
        public int OwnerId { get; set; } // Cheie externă către tabelul Utilizatori

        // Relații
        public User Owner { get; set; } // Proprietarul grupului
        public List<User> Members { get; set; } // Membrii grupului
    }
}