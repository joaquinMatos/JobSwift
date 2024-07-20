using back_end.Context;
using back_end.Services.Interfaces;
using Dapper;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Services
{
    public class PostulacionCandidatosServices : IPostulacionCandidatosServices
    {
        private readonly ApplicationDbContext _context;

        public PostulacionCandidatosServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<PostulacionCandidatosDTO>>> ObtenerPostulacionesCandidatos()
        {
            try
            {
                using (var connection = _context.Database.GetDbConnection())
                {
                    // Asegúrate de que el nombre del SP sea correcto
                    var query = "EXEC spPostulacionCandidatos";
                    var postulacionesCandidatos = await connection.QueryAsync<PostulacionCandidatosDTO>(query);
                    return new Response<List<PostulacionCandidatosDTO>>(postulacionesCandidatos.ToList());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener los detalles de las postulaciones de candidatos: " + ex.Message);
            }
        }

        public async Task<Response<PostulacionCandidatos>> ObtenerPostulacionCandidatos(int id)
        {
            try
            {
                var postulacionCandidatos = await _context.PostulacionCandidatos
                    .FirstOrDefaultAsync(p => p.IdPostulacion_candidato == id);

                if (postulacionCandidatos == null)
                {
                    return new Response<PostulacionCandidatos>("Postulación de candidato no encontrada");
                }

                return new Response<PostulacionCandidatos>(postulacionCandidatos);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener la postulación de candidato: " + ex.Message);
            }
        }

        public async Task<Response<PostulacionCandidatos>> CrearPostulacionCandidatos(PostulacionCandidatos request)
        {
            try
            {
                var postulacionCandidatos = new PostulacionCandidatos
                {
                    Status = request.Status,
                    Fk_Candidato = request.Fk_Candidato,
                    Fk_IdReclutador = request.Fk_IdReclutador
                };

                _context.PostulacionCandidatos.Add(postulacionCandidatos);
                await _context.SaveChangesAsync();

                request.IdPostulacion_candidato = postulacionCandidatos.IdPostulacion_candidato; // Asignar el ID generado
                return new Response<PostulacionCandidatos>(request);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al crear la postulación de candidato: " + ex.Message);
            }
        }

        public async Task<Response<int>> ActualizarPostulacionCandidatos(int id, PostulacionCandidatos request)
        {
            try
            {
                var postulacionCandidatos = await _context.PostulacionCandidatos.FindAsync(id);
                if (postulacionCandidatos == null)
                {
                    return new Response<int>("Postulación de candidato no encontrada");
                }

                postulacionCandidatos.Status = request.Status;
                postulacionCandidatos.Fk_Candidato = request.Fk_Candidato;
                postulacionCandidatos.Fk_IdReclutador = request.Fk_IdReclutador;

                _context.PostulacionCandidatos.Update(postulacionCandidatos);
                await _context.SaveChangesAsync();

                return new Response<int>(postulacionCandidatos.IdPostulacion_candidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar la postulación de candidato: " + ex.Message);
            }
        }

        public async Task<Response<int>> EliminarPostulacionCandidatos(int id)
        {
            try
            {
                var postulacionCandidatos = await _context.PostulacionCandidatos.FindAsync(id);
                if (postulacionCandidatos == null)
                {
                    return new Response<int>("Postulación de candidato no encontrada");
                }

                _context.PostulacionCandidatos.Remove(postulacionCandidatos);
                await _context.SaveChangesAsync();

                return new Response<int>(postulacionCandidatos.IdPostulacion_candidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al eliminar la postulación de candidato: " + ex.Message);
            }
        }
    }
}
