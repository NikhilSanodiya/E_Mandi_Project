namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class order_table_updated : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.order", "t_id", "dbo.transaction");
            DropIndex("dbo.order", new[] { "t_id" });
            AddColumn("dbo.order", "cart_v_quantity", c => c.Int(nullable: false));
            AddColumn("dbo.order", "c_id", c => c.Int(nullable: false));
            AlterColumn("dbo.order", "order_status", c => c.String());
            CreateIndex("dbo.order", "c_id");
            AddForeignKey("dbo.order", "c_id", "dbo.customer", "c_id", cascadeDelete: true);
            DropColumn("dbo.order", "t_id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.order", "t_id", c => c.Int());
            DropForeignKey("dbo.order", "c_id", "dbo.customer");
            DropIndex("dbo.order", new[] { "c_id" });
            AlterColumn("dbo.order", "order_status", c => c.String(nullable: false));
            DropColumn("dbo.order", "c_id");
            DropColumn("dbo.order", "cart_v_quantity");
            CreateIndex("dbo.order", "t_id");
            AddForeignKey("dbo.order", "t_id", "dbo.transaction", "t_id");
        }
    }
}
