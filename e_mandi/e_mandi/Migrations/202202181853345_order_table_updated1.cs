namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class order_table_updated1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.order", "order_status");
        }
        
        public override void Down()
        {
            AddColumn("dbo.order", "order_status", c => c.String());
        }
    }
}
