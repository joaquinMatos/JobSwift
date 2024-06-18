using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Reclutador
    {
        [Key]
        public int IdReclutador {  get; set; }
        public string NombreReclutador { get; set; }
        public string ApellidosReclutador { get; set; }
        public string sector { get; set; }
        public string Email { get; set; }
        public string constrasena { get; set; }
        public string NombreComercial { get; set; }
        public string RazonSocial { get; set; }
        public string CodigoPostal { get; set; }
        public string Ciudad { get; set; }
        public string NumeroTelefonico { get; set; }
        public string RFC { get; set; }
        public string Token { get; set;}
    }
}
