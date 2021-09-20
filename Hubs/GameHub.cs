using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DM5K.Hubs
{
    public class GameHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ReceiveToastMessage", "Connected to Game Hub!");
            await Clients.Others.SendAsync("ReceiveToastMessage", $"User {Context.User.Identity.Name} has connected!");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Others.SendAsync("ReceiveToastMessage", $"User {Context.User.Identity.Name} has disconnected");
        }

        public async Task SyncDB()
        {
            await Clients.Others.SendAsync("SyncDBCommand");
        }
    }
}
