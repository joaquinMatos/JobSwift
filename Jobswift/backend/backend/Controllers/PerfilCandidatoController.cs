using back_end.Services.Interfaces;
using Backend.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PerfilCandidatoController : ControllerBase
    {
        private readonly IPerfilCandidatoServices _perfilCandidatoServices;
        private readonly IValidarTokenServices _validarTokenServices;

        public PerfilCandidatoController(IPerfilCandidatoServices perfilCandidatoServices, IValidarTokenServices validarTokenServices)
        {
            _perfilCandidatoServices = perfilCandidatoServices;
            _validarTokenServices = validarTokenServices;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerLista()
        {
            var result = await _perfilCandidatoServices.ObtenerPerfilesCandidato();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPerfilCandidato(int id)
        {
            var result = await _perfilCandidatoServices.ObtenerPerfilCandidato(id);
            if (result.Success)
            {
                return Ok(result.Result);
            }
            else
            {
                return NotFound(result.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromForm] ProfileUploadDTO request)
        {
            var result = await _perfilCandidatoServices.CrearPerfilCandidato(request);
            if (result.Success)
            {
                return CreatedAtAction(nameof(ObtenerPerfilCandidato), new { id = result.Result.IdPerfilCandidato }, result.Result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarPerfilCandidato(int id, [FromForm] ProfileUploadDTO request)
        {
            var response = await _perfilCandidatoServices.ActualizarPerfilCandidato(id, request);
            if (response.Success)
            {
                return Ok(response.Result);
            }
            else
            {
                return BadRequest(response.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarPerfilCandidato(int id)
        {
            // lógica para validar
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
            // fin validación

            var response = await _perfilCandidatoServices.EliminarPerfilCandidato(id);
            if (response.Success)
            {
                return Ok(new
                {
                    success = true,
                    message = "El perfil de candidato se eliminó correctamente",
                    result = response.Result
                });
            }
            else
            {
                return BadRequest(response.Message);
            }
        }
    }
}
