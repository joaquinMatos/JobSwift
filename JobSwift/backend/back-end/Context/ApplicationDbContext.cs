using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace back_end.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        //Modelos
        public DbSet<Candidato> Candidato { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Funcion Insertar Tabla Candidato
            modelBuilder.Entity<Candidato>().HasData(
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
            );
        }
    }

}
