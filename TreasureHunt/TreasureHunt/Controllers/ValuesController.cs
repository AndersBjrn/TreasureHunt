using NHibernate.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TreasureHunt.Models;
using TreasureHunt.Services;

namespace TreasureHunt.Controllers
{
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

        [Route("InsertRiddle"), HttpPost]
        public void InsertRiddleIntoDB(Riddle riddle)
        {
            var session = DBService.OpenSession();
            session.Save(riddle);
            DBService.CloseSession(session);
        }

        //private static string FormatString(string nameString)
        //{
        //    List<char> charList = new List<char>();

        //    for (int i = 0; i < nameString.Length; i++)
        //    {
        //        if (i == 0)
        //        {
        //            charList[0] = nameString.ToUpper()[0];
        //        }
        //        else if (i > 0)
        //        {
        //            charList[i] = nameString.ToLower()[i];
        //        }
        //    }
        //    return charList.ToString();
        //}
    }
}
