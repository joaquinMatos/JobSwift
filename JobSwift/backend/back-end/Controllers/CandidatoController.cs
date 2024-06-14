using back_end.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;


namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CandidatoController : ControllerBase
    {
        private readonly ICandidatoServices _candidatoServices;

        public CandidatoController(ICandidatoServices candidatoServices)
        {
            _candidatoServices = candidatoServices;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerLista()
        {
            var result = await _candidatoServices.ObtenerCandidatos();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerCandidato(int id)
        {
            var result = await _candidatoServices.ObtenerCandidato(id);

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
        public async Task<IActionResult> Crear([FromBody] CandidatoResponsive request)
        {
            var result = await _candidatoServices.CrearCandidato(request);

            if (result.Success)
            {
                return CreatedAtAction(nameof(ObtenerCandidato), new { id = result.Result.IdCandidato }, result.Result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarCandidato(int id, [FromBody] CandidatoResponsive request)
        {
            var response = await _candidatoServices.ActualizarCandidato(id, request);

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
        public async Task<IActionResult> EliminarCandidato(int id)
        {
            var response = await _candidatoServices.EliminarCandidato(id);

            if (response.Success)
            {
                return NoContent();
            }
            else
            {
                return BadRequest(response.Message);
            }
        }
    }
}
