using back_end.Services.Interfaces;
using Backend.Services;
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
    public class OfertaTrabajoController : ControllerBase
    {
        private readonly IOfertaTrabajoServices _ofertaTrabajoServices;
        private readonly IValidarTokenServices _validarTokenServices;

        public OfertaTrabajoController(IOfertaTrabajoServices ofertaTrabajoServices, IValidarTokenServices validarTokenServices)
        {
            _ofertaTrabajoServices = ofertaTrabajoServices;
            _validarTokenServices = validarTokenServices;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerLista()
        {

            var result = await _ofertaTrabajoServices.ObtenerOfertasTrabajo();
            return Ok(result);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerOfertaTrabajo(int id)
        {
            var result = await _ofertaTrabajoServices.ObtenerOfertaTrabajo(id);
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
        public async Task<IActionResult> Crear([FromBody] OfertaTrabajoResponsive request)
        {
            var result = await _ofertaTrabajoServices.CrearOfertaTrabajo(request);
            if (result.Success)
            {
                return CreatedAtAction(nameof(ObtenerOfertaTrabajo), new { id = result.Result.IdOfertaTrabajo }, result.Result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarOfertaTrabajo(int id, [FromBody] OfertaTrabajoResponsive request)
        {
            var response = await _ofertaTrabajoServices.ActualizarOfertaTrabajo(id, request);
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
        public async Task<IActionResult> EliminarOfertaTrabajo(int id)
        {

            var response = await _ofertaTrabajoServices.EliminarOfertaTrabajo(id);
            if (response.Success)
            {
                return Ok(new
                {
                    success = true,
                    message = "La oferta de trabajo se eliminó correctamente",
                    result = response.Result // Si quieres devolver algún dato adicional sobre la eliminación
                });
            }
            else
            {
                return BadRequest(response.Message);
            }
        }
    }
}
