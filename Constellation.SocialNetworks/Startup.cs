using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Constellation.SocialNetworks.Startup))]
namespace Constellation.SocialNetworks
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
