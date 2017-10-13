using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreasureHunt.Models
{
    public class Player
    {
        public Player()
        {
            Riddles = new List<Riddle>();
            Highscores = new List<Highscore>();
            Cities = new List<City>();
        }

        public Player(string name, string password)
        {
            Riddles = new List<Riddle>();
            Highscores = new List<Highscore>();
            this.Name = name;
            this.Password = password;
        }

        public virtual Guid PlayerID { get; set; }
        public virtual string Name { get; set; }
        public virtual string Password { get; set; }

        public virtual ICollection<Riddle> Riddles { get; set; }
        public virtual ICollection<Highscore> Highscores { get; set; }
        public virtual ICollection<City> Cities { get; set; }

        public virtual void AddRiddle(Riddle riddle)
        {
            Riddles.Add(riddle);
            riddle.Players.Add(this); 
        }

        public virtual void RemoveRiddle(Riddle riddle)
        {
            Riddles.Remove(riddle);
            riddle.Players.Remove(this);
        }

        public virtual void AddHighscore(Highscore highscore)
        {
            Highscores.Add(highscore);
            highscore.Players.Add(this);
        }

        public virtual void AddCity(City city)
        {
            Cities.Add(city);
            city.Players.Add(this);
        }

        public virtual void RemoveCity(City city)
        {
            Cities.Remove(city);
            city.Players.Remove(this);
        }

    }

}