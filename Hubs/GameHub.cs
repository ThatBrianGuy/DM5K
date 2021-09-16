using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace DM5K.Hubs
{
    public class GameHub : Hub
    {
        public async Task SyncDB()
        {
            await Clients.Others.SendAsync("SyncDBCommand");
        }
    }
}
