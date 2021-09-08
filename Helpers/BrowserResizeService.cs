using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace DM5K.Helpers
{
    public class BrowserResizeService
    {
        public static event Func<Task> OnResize;
     
        [JSInvokable]
        public static async Task OnBrowserResize()
        {
            await OnResize?.Invoke();
        }
    }    
}
