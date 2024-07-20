using Domain.DTO;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services.Interfaces
{
    public interface IPostulacionServices
    {
        // Método para obtener una lista de todas las postulaciones
        Task<Response<List<PostulacionDTO>>> ObtenerPostulaciones();

        // Método para obtener una postulación por ID
        Task<Response<Postulacion>> ObtenerPostulacion(int id);

        // Método para crear una nueva postulación
        Task<Response<Postulacion>> CrearPostulacion(Postulacion request);

        // Método para actualizar una postulación existente por ID
        Task<Response<int>> ActualizarPostulacion(int id, Postulacion request);

        // Método para eliminar una postulación por ID
        Task<Response<int>> EliminarPostulacion(int id);
    }
}
