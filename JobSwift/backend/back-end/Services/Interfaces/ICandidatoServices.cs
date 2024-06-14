using Domain.DTO;
using Domain.Entities;

namespace back_end.Services.Interfaces
{
    public interface ICandidatoServices
    {
        public  Task<Response<List<Candidato>>> ObtenerCandidatos();
        public Task<Response<Candidato>> ObtenerCandidato(int id);
        public Task<Response<Candidato>> CrearCandidato(CandidatoResponsive request);
        public Task<Response<int>> ActualizarCandidato(int id, CandidatoResponsive request);
        public Task<Response<int>> EliminarCandidato(int id);
    }
}

