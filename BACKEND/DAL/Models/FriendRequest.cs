namespace DAL.Models

{
    public class FriendRequest
    {
        public int SourceUserId { get; set; } // Cheie externă către tabelul Utilizatori
        public int DestinationUserId { get; set; } // Cheie externă către tabelul Utilizatori
        public FriendshipStatus StarePrietenie { get; set; }

        // Relații
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

