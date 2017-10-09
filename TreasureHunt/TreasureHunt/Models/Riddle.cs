using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreasureHunt.Models
{
    public class Riddle
    {
        Players = new List<Player>();
    }

    public virtual Guid RiddleID { get; set; }
    public virtual string RiddleText { get; set; }
    public virtual string RiddleAnswer { get; set; }
    public virtual string RiddleType { get; set; }
    
    public virtual ICollection<Player> Players { get; set; }
}