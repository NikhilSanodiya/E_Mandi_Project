namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class id_name_updated : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.cart", name: "Customer_c_id", newName: "c_id");
            RenameColumn(table: "dbo.cart", name: "Vegetable_v_id", newName: "v_id");
            RenameIndex(table: "dbo.cart", name: "IX_Vegetable_v_id", newName: "IX_v_id");
            RenameIndex(table: "dbo.cart", name: "IX_Customer_c_id", newName: "IX_c_id");
            DropColumn("dbo.cart", "veg_id");
            DropColumn("dbo.cart", "cust_id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.cart", "cust_id", c => c.Int());
            AddColumn("dbo.cart", "veg_id", c => c.Int());
            RenameIndex(table: "dbo.cart", name: "IX_c_id", newName: "IX_Customer_c_id");
            RenameIndex(table: "dbo.cart", name: "IX_v_id", newName: "IX_Vegetable_v_id");
            RenameColumn(table: "dbo.cart", name: "v_id", newName: "Vegetable_v_id");
            RenameColumn(table: "dbo.cart", name: "c_id", newName: "Customer_c_id");
        }
    }
}
