using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class PostulacionCandidatos
    {
        public int Id { get; set; }
        public int IdPostulacion_candidato { get; set; }
        public int Status { get; set; }
        public int Fk_Candidato { get; set; }
        public int Fk_IdReclutador { get; set; }
    }
}

