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
            _modelMapper = new ModelMapper();
        }

        public HbmMapping Map()
        {
            MapHighscore();
            MapPlayer();
            MapRiddle();
            MapCity();
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

        private void MapCity()
        {
            _modelMapper.Class<City>(e =>
            {
                e.Id(p => p.CityID, p => p.Generator(Generators.GuidComb));
                e.Property(p => p.CityName);
                e.Property(p => p.Coordinates);


                e.Set(x => x.Players, collectionMapping =>
                {
                    collectionMapping.Table("CitiesPlayers");
                    collectionMapping.Cascade(Cascade.None);
                    collectionMapping.Key(keyMap => keyMap.Column("CityID"));

                }, map => map.ManyToMany(p => p.Column("PlayerID")));
            });
        }

        private void MapHighscore()
        {
            _modelMapper.Class<Highscore>(e =>
            {
                e.Id(p => p.HighscoreID, p => p.Generator(Generators.GuidComb));
                e.Property(p => p.Score);

                e.Set(x => x.Players, collectionMapping =>
                {
                    collectionMapping.Table("HighscoresPlayers");
                    collectionMapping.Cascade(Cascade.None);
                    collectionMapping.Key(keyMap => keyMap.Column("HighscoreID"));

                }, map => map.ManyToMany(p => p.Column("PlayerID")));
            });
        }

        private void MapPlayer()
        {
            _modelMapper.Class<Player>(e =>
            {
                e.Id(p => p.PlayerID, p => p.Generator(Generators.GuidComb));
                e.Property(p => p.Name);
                e.Property(p => p.Password);

                e.Set(x => x.Riddles, collectionMapping =>
                {
                    collectionMapping.Table("RiddlesPlayers");
                    collectionMapping.Inverse(true);   
                    collectionMapping.Cascade(Cascade.None);   
                    collectionMapping.Key(keyMap => keyMap.Column("PlayerID")); 

                }, map => map.ManyToMany(p => p.Column("RiddleID")));

                e.Set(x => x.Cities, collectionMapping =>
                {
                    collectionMapping.Table("CitiesPlayers");
                    collectionMapping.Inverse(true);
                    collectionMapping.Cascade(Cascade.None);
                    collectionMapping.Key(keyMap => keyMap.Column("PlayerID"));

                }, map => map.ManyToMany(p => p.Column("CityID")));

                e.Set(x => x.Highscores, collectionMapping =>
                {
                    collectionMapping.Table("HighscoresPlayers");
                    collectionMapping.Inverse(true);
                    collectionMapping.Cascade(Cascade.None);
                    collectionMapping.Key(keyMap => keyMap.Column("PlayerID"));

                }, map => map.ManyToMany(p => p.Column("HighscoreID")));
            });
        }
    }
}