﻿using back_end.Services.Interfaces;
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
    public class ReclutadorController : ControllerBase
    {
        private readonly IReclutadorServices _reclutadorServices;
        private readonly IValidarTokenServices _validarTokenServices;

        public ReclutadorController(IReclutadorServices reclutadorServices, IValidarTokenServices validarTokenServices)
        {
            _reclutadorServices = reclutadorServices;
            _validarTokenServices = validarTokenServices;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerLista()
        {
            var result = await _reclutadorServices.ObtenerReclutadores();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerReclutador(int id)
        {
            var result = await _reclutadorServices.ObtenerReclutador(id);
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
        public async Task<IActionResult> Crear([FromBody] ReclutadorResponsive request)
        {
            var result = await _reclutadorServices.CrearReclutador(request);
            if (result.Success)
            {
                return CreatedAtAction(nameof(ObtenerReclutador), new { id = result.Result.IdReclutador }, result.Result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarReclutador(int id, [FromBody] ReclutadorResponsive request)
        {
            var response = await _reclutadorServices.ActualizarReclutador(id, request);
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
        public async Task<IActionResult> EliminarReclutador(int id)
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

            var response = await _reclutadorServices.EliminarReclutador(id);
            if (response.Success)
            {
                return Ok(new
                {
                    success = true,
                    message = "El reclutador se eliminó correctamente",
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