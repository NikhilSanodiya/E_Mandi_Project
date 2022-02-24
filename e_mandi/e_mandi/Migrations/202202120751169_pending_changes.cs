namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class pending_changes : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.order", "v_id", "dbo.vegetable");
            DropIndex("dbo.order", new[] { "v_id" });
            AlterColumn("dbo.order", "v_id", c => c.Int(nullable: false));
            CreateIndex("dbo.order", "v_id");
            AddForeignKey("dbo.order", "v_id", "dbo.vegetable", "v_id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.order", "v_id", "dbo.vegetable");
            DropIndex("dbo.order", new[] { "v_id" });
            AlterColumn("dbo.order", "v_id", c => c.Int());
            CreateIndex("dbo.order", "v_id");
            AddForeignKey("dbo.order", "v_id", "dbo.vegetable", "v_id");
        }
    }
}
