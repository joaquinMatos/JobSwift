using back_end.Context;
using back_end.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Claims;

namespace back_end.Services
{
    public class CandidatoServices : ICandidatoServices
    {
        private readonly ApplicationDbContext _context;

        public CandidatoServices(ApplicationDbContext context)
        {
            _context = context;

        }

        public async Task<Response<List<Candidato>>> ObtenerCandidatos()
        {
            try
            {
                List<Candidato> response = await _context.Candidato.ToListAsync();
                return new Response<List<Candidato>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener los candidatos: " + ex.Message);
            }
        }

        public async Task<Candidato> ObtenerCandidatoPorCredenciales(string user, string password)
        {
            return await _context.Candidato.Where(x => x.Email == user && x.Contrasena == password).FirstOrDefaultAsync();
        }

        public async Task<Response<Candidato>> ObtenerCandidato(int id)
        {
            try
            {
                Candidato candidato = await _context.Candidato.FirstOrDefaultAsync(x => x.IdCandidato == id);
                if (candidato == null)
                {
                    return new Response<Candidato>("Candidato no encontrado");
                }
                return new Response<Candidato>(candidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener el candidato: " + ex.Message);
            }
        }


        public async Task<Response<Candidato>> CrearCandidato(CandidatoResponsive request)
        {
            try
            {
                Candidato candidato = new Candidato()
                {
                    NombreCompleto = request.NombreCompleto,
                    Apellidos = request.Apellidos,
                    Email = request.Email,
                    Contrasena = request.Contrasena,
                    CodigoP = request.CodigoP,
                    Ciudad = request.Ciudad,
                    NTelefonico = request.NTelefonico,
                    Token = request.Token
                };

                _context.Candidato.Add(candidato);
                await _context.SaveChangesAsync();

                return new Response<Candidato>(candidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al crear el candidato: " + ex.Message);
            }
        }

        public async Task<Response<int>> ActualizarCandidato(int id, CandidatoResponsive request)
        {
            try
            {
                var candidato = await _context.Candidato.FindAsync(id);
                if (candidato == null)
                {
                    return new Response<int>("Candidato no encontrado");
                }

                // Solo actualiza los campos que no sean null
                if (!string.IsNullOrEmpty(request.NombreCompleto))
                {
                    candidato.NombreCompleto = request.NombreCompleto;
                }
                if (!string.IsNullOrEmpty(request.Apellidos))
                {
                    candidato.Apellidos = request.Apellidos;
                }
                if (!string.IsNullOrEmpty(request.Email))
                {
                    candidato.Email = request.Email;
                }
                if (!string.IsNullOrEmpty(request.Contrasena))
                {
                    candidato.Contrasena = request.Contrasena;
                }
                if (!string.IsNullOrEmpty(request.CodigoP))
                {
                    candidato.CodigoP = request.CodigoP;
                }
                if (!string.IsNullOrEmpty(request.Ciudad))
                {
                    candidato.Ciudad = request.Ciudad;
                }
                if (!string.IsNullOrEmpty(request.NTelefonico))
                {
                    candidato.NTelefonico = request.NTelefonico;
                }
                if (!string.IsNullOrEmpty(request.Token))
                {
                    candidato.Token = request.Token;
                }

                _context.Candidato.Update(candidato);
                await _context.SaveChangesAsync();

                return new Response<int>(candidato.IdCandidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar el candidato: " + ex.Message);
            }
        }



        public async Task<Response<int>> EliminarCandidato(int id)
        {
            try
            {
                var candidato = await _context.Candidato.FindAsync(id);
                if (candidato == null)
                {
                    return new Response<int>("Candidato no encontrado");
                }

                _context.Candidato.Remove(candidato);
                await _context.SaveChangesAsync();

                return new Response<int>(candidato.IdCandidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al eliminar el candidato: " + ex.Message);
            }
        }

    }
}