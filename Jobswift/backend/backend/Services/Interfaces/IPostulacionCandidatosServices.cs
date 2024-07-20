using Domain.DTO;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services.Interfaces
{
    public interface IPostulacionCandidatosServices
    {
        Task<Response<List<PostulacionCandidatosDTO>>> ObtenerPostulacionesCandidatos();
        Task<Response<PostulacionCandidatos>> ObtenerPostulacionCandidatos(int id);
        Task<Response<PostulacionCandidatos>> CrearPostulacionCandidatos(PostulacionCandidatos request);
        Task<Response<int>> ActualizarPostulacionCandidatos(int id, PostulacionCandidatos request);
        Task<Response<int>> EliminarPostulacionCandidatos(int id);
    }
}
