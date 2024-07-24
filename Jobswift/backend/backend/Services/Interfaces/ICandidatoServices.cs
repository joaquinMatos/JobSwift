using Domain.DTO;
using Domain.Entities;
using System.Security.Claims;

namespace back_end.Services.Interfaces
{
    public interface ICandidatoServices
    {
        public  Task<Response<List<Candidato>>> ObtenerCandidatos();
        public Task<Response<List<Candidato>>> ObtenerCandidatos2();
        public Task<Response<Candidato>> ObtenerCandidato(int id);
        public Task<Response<Candidato>> CrearCandidato(CandidatoResponsive request);
        public Task<Response<int>> ActualizarCandidato(int id, CandidatoResponsive request);
        public Task<Response<int>> EliminarCandidato(int id);
        public Task<Candidato> ObtenerCandidatoPorCredenciales(string user, string password);  

    }
}

