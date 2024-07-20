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
    public class PostulacionCandidatosController : ControllerBase
    {
        private readonly IPostulacionCandidatosServices _postulacionCandidatosServices;
        private readonly IValidarTokenServices _validarTokenServices;

        public PostulacionCandidatosController(IPostulacionCandidatosServices postulacionCandidatosServices, IValidarTokenServices validarTokenServices)
        {
            _postulacionCandidatosServices = postulacionCandidatosServices;
            _validarTokenServices = validarTokenServices;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerLista()
        {
            var result = await _postulacionCandidatosServices.ObtenerPostulacionesCandidatos();
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPostulacionCandidatos(int id)
        {
            var result = await _postulacionCandidatosServices.ObtenerPostulacionCandidatos(id);

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
        public async Task<IActionResult> Crear([FromBody] PostulacionCandidatos request)
        {
            var result = await _postulacionCandidatosServices.CrearPostulacionCandidatos(request);

            if (result.Success)
            {
                return CreatedAtAction(nameof(ObtenerPostulacionCandidatos), new { id = result.Result.IdPostulacion_candidato }, result.Result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarPostulacionCandidatos(int id, [FromBody] PostulacionCandidatos request)
        {
            var response = await _postulacionCandidatosServices.ActualizarPostulacionCandidatos(id, request);

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
        public async Task<IActionResult> EliminarPostulacionCandidatos(int id)
        {
            // Lógica para validar token
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

            // Fin validación
            var response = await _postulacionCandidatosServices.EliminarPostulacionCandidatos(id);

            if (response.Success)
            {
                return Ok(new
                {
                    success = true,
                    message = "La postulación de candidato se eliminó correctamente",
                    result = response
                });
            }
            else
            {
                return BadRequest(response.Message);
            }
        }
    }
}
