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
    public class PostulacionController : ControllerBase
    {
        private readonly IPostulacionServices _postulacionServices;
        private readonly IValidarTokenServices _validarTokenServices;

        public PostulacionController(IPostulacionServices postulacionServices, IValidarTokenServices validarTokenServices)
        {
            _postulacionServices = postulacionServices;
            _validarTokenServices = validarTokenServices;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerLista()
        {
            var result = await _postulacionServices.ObtenerPostulaciones();
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
        public async Task<IActionResult> ObtenerPostulacion(int id)
        {
            var result = await _postulacionServices.ObtenerPostulacion(id);

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
        public async Task<IActionResult> Crear([FromBody] Postulacion request)
        {
            var result = await _postulacionServices.CrearPostulacion(request);

            if (result.Success)
            {
                return CreatedAtAction(nameof(ObtenerPostulacion), new { id = result.Result.IdPostulacion }, result.Result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarPostulacion(int id, [FromBody] Postulacion request)
        {
            var response = await _postulacionServices.ActualizarPostulacion(id, request);

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
        public async Task<IActionResult> EliminarPostulacion(int id)
        {
           
            var response = await _postulacionServices.EliminarPostulacion(id);

            if (response.Success)
            {
                return Ok(new
                {
                    success = true,
                    message = "La postulación se eliminó correctamente",
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
