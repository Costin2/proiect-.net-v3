namespace DAL.Models

{
    public class User
    {
        public int ID { get; set; }
        public string Nume { get; set; }
        public string Prenume { get; set; }
        public string Email { get; set; }
        public string Parola { get; set; }
        public DateTime DataInregistrare { get; set; }
        public string ImagineProfilURL { get; set; }
        public string Descriere { get; set; }
        public DateTime DataNasterii { get; set; }

        
        public List<Post> Posts { get; set; }
        public ProfilePicture ProfilePicture { get; set; } 
        public List<FriendRequest> SentFriendRequests { get; set; }
        public List<FriendRequest> ReceivedFriendRequests { get; set; }
        public List<Chat> SentChats { get; set; }
        public List<Chat> ReceivedChats { get; set; }
        public List<Group> CreatedGroups { get; set; }
        public List<UserLikes> LikedPosts { get; set; }
        public List<UserComments> CommentedPosts { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}