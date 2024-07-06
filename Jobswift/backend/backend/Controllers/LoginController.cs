using back_end.Services;
using back_end.Services.Interfaces;
using Backend.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ICandidatoServices _candidatoServices;
        private readonly IValidarTokenServices _validarTokenServices;
        private readonly IReclutadorServices _reclutadorServices;


        public LoginController( IConfiguration configuration, ICandidatoServices candidatoServices, IValidarTokenServices validarTokenServices, IReclutadorServices reclutadorServices)
        {
            _configuration = configuration;
            _candidatoServices = candidatoServices;
            _validarTokenServices = validarTokenServices;
            _reclutadorServices = reclutadorServices;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> IniciarSeccion([FromBody] dynamic opdata)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(opdata.ToString());

            string user = data.Email?.ToString();
            string password = data.Constrasena?.ToString();

            if (string.IsNullOrEmpty(user) || string.IsNullOrEmpty(password))
            {
                return BadRequest(new { success = false, message = "Datos de inicio de sesión no válidos", result = "" });
            }

            Candidato candidato = await _candidatoServices.ObtenerCandidatoPorCredenciales(user, password);
            Reclutador reclutador = null;
            string rol = null;

            if (candidato == null)
            {
                reclutador = await _reclutadorServices.ObtenerReclutadorPorCredenciales(user, password);
                if (reclutador != null)
                {
                    rol = "Reclutador";
                }
            }
            else
            {
                rol = "Candidato";
            }

            if (candidato == null && reclutador == null)
            {
                return Unauthorized(new { success = false, message = "Credenciales incorrectas", result = "" });
            }

            var jwt = _configuration.GetSection("Jwt").Get<JwTResponse>();

            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString())
    };

            if (candidato != null)
            {
                claims.Add(new Claim("id", candidato.IdCandidato.ToString()));
                claims.Add(new Claim("usuario", candidato.NombreCompleto));
                claims.Add(new Claim("rol", "Candidato"));
            }
            else if (reclutador != null)
            {
                claims.Add(new Claim("id", reclutador.IdReclutador.ToString()));
                claims.Add(new Claim("Ncomercial", reclutador.NombreComercial));
                claims.Add(new Claim("rol", "Reclutador"));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                jwt.Issuer,
                jwt.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signIn
            );

            return Ok(new
            {
                success = true,
                message = "exito",
                result = new JwtSecurityTokenHandler().WriteToken(token),
                rol = rol
            });
        }

        [HttpDelete]
         [Route("eliminar")]
         [Authorize]
            public async Task<IActionResult> EliminarFavoritos([FromBody] Candidato candidato)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity == null)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Token no válido",
                        result = ""
                    });
                }

                var rtoken = await _validarTokenServices.ValidarToken(identity);

                if (!rtoken.success)
                {
                    return Unauthorized(rtoken);
                }

                // Lógica para eliminar los favoritos
                // Aquí debes llamar a un método que realice la eliminación, por ejemplo:
                // var resultado = await _candidatoServices.EliminarFavoritos(candidato);

                return Ok(new
                {
                    success = true,
                    message = "Favoritos eliminados correctamente",
                    result = candidato
                });
            }
       
    }
}
