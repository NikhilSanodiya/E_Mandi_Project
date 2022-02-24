namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changes_in_foreign_key : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.vegetable", name: "Farmer_f_id", newName: "f_id");
            RenameColumn(table: "dbo.feedback", name: "Customer_c_id", newName: "c_id");
            RenameColumn(table: "dbo.feedback", name: "Order_order_id", newName: "order_id");
            RenameIndex(table: "dbo.vegetable", name: "IX_Farmer_f_id", newName: "IX_f_id");
            RenameIndex(table: "dbo.feedback", name: "IX_Customer_c_id", newName: "IX_c_id");
            RenameIndex(table: "dbo.feedback", name: "IX_Order_order_id", newName: "IX_order_id");
            DropColumn("dbo.vegetable", "v_farmerid");
            DropColumn("dbo.feedback", "feedback_c_id");
            DropColumn("dbo.feedback", "feedback_order_id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.feedback", "feedback_order_id", c => c.Int());
            AddColumn("dbo.feedback", "feedback_c_id", c => c.Int());
            AddColumn("dbo.vegetable", "v_farmerid", c => c.Int());
            RenameIndex(table: "dbo.feedback", name: "IX_order_id", newName: "IX_Order_order_id");
            RenameIndex(table: "dbo.feedback", name: "IX_c_id", newName: "IX_Customer_c_id");
            RenameIndex(table: "dbo.vegetable", name: "IX_f_id", newName: "IX_Farmer_f_id");
            RenameColumn(table: "dbo.feedback", name: "order_id", newName: "Order_order_id");
            RenameColumn(table: "dbo.feedback", name: "c_id", newName: "Customer_c_id");
            RenameColumn(table: "dbo.vegetable", name: "f_id", newName: "Farmer_f_id");
        }
    }
}
