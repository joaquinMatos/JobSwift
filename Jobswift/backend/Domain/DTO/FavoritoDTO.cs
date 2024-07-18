using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class FavoritoDTO
    {
        public string TituloOferta { get; set; }
        public string UbicacionOferta { get; set; }
        public bool Urgencia { get; set; }
        public DateTime FechaPublicacion { get; set; }
    }
}
