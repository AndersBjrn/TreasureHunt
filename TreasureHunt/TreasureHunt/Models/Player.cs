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

        public virtual void AddRiddle(Riddle riddle)
        {
            Riddles.Add(riddle);
            riddle.Players.Add(this); 
        }

        public virtual void AddHighscore(Highscore highscore)
        {
            Highscores.Add(highscore);
            highscore.Players.Add(this);
        }

    }

}