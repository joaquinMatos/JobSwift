using back_end.Context;
using back_end.Services.Interfaces;
using Dapper;
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

        public async Task<Response<List<PostulacionDTO>>> ObtenerPostulaciones()
        {
            try
            {
                using (var connection = _context.Database.GetDbConnection())
                {
                    var query = "EXEC spPostulacionCandidatos";
                    var postulaciones = await connection.QueryAsync<PostulacionDTO>(query);
                    return new Response<List<PostulacionDTO>>(postulaciones.AsList());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener los detalles de las postulaciones: " + ex.Message);
            }
        }


        public async Task<Response<Postulacion>> ObtenerPostulacion(int id)
        {
            try
            {
                var postulacion = await _context.Postulacion
                 
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
