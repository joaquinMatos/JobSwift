using back_end.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FavoritoController : ControllerBase
    {
        private readonly IFavoritoServices _favoritoServices;

        public FavoritoController(IFavoritoServices favoritoServices)
        {
            _favoritoServices = favoritoServices;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerLista()
        {
            var result = await _favoritoServices.ObtenerFavoritos();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerFavorito(int id)
        {
            var result = await _favoritoServices.ObtenerFavorito(id);

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
        public async Task<IActionResult> Crear([FromBody] FavoritoResponsive request)
        {
            var result = await _favoritoServices.CrearFavorito(request);

            if (result.Success)
            {
                return CreatedAtAction(nameof(ObtenerFavorito), new { id = result.Result.IdFavoritos }, result.Result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarFavorito(int id, [FromBody] FavoritoResponsive request)
        {
            var response = await _favoritoServices.ActualizarFavorito(id, request);

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
        public async Task<IActionResult> EliminarFavorito(int id)
        {
            var response = await _favoritoServices.EliminarFavorito(id);

            if (response.Success)
            {
                return Ok(new
                {
                    success = true,
                    message = "El favorito se eliminó correctamente",
                    result = response // Si quieres devolver algún dato adicional sobre la eliminación
                });
            }
            else
            {
                return BadRequest(response.Message);
            }
        }
    }
}
