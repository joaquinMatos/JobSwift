using Domain.DTO;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services.Interfaces
{
    public interface IFavoritoServices
    {
        Task<Response<List<FavoritoDTO>>> ObtenerFavoritos();
        Task<Response<Favoritos>> ObtenerFavorito(int id);
        Task<Response<Favoritos>> CrearFavorito(FavoritoResponsive request);
        Task<Response<int>> ActualizarFavorito(int id, FavoritoResponsive request);
        Task<Response<int>> EliminarFavorito(int id);
    }
}
