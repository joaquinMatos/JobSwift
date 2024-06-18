using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    public partial class bdjobswift : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Candidato",
                columns: table => new
                {
                    IdCandidato = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreCompleto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Apellidos = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contrasena = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodigoP = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ciudad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NTelefonico = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidato", x => x.IdCandidato);
                });

            migrationBuilder.CreateTable(
                name: "Reclutador",
                columns: table => new
                {
                    IdReclutador = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreReclutador = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApellidosReclutador = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    constrasena = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NombreComercial = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RazonSocial = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodigoPostal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ciudad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumeroTelefonico = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RFC = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reclutador", x => x.IdReclutador);
                });

            migrationBuilder.CreateTable(
                name: "PerfilCandidato",
                columns: table => new
                {
                    IdPerfilCandidato = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FotoCandidato = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experiencia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Formacion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Idiomas = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Habilidades = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurriculumPerfil = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fk_Candidato = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerfilCandidato", x => x.IdPerfilCandidato);
                    table.ForeignKey(
                        name: "FK_PerfilCandidato_Candidato_Fk_Candidato",
                        column: x => x.Fk_Candidato,
                        principalTable: "Candidato",
                        principalColumn: "IdCandidato",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OfertaTrabajo",
                columns: table => new
                {
                    IdOfertaTrabajo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Urgente = table.Column<bool>(type: "bit", nullable: false),
                    Ubicacion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Jornada = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contrato = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Requerimientos = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experiencia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha_publicacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Fk_IdReclutador = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfertaTrabajo", x => x.IdOfertaTrabajo);
                    table.ForeignKey(
                        name: "FK_OfertaTrabajo_Reclutador_Fk_IdReclutador",
                        column: x => x.Fk_IdReclutador,
                        principalTable: "Reclutador",
                        principalColumn: "IdReclutador",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Favoritos",
                columns: table => new
                {
                    IdFavoritos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fk_IdCandidato = table.Column<int>(type: "int", nullable: false),
                    Fk_IdOfertaTrabajo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favoritos", x => x.IdFavoritos);
                    table.ForeignKey(
                        name: "FK_Favoritos_Candidato_Fk_IdCandidato",
                        column: x => x.Fk_IdCandidato,
                        principalTable: "Candidato",
                        principalColumn: "IdCandidato",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favoritos_OfertaTrabajo_Fk_IdOfertaTrabajo",
                        column: x => x.Fk_IdOfertaTrabajo,
                        principalTable: "OfertaTrabajo",
                        principalColumn: "IdOfertaTrabajo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Candidato",
                columns: new[] { "IdCandidato", "Apellidos", "Ciudad", "CodigoP", "Contrasena", "Email", "NTelefonico", "NombreCompleto", "Token" },
                values: new object[] { 1, "Perez Lopez", "Ciudad de México", "12345", "password123", "juan.perez@example.com", "1234567890", "Juan Perez", "sometoken123" });

            migrationBuilder.InsertData(
                table: "Reclutador",
                columns: new[] { "IdReclutador", "ApellidosReclutador", "Ciudad", "CodigoPostal", "Email", "NombreComercial", "NombreReclutador", "NumeroTelefonico", "RFC", "RazonSocial", "Token", "constrasena", "sector" },
                values: new object[] { 1, "Rodriguez Lopez", "Cancún", "sometoken123", "Sebastian@example.com", "Nubefast", "Jose Sebastian", "9988351623", "TII190214ABC", "Sistemas de la informacion", "sometoken1234", "password12345", "Tecnologia de la informacion(TI)" });

            migrationBuilder.InsertData(
                table: "OfertaTrabajo",
                columns: new[] { "IdOfertaTrabajo", "Contrato", "Descripcion", "Experiencia", "Fecha_publicacion", "Fk_IdReclutador", "Jornada", "Requerimientos", "Salario", "Titulo", "Ubicacion", "Urgente" },
                values: new object[] { 1, "Indefinido", "Se busca desarrollador backend con experiencia en Node.js", "Al menos 3 años en desarrollo backend", new DateTime(2024, 6, 14, 18, 44, 21, 522, DateTimeKind.Utc).AddTicks(9868), 1, "Tiempo completo", "Conocimientos avanzados en Node.js y MongoDB", "$3000 - $4000", "Desarrollador Backend", "Ciudad X", false });

            migrationBuilder.InsertData(
                table: "PerfilCandidato",
                columns: new[] { "IdPerfilCandidato", "CurriculumPerfil", "Experiencia", "Fk_Candidato", "Formacion", "FotoCandidato", "Habilidades", "Idiomas" },
                values: new object[] { 1, "url_del_curriculum.pdf", "5 años en desarrollo web", 1, "Licenciatura en Informática", "url_de_la_foto.jpg", "JavaScript, Node.js, MongoDB", "Inglés avanzado, Español nativo" });

            migrationBuilder.InsertData(
                table: "Favoritos",
                columns: new[] { "IdFavoritos", "Fk_IdCandidato", "Fk_IdOfertaTrabajo" },
                values: new object[] { 1, 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_Fk_IdCandidato",
                table: "Favoritos",
                column: "Fk_IdCandidato");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_Fk_IdOfertaTrabajo",
                table: "Favoritos",
                column: "Fk_IdOfertaTrabajo");

            migrationBuilder.CreateIndex(
                name: "IX_OfertaTrabajo_Fk_IdReclutador",
                table: "OfertaTrabajo",
                column: "Fk_IdReclutador");

            migrationBuilder.CreateIndex(
                name: "IX_PerfilCandidato_Fk_Candidato",
                table: "PerfilCandidato",
                column: "Fk_Candidato");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favoritos");

            migrationBuilder.DropTable(
                name: "PerfilCandidato");

            migrationBuilder.DropTable(
                name: "OfertaTrabajo");

            migrationBuilder.DropTable(
                name: "Candidato");

            migrationBuilder.DropTable(
                name: "Reclutador");
        }
    }
}
