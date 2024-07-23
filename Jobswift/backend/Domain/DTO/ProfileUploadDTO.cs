using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{

    public class ProfileUploadDTO
    {
        public IFormFile FotoCandidato { get; set; }
        public IFormFile CurriculumPerfil { get; set; }
        public string Experiencia { get; set; }
        public string Formacion { get; set; }
        public string Idiomas { get; set; }
        public string Habilidades { get; set; }
        public int Fk_Candidato { get; set; }
    }



}
