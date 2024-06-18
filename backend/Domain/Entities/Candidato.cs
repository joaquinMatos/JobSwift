using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Candidato
    {
        [Key]
        public int IdCandidato { get; set; }
        public string NombreCompleto { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Contrasena { get; set; }
        public string CodigoP { get; set; }
        public string Ciudad { get; set; }
        public string NTelefonico { get; set; }
        public string Token { get; set; }
    }
}
