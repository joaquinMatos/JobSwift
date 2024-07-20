using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class PostulacionCandidatosDTO
    {
        public int IdPostulacion_candidato { get; set; }
        public int Status { get; set; }
        public string NombreCandidato { get; set; }
        public string NombreReclutador { get; set; }
    }
}
