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
    public class PerfilCandidatoServices : IPerfilCandidatoServices
    {
        private readonly ApplicationDbContext _context;

        public PerfilCandidatoServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<PerfilCandidato>>> ObtenerPerfilesCandidato()
        {
            try
            {
                List<PerfilCandidato> response = await _context.PerfilCandidato.ToListAsync();
                return new Response<List<PerfilCandidato>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener los perfiles de candidato: " + ex.Message);
            }
        }

        public async Task<Response<PerfilCandidato>> ObtenerPerfilCandidato(int id)
        {
            try
            {
                PerfilCandidato perfil = await _context.PerfilCandidato.FirstOrDefaultAsync(x => x.Fk_Candidato == id);
                if (perfil == null)
                {
                    return new Response<PerfilCandidato>("Perfil de candidato no encontrado");
                }
                return new Response<PerfilCandidato>(perfil);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener el perfil de candidato: " + ex.Message);
            }
        }

        public async Task<Response<PerfilCandidato>> CrearPerfilCandidato(PerfilCandidatoResponsive request)
        {
            try
            {
                PerfilCandidato perfil = new PerfilCandidato()
                {
                    FotoCandidato = request.FotoCandidato,
                    Experiencia = request.Experiencia,
                    Formacion = request.Formacion,
                    Idiomas = request.Idiomas,
                    Habilidades = request.Habilidades,
                    CurriculumPerfil = request.CurriculumPerfil,
                    Fk_Candidato = request.Fk_Candidato
                };

                _context.PerfilCandidato.Add(perfil);
                await _context.SaveChangesAsync();

                return new Response<PerfilCandidato>(perfil);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al crear el perfil de candidato: " + ex.Message);
            }
        }

        public async Task<Response<int>> ActualizarPerfilCandidato(int id, PerfilCandidatoResponsive request)
        {
            try
            {
                var perfil = await _context.PerfilCandidato.FindAsync(id);
                if (perfil == null)
                {
                    return new Response<int>("Perfil de candidato no encontrado");
                }

                perfil.FotoCandidato = request.FotoCandidato;
                perfil.Experiencia = request.Experiencia;
                perfil.Formacion = request.Formacion;
                perfil.Idiomas = request.Idiomas;
                perfil.Habilidades = request.Habilidades;
                perfil.CurriculumPerfil = request.CurriculumPerfil;
                perfil.Fk_Candidato = request.Fk_Candidato;

                _context.PerfilCandidato.Update(perfil);
                await _context.SaveChangesAsync();

                return new Response<int>(perfil.IdPerfilCandidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar el perfil de candidato: " + ex.Message);
            }
        }

        public async Task<Response<int>> EliminarPerfilCandidato(int id)
        {
            try
            {
                var perfil = await _context.PerfilCandidato.FindAsync(id);
                if (perfil == null)
                {
                    return new Response<int>("Perfil de candidato no encontrado");
                }

                _context.PerfilCandidato.Remove(perfil);
                await _context.SaveChangesAsync();

                return new Response<int>(perfil.IdPerfilCandidato);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al eliminar el perfil de candidato: " + ex.Message);
            }
        }
    }
}
