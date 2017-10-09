using NHibernate.Cfg.MappingSchema;
using NHibernate.Mapping.ByCode;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TreasureHunt.Models;

namespace TreasureHunt.Mapping
{
    public class NHibernateMapper
    {
        private readonly ModelMapper _modelMapper;

        public NHibernateMapper()
        {
            MapPlayer();
            MapRiddle();
            _modelMapper = new ModelMapper();
        }

        public HbmMapping Map()
        {
            return _modelMapper.CompileMappingForAllExplicitlyAddedEntities();
        }

        private void MapRiddle()
        {
            _modelMapper.Class<Riddle>(e =>
            {
                e.Id(p => p.RiddleID, p => p.Generator(Generators.GuidComb));
                e.Property(p => p.Answer);
                e.Property(p => p.DisplayText);
                e.Property(p => p.Type);

                e.Set(x => x.Players, collectionMapping =>
                {
                    collectionMapping.Table("RiddlesPlayers");
                    collectionMapping.Cascade(Cascade.None);
                    collectionMapping.Key(keyMap => keyMap.Column("RiddleID")); 

                }, map => map.ManyToMany(p => p.Column("PlayerID"))); 
            });
        }

        private void MapPlayer()
        {
            _modelMapper.Class<Player>(e =>
            {
                e.Id(p => p.PlayerID, p => p.Generator(Generators.GuidComb));
                e.Property(p => p.Name);
                e.Property(p => p.Email);

                e.Set(x => x.Riddles, collectionMapping =>
                {
                    collectionMapping.Table("RiddlesPlayers");
                    collectionMapping.Inverse(true);   
                    collectionMapping.Cascade(Cascade.None);   
                    collectionMapping.Key(keyMap => keyMap.Column("PlayerID")); 

                }, map => map.ManyToMany(p => p.Column("RiddleID")));
            });
        }
    }
}