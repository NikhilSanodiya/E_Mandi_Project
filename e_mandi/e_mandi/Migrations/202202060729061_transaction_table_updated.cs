namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class transaction_table_updated : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.cart", "c_id", "dbo.customer");
            DropForeignKey("dbo.cart", "v_id", "dbo.vegetable");
            DropForeignKey("dbo.transaction", "Customer_c_id", "dbo.customer");
            DropIndex("dbo.cart", new[] { "v_id" });
            DropIndex("dbo.cart", new[] { "c_id" });
            DropIndex("dbo.transaction", new[] { "Customer_c_id" });
            RenameColumn(table: "dbo.transaction", name: "Customer_c_id", newName: "c_id");
            AlterColumn("dbo.cart", "v_id", c => c.Int(nullable: false));
            AlterColumn("dbo.cart", "c_id", c => c.Int(nullable: false));
            AlterColumn("dbo.transaction", "c_id", c => c.Int(nullable: false));
            CreateIndex("dbo.cart", "v_id");
            CreateIndex("dbo.cart", "c_id");
            CreateIndex("dbo.transaction", "c_id");
            AddForeignKey("dbo.cart", "c_id", "dbo.customer", "c_id", cascadeDelete: true);
            AddForeignKey("dbo.cart", "v_id", "dbo.vegetable", "v_id", cascadeDelete: true);
            AddForeignKey("dbo.transaction", "c_id", "dbo.customer", "c_id", cascadeDelete: true);
            DropColumn("dbo.transaction", "trans_cust_id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.transaction", "trans_cust_id", c => c.Int());
            DropForeignKey("dbo.transaction", "c_id", "dbo.customer");
            DropForeignKey("dbo.cart", "v_id", "dbo.vegetable");
            DropForeignKey("dbo.cart", "c_id", "dbo.customer");
            DropIndex("dbo.transaction", new[] { "c_id" });
            DropIndex("dbo.cart", new[] { "c_id" });
            DropIndex("dbo.cart", new[] { "v_id" });
            AlterColumn("dbo.transaction", "c_id", c => c.Int());
            AlterColumn("dbo.cart", "c_id", c => c.Int());
            AlterColumn("dbo.cart", "v_id", c => c.Int());
            RenameColumn(table: "dbo.transaction", name: "c_id", newName: "Customer_c_id");
            CreateIndex("dbo.transaction", "Customer_c_id");
            CreateIndex("dbo.cart", "c_id");
            CreateIndex("dbo.cart", "v_id");
            AddForeignKey("dbo.transaction", "Customer_c_id", "dbo.customer", "c_id");
            AddForeignKey("dbo.cart", "v_id", "dbo.vegetable", "v_id");
            AddForeignKey("dbo.cart", "c_id", "dbo.customer", "c_id");
        }
    }
}
