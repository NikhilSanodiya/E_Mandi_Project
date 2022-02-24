namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class feedbackdateandtime_added : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.feedback", "feedbackdateandtime", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.feedback", "feedbackdateandtime");
        }
    }
}
