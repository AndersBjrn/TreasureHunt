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

        [Route("GetRandomRiddleFromPlayer"), HttpGet]
        public string RandomRiddleFromPlayer(string playerName)
        {
            var session = DBService.OpenSession();
            Player p = session.Query<Player>().Where(c => c.Name == playerName).SingleOrDefault();
            List<Riddle> playerRiddles = p.Riddles.ToList();
            Random rnd = new Random();
            int nextRiddle = rnd.Next(0, playerRiddles.Count());
            DBService.CloseSession(session);
            Riddle r = playerRiddles.Where(c => c.DisplayText == playerRiddles[nextRiddle].DisplayText).SingleOrDefault();
            RemoveRiddleFromPlayer(playerName, playerRiddles[nextRiddle].DisplayText);
            return playerRiddles[nextRiddle].DisplayText;
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
        public bool GetAnswer(string riddleAnswer, string riddle)
        {
            var session = DBService.OpenSession();
            Riddle currentRiddle = session.Query<Riddle>().Where(c => c.DisplayText == riddle).SingleOrDefault();
            DBService.CloseSession(session);
            if (currentRiddle == null)
            {
                return true;
            }
            if (currentRiddle.Answer == riddleAnswer)
            {
                return true;
            }
            else
            {
                return false;
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
        public bool LogIn(string playerName, string playerPassword)
        {
            var session = DBService.OpenSession();
            var loginPlayer = session.Query<Player>().Where(c => c.Name == playerName && c.Password == playerPassword).SingleOrDefault();
            bool response = false;

            if (loginPlayer == null)
            {
                return false;
            }

            if (playerName == loginPlayer.Name && playerPassword == loginPlayer.Password)
            {
                response = true;
            }
            else
            {
                response = false;

            }

            DBService.CloseSession(session);
            return response;
        }

        [Route("AddRiddleToPlayer"), HttpPost]
        public void AddRiddleToPlayer(string playerName, string riddleText)
        {
            var session = DBService.OpenSession();
            Player player = session.Query<Player>().Where(c => c.Name == playerName).Single();
            Riddle riddle = session.Query<Riddle>().Where(c => c.DisplayText == riddleText).Single();
            player.AddRiddle(riddle);
            session.Save(player);
            DBService.CloseSession(session);
        }

        [Route("RemoveRiddleFromPlayer"), HttpPost]
        public void RemoveRiddleFromPlayer(string playerName, string riddleText)
        {
            var session = DBService.OpenSession();
            Player player = session.Query<Player>().Where(c => c.Name == playerName).Single();
            Riddle riddle = session.Query<Riddle>().Where(c => c.DisplayText == riddleText).Single();
            player.RemoveRiddle(riddle);
            session.Save(player);
            DBService.CloseSession(session);
        }

        [Route("CreatePlayer"), HttpPost]
        public void CreatePlayer(string name, string password)
        {
            var session = DBService.OpenSession();
            Player player = new Player(name, password);
            List<Riddle> allRiddles = GetRiddles().ToList();
            session.Save(player);
            DBService.CloseSession(session);
            foreach (var item in allRiddles)
            {
                AddRiddleToPlayer(player.Name, item.DisplayText);
            }
        }

        [Route("CheckIfUserExists"), HttpGet]
        public bool CheckUser(string playerName)
        {
            var session = DBService.OpenSession();
            var loginPlayer = session.Query<Player>().Where(c => c.Name == playerName).SingleOrDefault();

            if (loginPlayer != null)
            {
                return true;
            }
            else
            {
                DBService.CloseSession(session);
                return false;
            }
        }
    }
}
