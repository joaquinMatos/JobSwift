using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PerfilCandidato
    {
        [Key]
        public int IdPerfilCandidato { get; set; }

        public string FotoCandidato { get; set; }
        public string Experiencia { get; set; }
        public string Formacion { get; set; }
        public string Idiomas { get; set; }
        public string Habilidades { get; set; }
        public string CurriculumPerfil { get; set; }
        public int Fk_Candidato { get; set; }
    }

}
