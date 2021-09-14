namespace DM5K.Helpers
{
    public class CanvasEventArgs
    {
        public double ClientX { get; set; }
        public double ClientY { get; set; }
        public double DeltaX { get; set; }
        public double DeltaY { get; set; }
        public double StartX { get; set; }
        public double StartY { get; set; }
        public bool IsTouchEvent { get; set; }
    }
}
