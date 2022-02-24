namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class all_table_created : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.transaction", "t_payment_mode", c => c.String(nullable: false));
            CreateIndex("dbo.admin", "a_aadharno", unique: true);
            CreateIndex("dbo.customer", "c_aadharno", unique: true);
            CreateIndex("dbo.farmer", "f_aadharno", unique: true);
            CreateIndex("dbo.survey_table", "land_survey_no", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.survey_table", new[] { "land_survey_no" });
            DropIndex("dbo.farmer", new[] { "f_aadharno" });
            DropIndex("dbo.customer", new[] { "c_aadharno" });
            DropIndex("dbo.admin", new[] { "a_aadharno" });
            AlterColumn("dbo.transaction", "t_payment_mode", c => c.String());
        }
    }
}
