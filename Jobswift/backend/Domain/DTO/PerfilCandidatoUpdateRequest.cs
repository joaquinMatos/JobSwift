using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{

    public class PerfilCandidatoUpdateRequest
    {
        public string Experiencia { get; set; }
        public string Formacion { get; set; }
        public string Idiomas { get; set; }
        public string Habilidades { get; set; }
        public IFormFile File { get; set; }
    }


}
