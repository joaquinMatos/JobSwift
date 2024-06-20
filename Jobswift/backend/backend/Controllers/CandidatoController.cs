﻿using back_end.Services.Interfaces;
using Backend.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CandidatoController : ControllerBase
    {
        private readonly ICandidatoServices _candidatoServices;

        private readonly IValidarTokenServices _ValidarTokenServices;


        public CandidatoController(ICandidatoServices candidatoServices, IValidarTokenServices ValidarTokenServices)
        {
            _candidatoServices = candidatoServices;

            _ValidarTokenServices = ValidarTokenServices;
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

            // logica para validar

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

            var rtoken = await _ValidarTokenServices.ValidarToken(identity);

            if (!rtoken.success)
            {
                return Unauthorized(rtoken);
            }

            // fin validacion

            var response = await _candidatoServices.EliminarCandidato(id);

            if (response.Success)
            {
                // Devolver un mensaje personalizado indicando que se eliminó correctamente
                return Ok(new
                {
                    success = true,
                    message = "El candidato se eliminó correctamente",
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