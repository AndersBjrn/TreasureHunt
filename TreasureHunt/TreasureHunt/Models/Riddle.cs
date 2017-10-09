using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreasureHunt.Models
{
    public class Riddle
    {
        public Riddle()
        {
            Players = new List<Player>();
        }

        public virtual Guid RiddleID { get; set; }
        public virtual string DisplayText { get; set; }
        public virtual string Answer { get; set; }
        public virtual string Type { get; set; }

        public virtual ICollection<Player> Players { get; set; }
    }

}