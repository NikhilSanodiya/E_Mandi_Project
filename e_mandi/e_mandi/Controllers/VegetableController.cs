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
   
    public class VegetableController : ApiController
    {
        private Contextdb db = new Contextdb();

        // GET: api/Vegetable
        public IEnumerable<Vegetable> GetVegetables()
        {
            return db.Vegetables.ToList();
        }

        // GET: api/Vegetable/5
        [ResponseType(typeof(Vegetable))]
        public IHttpActionResult GetVegetable(int id)
        {
            Vegetable vegetable = db.Vegetables.Find(id);
            if (vegetable == null)
            {
                return NotFound();
            }

            return Ok(vegetable);
        }

        // PUT: api/Vegetable/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVegetable(int id, Vegetable vegetable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vegetable.v_id)
            {
                return BadRequest();
            }

            db.Entry(vegetable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VegetableExists(id))
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

        // POST: api/Vegetable
        [ResponseType(typeof(Vegetable))]
        public IHttpActionResult PostVegetable(Vegetable vegetable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vegetables.Add(vegetable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vegetable.v_id }, vegetable);
        }

        // DELETE: api/Vegetable/5
        [ResponseType(typeof(Vegetable))]
        public IHttpActionResult DeleteVegetable(int id)
        {
            Vegetable vegetable = db.Vegetables.Find(id);
            if (vegetable == null)
            {
                return NotFound();
            }

            db.Vegetables.Remove(vegetable);
            db.SaveChanges();

            return Ok(vegetable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VegetableExists(int id)
        {
            return db.Vegetables.Count(e => e.v_id == id) > 0;
        }
    }
}