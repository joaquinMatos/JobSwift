using Domain.DTO;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services.Interfaces
{
    public interface IOfertaTrabajoServices
    {
        Task<Response<List<OfertaTrabajo>>> ObtenerOfertasTrabajo();
        Task<Response<OfertaTrabajo>> ObtenerOfertaTrabajo(int id);
        Task<Response<OfertaTrabajo>> CrearOfertaTrabajo(OfertaTrabajoResponsive request);
        Task<Response<int>> ActualizarOfertaTrabajo(int id, OfertaTrabajoResponsive request);
        Task<Response<int>> EliminarOfertaTrabajo(int id);
    }
}
