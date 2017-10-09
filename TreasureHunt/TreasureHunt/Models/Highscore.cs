using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreasureHunt.Models
{
    public class Highscore
    {
        public Highscore()
        {
            Players = new List<Player>();
        }

        public virtual Guid HighscoreID { get; set; }
        public virtual string Score { get; set; }

        public virtual ICollection<Player> Players { get; set; }

        public virtual void AddPlayer(Player player)
        {
            Players.Add(player);
            player.Highscores.Add(this);
        }
    }

}