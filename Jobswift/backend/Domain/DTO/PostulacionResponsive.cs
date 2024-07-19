using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class PostulacionResponsive
    {
        public int IdPostulacion { get; set; }
        public int Fk_Candidato { get; set; }
        public int Fk_IdOfertaTrabajo { get; set; }
        public int Fk_IdReclutador { get; set; }
        public int Status { get; set; }
        public string NombreCandidato { get; set; }  // Opcional: nombre del candidato
        public string TituloOferta { get; set; }     // Opcional: título de la oferta de trabajo
        public string NombreReclutador { get; set; } // Opcional: nombre del reclutador
    }
}
