namespace DM5K.Helpers
{
    public class ZoomEventArgs
    {
        public bool ZoomDirection { get; set; }
        public double StartDistance { get; set; }
        public double NewDistance { get; set; }
        public double ClientX { get; set; }
        public double ClientY { get; set; }
        public bool IsTouchEvent { get; set; }
    }
}
