using DAL.Models;
using DAL.Models.BaseEntity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; } // User - M:1 with ProfilePicture, 1:M with Posts, 1:M with SentChats, 1:M with ReceivedChats, 1:M with SentFriendRequests, 1:M with ReceivedFriendRequests, 1:M with LikedPosts, 1:M with CommentedPosts
        public DbSet<Post> Posts { get; set; } // Post - M:1 with User, 1:M with UserLikes, 1:M with UserComments
        public DbSet<FriendRequest> FriendRequests { get; set; } // FriendRequest - 1:1 with SourceUser, 1:1 with DestinationUser
        public DbSet<Chat> Chats { get; set; } // Chat - M:1 with Sender, M:1 with Recipient
        public DbSet<Group> Groups { get; set; } // Group - M:1 with Owner
        public DbSet<UserLikes> UserLikes { get; set; } // UserLikes - 1:1 with User, 1:1 with Post
        public DbSet<UserComments> UserComments { get; set; } // UserComments - 1:1 with User, 1:1 with Post
        public DbSet<UserGroup> UserGroups { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
        /*
        public Context() : base()
        {

        }*/
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(user => user.ProfilePicture)
                .WithOne(picture => picture.User)
                .HasForeignKey<ProfilePicture>(picture => picture.UserID);

            modelBuilder.Entity<User>()
                .HasMany(user => user.Posts)
                .WithOne(post => post.User);

            modelBuilder.Entity<FriendRequest>()
                .HasKey(fr => new { fr.SourceUserId, fr.DestinationUserId });

            modelBuilder.Entity<FriendRequest>()
                .HasOne(fr => fr.SourceUser) // Assuming this is the navigation property for the source user
                .WithMany(u => u.SentFriendRequests) // Assuming this is the navigation property for sent requests in the User entity
                .HasForeignKey(fr => fr.SourceUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FriendRequest>()
                .HasOne(fr => fr.DestinationUser) // Assuming this is the navigation property for the destination user
                .WithMany(u => u.ReceivedFriendRequests) // Assuming this is the navigation property for received requests in the User entity
                .HasForeignKey(fr => fr.DestinationUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Chat>()
                .HasOne(chat => chat.Sender)
                .WithMany(user => user.SentChats)
                .HasForeignKey(chat => chat.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Chat>()
                .HasOne(chat => chat.Recipient)
                .WithMany(user => user.ReceivedChats)
                .HasForeignKey(chat => chat.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Group>()
                .HasOne(group => group.Owner)
                .WithMany(user => user.CreatedGroups)
                .HasForeignKey(group => group.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserLikes>()
                .HasKey(ul => new { ul.UserId, ul.PostId });

            modelBuilder.Entity<UserLikes>()
                .HasOne(ul => ul.User)
                .WithMany(u => u.LikedPosts)
                .HasForeignKey(ul => ul.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserLikes>()
                .HasOne(ul => ul.Post)
                .WithMany(p => p.UserLikes)
                .HasForeignKey(ul => ul.PostId) // Change the type of this property to Guid
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserComments>()
                .HasKey(uc => new { uc.User_Id, uc.Post_Id });

            modelBuilder.Entity<UserComments>()
                .HasOne(uc => uc.User)
                .WithMany(user => user.CommentedPosts)
                .HasForeignKey(uc => uc.User_Id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserComments>()
                .HasOne(uc => uc.Post)
                .WithMany(post => post.UserComments)
                .HasForeignKey(uc => uc.Post_Id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });

            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.User)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(ug => ug.UserId);

            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.Group)
                .WithMany(g => g.UserGroups)
                .HasForeignKey(ug => ug.GroupId);


            base.OnModelCreating(modelBuilder);
        }
    }
}
