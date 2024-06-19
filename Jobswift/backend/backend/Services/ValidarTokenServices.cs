using back_end.Context;
using back_end.Services.Interfaces;
using Backend.Services.Interfaces;
using System.Security.Claims;

namespace Backend.Services
{
    public class ValidarTokenServices : IValidarTokenServices
    {

        private readonly ApplicationDbContext _context;

        public ValidarTokenServices(ApplicationDbContext context)
        {
            _context = context;

        }

        public async Task<dynamic> ValidarToken(ClaimsIdentity identity)
        {
            try
            {
                if (!identity.Claims.Any())
                {
                    return new
                    {
                        success = false,
                        message = "Verificar tu token",
                        result = ""
                    };
                }

                var idClaim = identity.Claims.FirstOrDefault(x => x.Type == "id");
                if (idClaim == null)
                {
                    return new
                    {
                        success = false,
                        message = "Id claim not found in token",
                        result = ""
                    };
                }

                var id = int.Parse(idClaim.Value);
                // Aquí puedes agregar lógica adicional para validar el id o el token.

                return new
                {
                    success = true,
                    message = "Token válido",
                    result = id
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = "Catch: " + ex.Message,
                    result = ""
                };
            }
        }
    }
}
