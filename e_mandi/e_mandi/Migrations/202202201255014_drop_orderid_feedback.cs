namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class drop_orderid_feedback : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.feedback", "FK_dbo.feedback_dbo.order_Order_order_id");
            DropForeignKey("dbo.feedback", "order_id", "dbo.order");
            DropIndex("dbo.feedback", new[] { "order_id" });
            DropColumn("dbo.feedback", "order_id");
            
        }
        
        public override void Down()
        {
            AddColumn("dbo.feedback", "order_id", c => c.Int());
            CreateIndex("dbo.feedback", "order_id");
            AddForeignKey("dbo.feedback", "order_id", "dbo.order", "order_id");
        }
    }
}
