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
    public class FavoritoServices : IFavoritoServices
    {
        private readonly ApplicationDbContext _context;

        public FavoritoServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<Favoritos>>> ObtenerFavoritos()
        {
            try
            {
                List<Favoritos> response = await _context.Favoritos.ToListAsync();
                return new Response<List<Favoritos>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener los favoritos: " + ex.Message);
            }
        }

        public async Task<Response<Favoritos>> ObtenerFavorito(int id)
        {
            try
            {
                Favoritos favorito = await _context.Favoritos.FirstOrDefaultAsync(x => x.IdFavoritos == id);
                if (favorito == null)
                {
                    return new Response<Favoritos>("Favorito no encontrado");
                }
                return new Response<Favoritos>(favorito);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener el favorito: " + ex.Message);
            }
        }

        public async Task<Response<Favoritos>> CrearFavorito(FavoritoResponsive request)
        {
            try
            {
                Favoritos favorito = new Favoritos()
                {
                    Fk_IdCandidato = request.Fk_IdCandidato,
                    Fk_IdOfertaTrabajo = request.Fk_IdOfertaTrabajo
                };

                _context.Favoritos.Add(favorito);
                await _context.SaveChangesAsync();

                return new Response<Favoritos>(favorito);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al crear el favorito: " + ex.Message);
            }
        }

        public async Task<Response<int>> ActualizarFavorito(int id, FavoritoResponsive request)
        {
            try
            {
                var favorito = await _context.Favoritos.FindAsync(id);
                if (favorito == null)
                {
                    return new Response<int>("Favorito no encontrado");
                }

                favorito.Fk_IdCandidato = request.Fk_IdCandidato;
                favorito.Fk_IdOfertaTrabajo = request.Fk_IdOfertaTrabajo;

                _context.Favoritos.Update(favorito);
                await _context.SaveChangesAsync();

                return new Response<int>(favorito.IdFavoritos);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar el favorito: " + ex.Message);
            }
        }

        public async Task<Response<int>> EliminarFavorito(int id)
        {
            try
            {
                var favorito = await _context.Favoritos.FindAsync(id);
                if (favorito == null)
                {
                    return new Response<int>("Favorito no encontrado");
                }

                _context.Favoritos.Remove(favorito);
                await _context.SaveChangesAsync();

                return new Response<int>(favorito.IdFavoritos);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al eliminar el favorito: " + ex.Message);
            }
        }
    }
}
