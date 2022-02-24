namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class vid_added_in_orderTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.order", "v_id", c => c.Int());
            CreateIndex("dbo.order", "v_id");
            AddForeignKey("dbo.order", "v_id", "dbo.vegetable", "v_id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.order", "v_id", "dbo.vegetable");
            DropIndex("dbo.order", new[] { "v_id" });
            DropColumn("dbo.order", "v_id");
        }
    }
}
