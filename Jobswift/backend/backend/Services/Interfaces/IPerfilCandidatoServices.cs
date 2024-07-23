using Domain.DTO;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services.Interfaces
{
    public interface IPerfilCandidatoServices
    {
        Task<Response<List<PerfilCandidato>>> ObtenerPerfilesCandidato();
        Task<Response<PerfilCandidato>> ObtenerPerfilCandidato(int id);
        Task<Response<PerfilCandidato>> CrearPerfilCandidato(ProfileUploadDTO request);
        Task<Response<int>> ActualizarPerfilCandidato(int id, ProfileUploadDTO request);
        Task<Response<int>> EliminarPerfilCandidato(int id);
    }
}
