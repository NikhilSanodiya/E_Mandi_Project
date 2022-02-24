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
    public class SurveytableController : ApiController
    {
        private Contextdb db = new Contextdb();

        // GET: api/Surveytable
        public IQueryable<Survey_table> GetSurvey_Tables()
        {
            return db.Survey_Tables;
        }

        // GET: api/Surveytable/5
        [ResponseType(typeof(Survey_table))]
        public IHttpActionResult GetSurvey_table(int id)
        {
            Survey_table survey_table = db.Survey_Tables.Find(id);
            if (survey_table == null)
            {
                return NotFound();
            }

            return Ok(survey_table);
        }

        // PUT: api/Surveytable/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSurvey_table(int id, Survey_table survey_table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != survey_table.s_id)
            {
                return BadRequest();
            }

            db.Entry(survey_table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Survey_tableExists(id))
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

        // POST: api/Surveytable
        [ResponseType(typeof(Survey_table))]
        public IHttpActionResult PostSurvey_table(Survey_table survey_table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Survey_Tables.Add(survey_table);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = survey_table.s_id }, survey_table);
        }

        // DELETE: api/Surveytable/5
        [ResponseType(typeof(Survey_table))]
        public IHttpActionResult DeleteSurvey_table(int id)
        {
            Survey_table survey_table = db.Survey_Tables.Find(id);
            if (survey_table == null)
            {
                return NotFound();
            }

            db.Survey_Tables.Remove(survey_table);
            db.SaveChanges();

            return Ok(survey_table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Survey_tableExists(int id)
        {
            return db.Survey_Tables.Count(e => e.s_id == id) > 0;
        }
    }
}