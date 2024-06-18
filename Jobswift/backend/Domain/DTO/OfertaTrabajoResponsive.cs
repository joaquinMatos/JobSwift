using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class OfertaTrabajoResponsive
    {
        public string Titulo { get; set; }
        public bool Urgente { get; set; }
        public string Ubicacion { get; set; }
        public string Descripcion { get; set; }
        public string Salario { get; set; }
        public string Jornada { get; set; }
        public string Contrato { get; set; }
        public string Requerimientos { get; set; }
        public string Experiencia { get; set; }
        public DateTime Fecha_publicacion { get; set; }
        public int Fk_IdReclutador { get; set; }

    }
}
