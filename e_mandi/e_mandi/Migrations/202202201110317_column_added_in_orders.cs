namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class column_added_in_orders : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.order", "payment_mode", c => c.String());
            AddColumn("dbo.order", "order_status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.order", "order_status");
            DropColumn("dbo.order", "payment_mode");
        }
    }
}
