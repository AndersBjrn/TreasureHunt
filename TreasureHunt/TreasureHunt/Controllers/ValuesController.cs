using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TreasureHunt.Models;

namespace TreasureHunt.Controllers
{
    [RoutePrefix("API")]
    public class ValuesController : ApiController
    {

        [Route("CreateDB"), HttpGet]
        public void CreateDB()
        {
<<<<<<< HEAD

=======
>>>>>>> 29e6c8dcefce0dc08a8a5faa2983b5e066e95b78
            DBHandler.CreateDB();
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
