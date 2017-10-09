using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreasureHunt.Models
{
    public class Players
    {
        Riddles = new List<Riddle>();
        Highscores = new List<Highscore>();

    }

    public virtual Guid PlayerID { get; set; }
    public virtual string PlayerName { get; set; }
    public virtual string PlayerEmail { get; set; }    
    
    public virtual ICollection<Riddle> Riddles { get; set; }
    public virtual ICollection<Highscore> Highscores { get; set; }
}