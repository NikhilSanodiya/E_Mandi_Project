using e_mandi.Models.Admins;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;


namespace e_mandi.Models.Context
{
    public class Contextdb:DbContext
    {
        public Contextdb():base("name=Conn")
        {
            //this.Configuration.LazyLoadingEnabled = false;
            //this.Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Farmer> Farmers { get; set; }
        public DbSet<Survey_table> Survey_Tables { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Vegetable> Vegetables { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet <Feedback> feedbacks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vegetable>()
                        .HasMany<Order>(g => g.Order)
                        .WithRequired(s => s.Vegetable)
                        .WillCascadeOnDelete();
            base.OnModelCreating(modelBuilder);
        }

    }
}