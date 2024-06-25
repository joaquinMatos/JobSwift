using back_end.Context;
using back_end.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services
{
    public class ReclutadorServices : IReclutadorServices
    {
        private readonly ApplicationDbContext _context;

        public ReclutadorServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<Reclutador>>> ObtenerReclutadores()
        {
            try
            {
                List<Reclutador> reclutadores = await _context.Reclutador.ToListAsync();
                return new Response<List<Reclutador>>(reclutadores);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener los reclutadores: " + ex.Message);
            }
        }

        public async Task<Response<Reclutador>> ObtenerReclutador(int id)
        {
            try
            {
                Reclutador reclutador = await _context.Reclutador.FirstOrDefaultAsync(x => x.IdReclutador == id);
                if (reclutador == null)
                {
                    return new Response<Reclutador>("Reclutador no encontrado");
                }
                return new Response<Reclutador>(reclutador);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener el reclutador: " + ex.Message);
            }
        }

        public async Task<Response<Reclutador>> CrearReclutador(ReclutadorResponsive request)
        {
            try
            {
                Reclutador reclutador = new Reclutador()
                {
                    NombreReclutador = request.NombreReclutador,
                    ApellidosReclutador = request.ApellidosReclutador,
                    sector = request.sector,
                    Email = request.Email,
                    constrasena = request.constrasena,
                    NombreComercial = request.NombreComercial,
                    RazonSocial = request.RazonSocial,
                    CodigoPostal = request.CodigoPostal,
                    Ciudad = request.Ciudad,
                    NumeroTelefonico = request.NumeroTelefonico,
                    RFC = request.RFC,
                    Token = request.Token
                };

                _context.Reclutador.Add(reclutador);
                await _context.SaveChangesAsync();

                return new Response<Reclutador>(reclutador);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al crear el reclutador: " + ex.Message);
            }
        }

        public async Task<Response<int>> ActualizarReclutador(int id, ReclutadorResponsive request)
        {
            try
            {
                var reclutador = await _context.Reclutador.FindAsync(id);
                if (reclutador == null)
                {
                    return new Response<int>("Reclutador no encontrado");
                }

                reclutador.NombreReclutador = request.NombreReclutador;
                reclutador.ApellidosReclutador = request.ApellidosReclutador;
                reclutador.sector = request.sector;
                reclutador.Email = request.Email;
                reclutador.constrasena = request.constrasena;
                reclutador.NombreComercial = request.NombreComercial;
                reclutador.RazonSocial = request.RazonSocial;
                reclutador.CodigoPostal = request.CodigoPostal;
                reclutador.Ciudad = request.Ciudad;
                reclutador.NumeroTelefonico = request.NumeroTelefonico;
                reclutador.RFC = request.RFC;
                reclutador.Token = request.Token;

                _context.Reclutador.Update(reclutador);
                await _context.SaveChangesAsync();

                return new Response<int>(reclutador.IdReclutador);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar el reclutador: " + ex.Message);
            }
        }

        public async Task<Response<int>> EliminarReclutador(int id)
        {
            try
            {
                var reclutador = await _context.Reclutador.FindAsync(id);
                if (reclutador == null)
                {
                    return new Response<int>("Reclutador no encontrado");
                }

                _context.Reclutador.Remove(reclutador);
                await _context.SaveChangesAsync();

                return new Response<int>(reclutador.IdReclutador);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al eliminar el reclutador: " + ex.Message);
            }
        }
    }
}
