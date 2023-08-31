namespace DAL.Models
{
    public class Group
    {
        public int ID { get; set; }
        public string NumeGrup { get; set; }
        public string DescriereGrup { get; set; }
        public int OwnerId { get; set; } 

        public User Owner { get; set; } // sefu grupului
        public List<User> Members { get; set; } // restu

        public ICollection<UserGroup> UserGroups { get; set; }
    }
}