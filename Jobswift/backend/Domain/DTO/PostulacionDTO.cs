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
        public int Status { get; set; }
        public string NombreCandidato { get; set; }
        public string NombreOfertaTrabajo { get; set; }
        public string NombreReclutador { get; set; }
    }
}
