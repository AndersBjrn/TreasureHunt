using NHibernate.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TreasureHunt.Models;
using TreasureHunt.Services;

namespace TreasureHunt.Controllers
{

    [EnableCors(origins: "http://localhost:9000", headers: "*", methods: "*")]
    [RoutePrefix("API")]
    public class ValuesController : ApiController
    {

        [Route("CreateDB"), HttpGet]
        public void CreateDB()
        {
            DBHandler.CreateDB();
        }

        [Route("FillDB"), HttpGet]
        public void FillDB()
        {
            List<string> riddlesFromFile = new List<string>(File.ReadAllLines(@"C:\Project\TreasureHunt\testdata.txt")).ToList();

            var session = DBService.OpenSession();

            foreach (var line in riddlesFromFile)
            {
                Riddle newRiddle = new Riddle
                {
                    DisplayText = line,
                    Answer = "1",
                    Type = "math"
                };
                session.Save(newRiddle);
            }

            DBService.CloseSession(session);
        }

        [Route("GetRiddles"), HttpGet]
        public IEnumerable<Riddle> GetRiddles()
        {
            var session = DBService.OpenSession();
            var result = session.Query<Riddle>().ToList();
            DBService.CloseSession(session);
            return result;
        }

        [Route("GetRandomRiddle"), HttpGet]
        public string GetOneRandomRiddle()
        {
            List<Riddle> riddleList = GetRiddles().ToList();
            Random rnd = new Random();
            int nextRiddle = rnd.Next(0, riddleList.Count());
            return riddleList[nextRiddle].DisplayText;
        }

        [Route("GetAnswer"), HttpGet]
        public string GetAnswer(string riddleAnswer, string riddle)
        {
            var session = DBService.OpenSession();
            Riddle currentRiddle = session.Query<Riddle>().Where(c => c.DisplayText == riddle).Single();
            DBService.CloseSession(session);
            if (currentRiddle.Answer == riddleAnswer)
            {
                return "bra";
            }
            else
            {
                return "dåligt";
            }

        }

        [Route("InsertRiddle"), HttpPost]
        public void InsertRiddleIntoDB(Riddle riddle)
        {
            var session = DBService.OpenSession();
            session.Save(riddle);
            DBService.CloseSession(session);
        }

        [Route("LogIn"), HttpGet]
        public IHttpActionResult LogIn(string playerName, string playerPassword)
        {
            var session = DBService.OpenSession();

            var loginPlayer = session.Query<Player>().Where(c => c.Name == playerName && c.Password == playerPassword).Single();

            string response = "";
            if (playerName == loginPlayer.Name && playerPassword == loginPlayer.Password)
            {
                response = "Log in successfull!";
            }
            else
            {
                response = "Invalid username or password.";
                return BadRequest(response);
            }

            DBService.CloseSession(session);

            return Ok(response);
        }

        [Route("AddRiddleToPlayer"), HttpPost]
        public void AddRiddleToPlayer(Player player, Riddle riddle)
        {
            var session = DBService.OpenSession();
            player.AddRiddle(riddle);
            session.Save(player);
            DBService.CloseSession(session);
        }

        [Route("CreatePlayer"), HttpPost]
        public void CreatePlayer()
        {
            throw new NotImplementedException();
        }
    }
}
