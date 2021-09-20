using DM5K.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DM5K.Data
{
    public class DM5KDbContext : DbContext
    {
        public DM5KDbContext(DbContextOptions<DM5KDbContext> options) : base(options) {
        
        }

        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Character> Characters { get; set; }
        public DbSet<CharacterProperties> CharacterProperties { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Icon> Icons { get; set; }
    }

    public static class DbInitializer
    {
        public static void Initialize(DM5KDbContext context)
        {
            context.Database.EnsureCreated();
            
            if (context.Icons.CountAsync().Result == 0)
            {
                // Populate DB with icon names / locations
                context.Icons.Add(new Icon() { Description = "Barbarian", Url = "icons/barbarian.svg" });
                context.Icons.Add(new Icon() { Description = "Brutal Knight", Url = "icons/brutal-helm.svg" });
                context.Icons.Add(new Icon() { Description = "Brute", Url = "icons/barbute.svg" });
                context.Icons.Add(new Icon() { Description = "Cowled Figure", Url = "icons/cowled.svg" });
                context.Icons.Add(new Icon() { Description = "Crowned Skull", Url = "icons/crowned-skull.svg" });
                context.Icons.Add(new Icon() { Description = "Cultist", Url = "icons/cultist.svg" });
                context.Icons.Add(new Icon() { Description = "Diablo Skull", Url = "icons/diablo-skull.svg" });
                context.Icons.Add(new Icon() { Description = "Dragon", Url = "icons/dragon-head.svg" });
                context.Icons.Add(new Icon() { Description = "Dwarf Face", Url = "icons/dwarf-face.svg" });
                context.Icons.Add(new Icon() { Description = "Dwarf Helmet", Url = "icons/dwarf-helmet.svg" });
                context.Icons.Add(new Icon() { Description = "Dwarf King", Url = "icons/dwarf-king.svg" });
                context.Icons.Add(new Icon() { Description = "Elf (Female)", Url = "icons/woman-elf-face.svg" });
                context.Icons.Add(new Icon() { Description = "Elf (Male)", Url = "icons/elf-helmet.svg" });
                context.Icons.Add(new Icon() { Description = "Executioner", Url = "icons/executioner-hood.svg" });
                context.Icons.Add(new Icon() { Description = "Fish Monster", Url = "icons/fish-monster.svg" });
                context.Icons.Add(new Icon() { Description = "Goblin", Url = "icons/goblin-head.svg" });
                context.Icons.Add(new Icon() { Description = "Golem", Url = "icons/golem-head.svg" });
                context.Icons.Add(new Icon() { Description = "Kenku", Url = "icons/kenku-head.svg" });
                context.Icons.Add(new Icon() { Description = "Knight", Url = "icons/visored-helm.svg" });
                context.Icons.Add(new Icon() { Description = "Monk", Url = "icons/monk-face.svg" });
                context.Icons.Add(new Icon() { Description = "Nun", Url = "icons/nun-face.svg" });
                context.Icons.Add(new Icon() { Description = "Ogre", Url = "icons/ogre.svg" });
                context.Icons.Add(new Icon() { Description = "Orc", Url = "icons/orc-head.svg" });
                context.Icons.Add(new Icon() { Description = "Overlord", Url = "icons/overlord-helm.svg" });
                context.Icons.Add(new Icon() { Description = "Troll", Url = "icons/troll.svg" });
                context.Icons.Add(new Icon() { Description = "Vampire Female", Url = "icons/female-vampire.svg" });
                context.Icons.Add(new Icon() { Description = "Vampire Male", Url = "icons/vampire-dracula.svg" });
                context.Icons.Add(new Icon() { Description = "Warlock", Url = "icons/warlock-hood.svg" });
                context.Icons.Add(new Icon() { Description = "Witch", Url = "icons/witch-face.svg" });
                context.Icons.Add(new Icon() { Description = "Wizard", Url = "icons/wizard-face.svg" });
                context.SaveChanges();
            }

            if (context.Campaigns.CountAsync().Result == 0)
            {
                var TestCampaign = new Campaign()
                {
                    Description = "Test Campaign",
                    MasterName = "brian@brian.com",
                    Characters = new List<Character>()
                    {
                        new Character()
                        {
                            Name = "Guy",
                            OwnerName = "brian@brian.com",
                            Url = "http://i.imgur.com/1UrtFFn.png",
                            Properties = new CharacterProperties()
                            {
                                Height = 60,
                                Size = CharacterSize.Medium
                            }
                        },
                        new Character()
                        {
                            Name = "Bob",
                            OwnerName = "brian@brian.com",
                            Url = "http://i.imgur.com/1UrtFFn.png",
                            Properties = new CharacterProperties()
                            {
                                Height = 30,
                                Size = CharacterSize.Small
                            }
                        }
                    },
                    Maps = new List<Map>()
                    {
                        new Map()
                        {
                            Description = "Test Map",
                            Height = 40,
                            Width = 80
                        },
                        new Map()
                        {
                            Description = "Another Map",
                            Height = 20,
                            Width = 40
                        }
                    }
                };

                context.Campaigns.Add(TestCampaign);
                context.SaveChanges();
            }
        }
    }
}
