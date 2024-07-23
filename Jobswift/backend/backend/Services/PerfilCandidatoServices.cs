using back_end.Context;
using back_end.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
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

        public async Task<Response<PerfilCandidato>> CrearPerfilCandidato(ProfileUploadDTO request)
        {
            try
            {
                var fotoCandidatoPath = await SaveFile(request.FotoCandidato);
                var curriculumPerfilPath = await SaveFile(request.CurriculumPerfil);

                PerfilCandidato perfil = new PerfilCandidato()
                {
                    FotoCandidato = fotoCandidatoPath,
                    Experiencia = request.Experiencia,
                    Formacion = request.Formacion,
                    Idiomas = request.Idiomas,
                    Habilidades = request.Habilidades,
                    CurriculumPerfil = curriculumPerfilPath,
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

        public async Task<Response<int>> ActualizarPerfilCandidato(int id, ProfileUploadDTO request)
        {
            try
            {
                var perfil = await _context.PerfilCandidato.FindAsync(id);
                if (perfil == null)
                {
                    return new Response<int>("Perfil de candidato no encontrado");
                }

                // Solo actualiza los campos de archivo si se proporciona un nuevo archivo
                if (request.FotoCandidato != null && request.FotoCandidato.Length > 0)
                {
                    perfil.FotoCandidato = await SaveFile(request.FotoCandidato);
                }

                if (request.CurriculumPerfil != null && request.CurriculumPerfil.Length > 0)
                {
                    perfil.CurriculumPerfil = await SaveFile(request.CurriculumPerfil);
                }

                // Actualiza otros campos
                perfil.Experiencia = request.Experiencia ?? perfil.Experiencia;
                perfil.Formacion = request.Formacion ?? perfil.Formacion;
                perfil.Idiomas = request.Idiomas ?? perfil.Idiomas;
                perfil.Habilidades = request.Habilidades ?? perfil.Habilidades;
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

        // Método SaveFile agregado aquí
        private async Task<string> SaveFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null; // O puede lanzar una excepción si es necesario
            }

            var fileName = Path.GetFileName(file.FileName);
            var path = Path.Combine("wwwroot", "uploads", fileName);

            // Asegúrate de que el directorio existe
            Directory.CreateDirectory(Path.GetDirectoryName(path));

            using (var stream = new FileStream(path, FileMode.Create, FileAccess.Write))
            {
                await file.CopyToAsync(stream);
            }

            return $"/uploads/{fileName}"; // Retorna la ruta relativa
        }
    }
}
