namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.admin",
                c => new
                    {
                        a_id = c.Int(nullable: false, identity: true),
                        a_name = c.String(nullable: false),
                        a_aadharno = c.String(nullable: false, maxLength: 12),
                        a_mobileno = c.String(nullable: false, maxLength: 10),
                        a_address = c.String(),
                        a_password = c.String(nullable: false, maxLength: 12),
                        a_regdateandtime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.a_id);
            
            CreateTable(
                "dbo.customer",
                c => new
                    {
                        c_id = c.Int(nullable: false, identity: true),
                        c_name = c.String(nullable: false),
                        c_aadharno = c.String(nullable: false, maxLength: 12),
                        c_mobileno = c.String(nullable: false, maxLength: 10),
                        c_address = c.String(),
                        c_password = c.String(nullable: false, maxLength: 12),
                        c_regdateandtime = c.DateTime(nullable: false),
                        c_status = c.Boolean(),
                        c_city = c.String(),
                        c_pincode = c.String(),
                    })
                .PrimaryKey(t => t.c_id);
            
            CreateTable(
                "dbo.farmer",
                c => new
                    {
                        f_id = c.Int(nullable: false, identity: true),
                        f_name = c.String(nullable: false),
                        f_aadharno = c.String(nullable: false, maxLength: 12),
                        survey_no = c.String(nullable: false),
                        f_mobileno = c.String(nullable: false, maxLength: 10),
                        f_address = c.String(),
                        f_password = c.String(nullable: false, maxLength: 12),
                        f_regdateandtime = c.DateTime(nullable: false),
                        f_status = c.Boolean(nullable: false),
                        f_city = c.String(nullable: false),
                        f_pincode = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.f_id);
            
            CreateTable(
                "dbo.survey_table",
                c => new
                    {
                        s_id = c.Int(nullable: false, identity: true),
                        land_survey_no = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.s_id);
            
            CreateTable(
                "dbo.vegetable",
                c => new
                    {
                        v_id = c.Int(nullable: false, identity: true),
                        v_name = c.String(nullable: false),
                        v_quantity = c.Int(nullable: false),
                        v_price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        v_dateandtime = c.DateTime(nullable: false),
                        v_image = c.String(),
                        v_status = c.Boolean(nullable: false),
                        v_unit = c.String(),
                        v_farmerid = c.Int(),
                        Farmer_f_id = c.Int(),
                    })
                .PrimaryKey(t => t.v_id)
                .ForeignKey("dbo.farmer", t => t.Farmer_f_id)
                .Index(t => t.Farmer_f_id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.vegetable", "Farmer_f_id", "dbo.farmer");
            DropIndex("dbo.vegetable", new[] { "Farmer_f_id" });
            DropTable("dbo.vegetable");
            DropTable("dbo.survey_table");
            DropTable("dbo.farmer");
            DropTable("dbo.customer");
            DropTable("dbo.admin");
        }
    }
}
