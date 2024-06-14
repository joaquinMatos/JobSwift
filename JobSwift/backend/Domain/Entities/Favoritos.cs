using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Favoritos
    {
        [Key]
        public int IdFavoritos { get; set; }

        [ForeignKey("Candidatos")]
        public int Fk_IdCandidato { get; set; }
        public Candidato Candidatos { get; set; }

        [ForeignKey("OfertaTrabajos")]
        public int Fk_IdOfertaTrabajo { get; set; }
        public OfertaTrabajo OfertaTrabajos { get; set; }

    }
}
