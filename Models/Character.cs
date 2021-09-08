namespace DM5K.Models
{
    public class Character
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public CharacterProperties Properties { get; set; }
        public string OwnerName { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public Campaign Campaign { get; set; }
        
    }

    public class CharacterProperties
    {
        public int ID { get; set; }
        public CharacterSize? Size { get; set; }
        public int Height { get; set; }
    }

    public enum CharacterSize
    {
        Small, Medium, Large
    }
}
