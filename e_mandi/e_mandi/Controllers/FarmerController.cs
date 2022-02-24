using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using e_mandi.Models;
using e_mandi.Models.Context;

namespace e_mandi.Controllers
{
    public class FarmerController : ApiController
    {
        private Contextdb db = new Contextdb();

        // GET: api/Farmer
        public IQueryable<Farmer> GetFarmers()
        {
            return db.Farmers;
        }

        // GET: api/Farmer/5
        [ResponseType(typeof(Farmer))]
        public IHttpActionResult GetFarmer(int id)
        {
            Farmer farmer = db.Farmers.Find(id);
            if (farmer == null)
            {
                return NotFound();
            }

            return Ok(farmer);
        }

        // PUT: api/Farmer/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFarmer(int id, Farmer farmer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != farmer.f_id)
            {
                return BadRequest();
            }

            db.Entry(farmer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FarmerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Farmer
        [ResponseType(typeof(Farmer))]
        public IHttpActionResult PostFarmer(Farmer farmer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Farmers.Add(farmer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = farmer.f_id }, farmer);
        }

        // DELETE: api/Farmer/5
        [ResponseType(typeof(Farmer))]
        public IHttpActionResult DeleteFarmer(int id)
        {
            Farmer farmer = db.Farmers.Find(id);
            if (farmer == null)
            {
                return NotFound();
            }

            db.Farmers.Remove(farmer);
            db.SaveChanges();

            return Ok(farmer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FarmerExists(int id)
        {
            return db.Farmers.Count(e => e.f_id == id) > 0;
        }
    }
}