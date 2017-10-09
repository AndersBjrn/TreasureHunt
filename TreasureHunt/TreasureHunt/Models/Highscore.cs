using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreasureHunt.Models
{
    public class Highscore
    {
        Players = new List<Player>();
    }

    public virtual Guid HighscoreID { get; set; }
    public virtual string HighscoreValue { get; set; }

    public virtual ICollection<Player> Players { get; set; }
}