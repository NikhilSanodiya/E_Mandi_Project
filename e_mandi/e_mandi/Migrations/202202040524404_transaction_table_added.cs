namespace e_mandi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class transaction_table_added : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Transaction",
                c => new
                    {
                        t_id = c.Int(nullable: false, identity: true),
                        trans_cust_id = c.Int(),
                        t_dateandtime = c.DateTime(nullable: false),
                        t_payment_mode = c.String(),
                        t_total_amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        t_status = c.Boolean(nullable: false),
                        Customer_c_id = c.Int(),
                    })
                .PrimaryKey(t => t.t_id)
                .ForeignKey("dbo.customer", t => t.Customer_c_id)
                .Index(t => t.Customer_c_id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Transaction", "Customer_c_id", "dbo.customer");
            DropIndex("dbo.Transaction", new[] { "Customer_c_id" });
            DropTable("dbo.Transaction");
        }
    }
}
