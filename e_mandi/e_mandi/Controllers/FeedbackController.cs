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
    public class FeedbackController : ApiController
    {
        private Contextdb db = new Contextdb();

        // GET: api/Feedback
        public IEnumerable<Feedback> Getfeedbacks()
        {
            return db.feedbacks.ToList();
        }

        // GET: api/Feedback/5
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult GetFeedback(int id)
        {
            Feedback feedback = db.feedbacks.Find(id);
            if (feedback == null)
            {
                return NotFound();
            }

            return Ok(feedback);
        }

        // PUT: api/Feedback/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFeedback(int id, Feedback feedback)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != feedback.feedback_id)
            {
                return BadRequest();
            }

            db.Entry(feedback).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedbackExists(id))
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

        // POST: api/Feedback
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult PostFeedback(Feedback feedback)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.feedbacks.Add(feedback);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = feedback.feedback_id }, feedback);
        }

        // DELETE: api/Feedback/5
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult DeleteFeedback(int id)
        {
            Feedback feedback = db.feedbacks.Find(id);
            if (feedback == null)
            {
                return NotFound();
            }

            db.feedbacks.Remove(feedback);
            db.SaveChanges();

            return Ok(feedback);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FeedbackExists(int id)
        {
            return db.feedbacks.Count(e => e.feedback_id == id) > 0;
        }
    }
}