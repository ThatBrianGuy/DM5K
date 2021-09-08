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
    }

    public static class DbInitializer
    {
        public static void Initialize(DM5KDbContext context)
        {
            context.Database.EnsureCreated();
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
                            Properties = new CharacterProperties()
                            {
                                Height = 60,
                                Size = CharacterSize.Medium
                            }
                        },
                        new Character()
                        {
                            Name = "Thomas",
                            OwnerName = "brian@brian.com",
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
