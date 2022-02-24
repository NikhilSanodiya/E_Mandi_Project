namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class all_table_created1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.feedback",
                c => new
                    {
                        feedback_id = c.Int(nullable: false, identity: true),
                        feedback_c_id = c.Int(),
                        rating = c.String(),
                        descriptions = c.String(),
                        feedback_order_id = c.Int(),
                        Customer_c_id = c.Int(),
                        Order_order_id = c.Int(),
                    })
                .PrimaryKey(t => t.feedback_id)
                .ForeignKey("dbo.customer", t => t.Customer_c_id)
                .ForeignKey("dbo.order", t => t.Order_order_id)
                .Index(t => t.Customer_c_id)
                .Index(t => t.Order_order_id);
            
            CreateTable(
                "dbo.order",
                c => new
                    {
                        order_id = c.Int(nullable: false, identity: true),
                        order_status = c.String(nullable: false),
                        t_id = c.Int(),
                    })
                .PrimaryKey(t => t.order_id)
                .ForeignKey("dbo.transaction", t => t.t_id)
                .Index(t => t.t_id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.order", "t_id", "dbo.transaction");
            DropForeignKey("dbo.feedback", "Order_order_id", "dbo.order");
            DropForeignKey("dbo.feedback", "Customer_c_id", "dbo.customer");
            DropIndex("dbo.order", new[] { "t_id" });
            DropIndex("dbo.feedback", new[] { "Order_order_id" });
            DropIndex("dbo.feedback", new[] { "Customer_c_id" });
            DropTable("dbo.order");
            DropTable("dbo.feedback");
        }
    }
}
