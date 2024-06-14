using Domain.Entities;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
using System.Diagnostics.Contracts;
=======
>>>>>>> 36c71e2e54349876c50dd31a9fe3b96670c57b6a

namespace back_end.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        //Modelos
        public DbSet<Candidato> Candidato { get; set; }
<<<<<<< HEAD
        public DbSet<Reclutador> Reclutador { get; set; }
        public DbSet<OfertaTrabajo> OfertaTrabajo { get; set; }
        public DbSet<Favoritos> Favoritos { get; set; }
        public DbSet<PerfilCandidato> PerfilCandidato { get; set; }
=======
>>>>>>> 36c71e2e54349876c50dd31a9fe3b96670c57b6a

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Funcion Insertar Tabla Candidato
            modelBuilder.Entity<Candidato>().HasData(
<<<<<<< HEAD
                
=======
>>>>>>> 36c71e2e54349876c50dd31a9fe3b96670c57b6a
                new Candidato
                {
                    IdCandidato = 1,
                    NombreCompleto = "Juan Perez",
                    Apellidos = "Perez Lopez",
                    Email = "juan.perez@example.com",
                    Contrasena = "password123",
                    CodigoP = "12345",
                    Ciudad = "Ciudad de México",
                    NTelefonico = "1234567890",
                    Token = "sometoken123"
                }
<<<<<<< HEAD
               
            );

            modelBuilder.Entity<Reclutador>().HasData(

                 new Reclutador
                 {
                     IdReclutador = 1,
                     NombreReclutador = "Jose Sebastian",
                     ApellidosReclutador = "Rodriguez Lopez",
                     sector = "Tecnologia de la informacion(TI)",
                     Email = "Sebastian@example.com",
                     constrasena = "password12345",
                     NombreComercial = "Nubefast",
                     RazonSocial = "Sistemas de la informacion",
                     CodigoPostal = "sometoken123",
                     Ciudad = "Cancún",
                     NumeroTelefonico = "9988351623",
                     RFC = "TII190214ABC",
                     Token = "sometoken1234"
                 }
            );

            modelBuilder.Entity<OfertaTrabajo>().HasData(
                new OfertaTrabajo
                {
                    IdOfertaTrabajo = 1,
                    Titulo= "Desarrollador Backend",
                    Urgente= false,
                    Ubicacion= "Ciudad X",
                    Descripcion= "Se busca desarrollador backend con experiencia en Node.js",
                    Salario= "$3000 - $4000",
                    Jornada= "Tiempo completo",
                    Contrato= "Indefinido",
                    Requerimientos= "Conocimientos avanzados en Node.js y MongoDB",
                    Experiencia= "Al menos 3 años en desarrollo backend",
                    Fecha_publicacion= DateTime.UtcNow,
                    Fk_IdReclutador = 1
                }
            );
            modelBuilder.Entity<PerfilCandidato>().HasData(
                new PerfilCandidato
                {
                    IdPerfilCandidato = 1,
                    FotoCandidato = "url_de_la_foto.jpg",
                    Experiencia = "5 años en desarrollo web",
                    Formacion = "Licenciatura en Informática",
                    Idiomas = "Inglés avanzado, Español nativo",
                    Habilidades = "JavaScript, Node.js, MongoDB",
                    CurriculumPerfil = "url_del_curriculum.pdf",
                    Fk_Candidato = 1
                }
            );


            modelBuilder.Entity<Favoritos>().HasData(
               new Favoritos
               {
                  IdFavoritos = 1,
                  Fk_IdCandidato= 1,
                  Fk_IdOfertaTrabajo = 1
               }
           );
=======
            );
>>>>>>> 36c71e2e54349876c50dd31a9fe3b96670c57b6a
        }
    }

}
