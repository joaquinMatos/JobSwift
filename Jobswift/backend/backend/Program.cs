using back_end.Context;
using back_end.Services;
using back_end.Services.Interfaces;
using Backend.Services.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddTransient<ICandidatoServices, CandidatoServices>();
builder.Services.AddTransient<IValidarTokenServices, ValidarTokenServices>();
builder.Services.AddTransient<IFavoritoServices, FavoritoServices>();
builder.Services.AddTransient<IOfertaTrabajoServices, OfertaTrabajoServices>();
builder.Services.AddTransient<IPerfilCandidatoServices, PerfilCandidatoServices>();
builder.Services.AddTransient<IReclutadorServices, ReclutadorServices>();
builder.Services.AddTransient<IPostulacionServices, PostulacionServices>();
builder.Services.AddTransient<IPostulacionCandidatosServices, PostulacionCandidatosServices>(); // Añadido

// CORS 
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Origen de tu frontend
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials(); // Permitir credenciales si es necesario
    });
});

// JWT 
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS before any other middleware
app.UseCors("MyPolicy");

app.UseHttpsRedirection();

// Serve static files from wwwroot
app.UseStaticFiles(); // Esto sirve archivos estáticos desde wwwroot

// Serve static files from the 'uploads' folder within wwwroot
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads")),
    RequestPath = "/uploads"
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
