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
    [Authorize]
    public class CartController : ApiController
    {
        private Contextdb db = new Contextdb();

        // GET: api/Cart
        public IEnumerable<Cart> GetCarts()
        {
            return db.Carts.ToList();
        }

        // GET: api/Cart/5
        [ResponseType(typeof(Cart))]
        public IHttpActionResult GetCart(int c_id)
        {
            //Cart cart = db.Carts.Find(c_id);
            
            IEnumerable<Cart> c = db.Carts.Where(x => x.c_id.Equals(c_id)).ToList();
            if (c == null)
            {
                return NotFound();
            }

            return Ok(c);
        }

        // PUT: api/Cart/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCart(int id, Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cart.cart_id)
            {
                return BadRequest();
            }

            db.Entry(cart).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Cart
        [ResponseType(typeof(Cart))]
        public IHttpActionResult PostCart(Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Carts.Add(cart);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cart.cart_id }, cart);
        }

        // DELETE: api/Cart/5
        [ResponseType(typeof(Cart))]
        public IHttpActionResult DeleteCart(int id)
        {
            Cart cart = db.Carts.Find(id);
            if (cart == null)
            {
                return NotFound();
            }

            db.Carts.Remove(cart);
            db.SaveChanges();

            return Ok(cart);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CartExists(int id)
        {
            return db.Carts.Count(e => e.cart_id == id) > 0;
        }
    }
}