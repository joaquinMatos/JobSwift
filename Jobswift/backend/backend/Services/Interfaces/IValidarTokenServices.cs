using System.Security.Claims;

namespace Backend.Services.Interfaces
{
    public interface IValidarTokenServices
    {
        public Task<dynamic> ValidarToken(ClaimsIdentity identity);
    }
}
