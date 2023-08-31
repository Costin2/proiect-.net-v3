namespace DAL.Models

{
    public class FriendRequest
    {
        public int SourceUserId { get; set; } 
        public int DestinationUserId { get; set; } 
        public FriendshipStatus StarePrietenie { get; set; }

        
        public User SourceUser { get; set; }
        public User DestinationUser { get; set; }
    }

    public enum FriendshipStatus
    {
        InAsteptare,
        Acceptat,
        Refuzat,
        Blocat
    }
}

