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
    public class PostulacionServices : IPostulacionServices
    {
        private readonly ApplicationDbContext _context;

        public PostulacionServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<Postulacion>>> ObtenerPostulaciones()
        {
            try
            {
                var postulaciones = await _context.Postulacion
                    .Include(p => p.Candidato) // Incluir datos relacionados si es necesario
                    .Include(p => p.OfertaTrabajo)
                    .Include(p => p.Reclutador)
                    .ToListAsync();

                var response = postulaciones.ConvertAll(p => new Postulacion
                {
                    IdPostulacion = p.IdPostulacion,
                    Fk_Candidato = p.Fk_Candidato,
                    Fk_IdOfertaTrabajo = p.Fk_IdOfertaTrabajo,
                    Fk_IdReclutador = p.Fk_IdReclutador,
                    Status = p.Status
                });

                return new Response<List<Postulacion>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener las postulaciones: " + ex.Message);
            }
        }

        public async Task<Response<Postulacion>> ObtenerPostulacion(int id)
        {
            try
            {
                var postulacion = await _context.Postulacion
                    .Include(p => p.Candidato)
                    .Include(p => p.OfertaTrabajo)
                    .Include(p => p.Reclutador)
                    .FirstOrDefaultAsync(p => p.IdPostulacion == id);

                if (postulacion == null)
                {
                    return new Response<Postulacion>("Postulación no encontrada");
                }

                var response = new Postulacion
                {
                    IdPostulacion = postulacion.IdPostulacion,
                    Fk_Candidato = postulacion.Fk_Candidato,
                    Fk_IdOfertaTrabajo = postulacion.Fk_IdOfertaTrabajo,
                    Fk_IdReclutador = postulacion.Fk_IdReclutador,
                    Status = postulacion.Status
                };

                return new Response<Postulacion>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener la postulación: " + ex.Message);
            }
        }

        public async Task<Response<Postulacion>> CrearPostulacion(Postulacion request)
        {
            try
            {
                var postulacion = new Postulacion
                {
                    Fk_Candidato = request.Fk_Candidato,
                    Fk_IdOfertaTrabajo = request.Fk_IdOfertaTrabajo,
                    Fk_IdReclutador = request.Fk_IdReclutador,
                    Status = request.Status
                };

                _context.Postulacion.Add(postulacion);
                await _context.SaveChangesAsync();

                request.IdPostulacion = postulacion.IdPostulacion; // Asignar el ID generado
                return new Response<Postulacion>(request);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al crear la postulación: " + ex.Message);
            }
        }

        public async Task<Response<int>> ActualizarPostulacion(int id, Postulacion request)
        {
            try
            {
                var postulacion = await _context.Postulacion.FindAsync(id);
                if (postulacion == null)
                {
                    return new Response<int>("Postulación no encontrada");
                }

                postulacion.Fk_Candidato = request.Fk_Candidato;
                postulacion.Fk_IdOfertaTrabajo = request.Fk_IdOfertaTrabajo;
                postulacion.Fk_IdReclutador = request.Fk_IdReclutador;
                postulacion.Status = request.Status;

                _context.Postulacion.Update(postulacion);
                await _context.SaveChangesAsync();

                return new Response<int>(postulacion.IdPostulacion);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar la postulación: " + ex.Message);
            }
        }

        public async Task<Response<int>> EliminarPostulacion(int id)
        {
            try
            {
                var postulacion = await _context.Postulacion.FindAsync(id);
                if (postulacion == null)
                {
                    return new Response<int>("Postulación no encontrada");
                }

                _context.Postulacion.Remove(postulacion);
                await _context.SaveChangesAsync();

                return new Response<int>(postulacion.IdPostulacion);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al eliminar la postulación: " + ex.Message);
            }
        }
    }
}
