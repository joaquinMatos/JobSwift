using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class PostulacionDTO
    {
        public int IdPostulacion { get; set; }
        public int Fk_IdOfertaTrabajo { get; set; }
        public int Status { get; set; }
        public string Email { get; set; }
        public string NTelefonico { get; set; }
        public string Apellidos { get; set; }
        public string NombreCompleto { get; set; }
        public string Ciudad { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public string Experiencia { get; set; } // Cambiado a string
        public string Contrato { get; set; }
        public string Salario { get; set; }
        public string Titulo { get; set; }
    }
}