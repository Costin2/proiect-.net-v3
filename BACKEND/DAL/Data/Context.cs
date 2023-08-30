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
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserLikes> UserLikes { get; set; }
        public DbSet<UserComments> UserComments { get; set; }
        
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



            base.OnModelCreating(modelBuilder);
        }
    }
}
