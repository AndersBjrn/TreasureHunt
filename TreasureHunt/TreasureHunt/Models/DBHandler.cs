using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TreasureHunt.Services;
using NHibernate.Tool.hbm2ddl;
using System.IO;

namespace TreasureHunt.Models
{
    public class DBHandler
    {
        public static void CreateDB()
        {
            var cfg = DBService.Configure();
            var export = new SchemaExport(cfg);
            export.Drop(false, true);
            export.Create(true, true);
        }
    }
}
