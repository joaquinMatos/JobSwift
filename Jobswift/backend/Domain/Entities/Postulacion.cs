using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Postulacion
    {
        [Key]
        public int IdPostulacion { get; set; }

        [ForeignKey("Candidato")]
        public int Fk_Candidato { get; set; }
        public virtual Candidato Candidato { get; set; }

        [ForeignKey("OfertaTrabajo")]
        public int Fk_IdOfertaTrabajo { get; set; }
        public virtual OfertaTrabajo OfertaTrabajo { get; set; }

        [ForeignKey("Reclutador")]
        public int Fk_IdReclutador { get; set; }
        public virtual Reclutador Reclutador { get; set; }

        public int Status { get; set; }
    }
}
