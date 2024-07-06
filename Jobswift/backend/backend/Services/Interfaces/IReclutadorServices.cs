using Domain.DTO;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services.Interfaces
{
    public interface IReclutadorServices
    {
        Task<Response<List<Reclutador>>> ObtenerReclutadores();
        Task<Response<Reclutador>> ObtenerReclutador(int id);
        Task<Response<Reclutador>> CrearReclutador(ReclutadorResponsive request);
        Task<Response<int>> ActualizarReclutador(int id, ReclutadorResponsive request);
        Task<Response<int>> EliminarReclutador(int id);
        Task<Reclutador> ObtenerReclutadorPorCredenciales(string user, string password);
    }
}
