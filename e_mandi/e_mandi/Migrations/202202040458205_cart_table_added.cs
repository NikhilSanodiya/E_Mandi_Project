namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class cart_table_added : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cart",
                c => new
                    {
                        cart_id = c.Int(nullable: false, identity: true),
                        cart_v_quantity = c.Int(nullable: false),
                        veg_id = c.Int(),
                        cust_id = c.Int(),
                        Customer_c_id = c.Int(),
                        Vegetable_v_id = c.Int(),
                    })
                .PrimaryKey(t => t.cart_id)
                .ForeignKey("dbo.customer", t => t.Customer_c_id)
                .ForeignKey("dbo.vegetable", t => t.Vegetable_v_id)
                .Index(t => t.Customer_c_id)
                .Index(t => t.Vegetable_v_id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Cart", "Vegetable_v_id", "dbo.vegetable");
            DropForeignKey("dbo.Cart", "Customer_c_id", "dbo.customer");
            DropIndex("dbo.Cart", new[] { "Vegetable_v_id" });
            DropIndex("dbo.Cart", new[] { "Customer_c_id" });
            DropTable("dbo.Cart");
        }
    }
}
