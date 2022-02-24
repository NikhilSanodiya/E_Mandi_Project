namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class f_id_updated : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.vegetable", "f_id", "dbo.farmer");
            DropIndex("dbo.vegetable", new[] { "f_id" });
            AlterColumn("dbo.vegetable", "f_id", c => c.Int(nullable: false));
            CreateIndex("dbo.vegetable", "f_id");
            AddForeignKey("dbo.vegetable", "f_id", "dbo.farmer", "f_id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.vegetable", "f_id", "dbo.farmer");
            DropIndex("dbo.vegetable", new[] { "f_id" });
            AlterColumn("dbo.vegetable", "f_id", c => c.Int());
            CreateIndex("dbo.vegetable", "f_id");
            AddForeignKey("dbo.vegetable", "f_id", "dbo.farmer", "f_id");
        }
    }
}
