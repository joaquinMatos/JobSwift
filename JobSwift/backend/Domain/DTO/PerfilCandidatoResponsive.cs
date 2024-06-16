using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    internal class PerfilCandidatoResponsive
    {
        public string FotoCandidato { get; set; }
        public string Experiencia { get; set; }
        public string Formacion { get; set; }
        public string Idiomas { get; set; }
        public string Habilidades { get; set; }
        public string CurriculumPerfil { get; set; }
        public int Fk_Candidato { get; set; }

    }
}
