using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreasureHunt.Models
{
    public class City
    {
        public City()
        {
            Players = new List<Player>();
        }

        public virtual Guid CityID { get; set; }
        public virtual string CityName { get; set; }
        public virtual string Coordinates { get; set; }        

        public virtual ICollection<Player> Players { get; set; }

        public virtual void AddPlayer(Player player)
        {
            Players.Add(player);
            player.City.Add(this);
        }

    }
}