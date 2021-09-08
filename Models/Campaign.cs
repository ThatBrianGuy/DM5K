using System.Collections.Generic;

namespace DM5K.Models
{
    public class Campaign
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public ICollection<Character> Characters { get; set; }
        public ICollection<Map> Maps { get; set; }
        public string MasterName { get; set; }
    }
}
