using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class FavoritoResponsive
    {
        public int Fk_IdCandidato { get; set; }
        public int Fk_IdOfertaTrabajo { get; set; }

    }
}
