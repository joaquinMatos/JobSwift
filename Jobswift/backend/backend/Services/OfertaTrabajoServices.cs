using back_end.Context;
using back_end.Services.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Services
{
    public class OfertaTrabajoServices : IOfertaTrabajoServices
    {
        private readonly ApplicationDbContext _context;

        public OfertaTrabajoServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<OfertaTrabajo>>> ObtenerOfertasTrabajo()
        {
            try
            {
                List<OfertaTrabajo> response = await _context.OfertaTrabajo.ToListAsync();
                return new Response<List<OfertaTrabajo>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener las ofertas de trabajo: " + ex.Message);
            }
        }

        public async Task<Response<OfertaTrabajo>> ObtenerOfertaTrabajo(int id)
        {
            try
            {
                OfertaTrabajo oferta = await _context.OfertaTrabajo.FirstOrDefaultAsync(x => x.Fk_IdReclutador == id);
                if (oferta == null)
                {
                    return new Response<OfertaTrabajo>("Oferta de trabajo no encontrada");
                }
                return new Response<OfertaTrabajo>(oferta);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener la oferta de trabajo: " + ex.Message);
            }
        }

        public async Task<Response<OfertaTrabajo>> CrearOfertaTrabajo(OfertaTrabajoResponsive request)
        {
            try
            {
                OfertaTrabajo oferta = new OfertaTrabajo()
                {
                    Titulo = request.Titulo,
                    Urgente = request.Urgente,
                    Ubicacion = request.Ubicacion,
                    Descripcion = request.Descripcion,
                    Salario = request.Salario,
                    Jornada = request.Jornada,
                    Contrato = request.Contrato,
                    Requerimientos = request.Requerimientos,
                    Experiencia = request.Experiencia,
                    Fecha_publicacion = request.Fecha_publicacion,
                    Fk_IdReclutador = request.Fk_IdReclutador
                };

                _context.OfertaTrabajo.Add(oferta);
                await _context.SaveChangesAsync();

                return new Response<OfertaTrabajo>(oferta);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al crear la oferta de trabajo: " + ex.Message);
            }
        }

        public async Task<Response<int>> ActualizarOfertaTrabajo(int id, OfertaTrabajoResponsive request)
        {
            try
            {
                var oferta = await _context.OfertaTrabajo.FindAsync(id);
                if (oferta == null)
                {
                    return new Response<int>("Oferta de trabajo no encontrada");
                }

                oferta.Titulo = request.Titulo;
                oferta.Urgente = request.Urgente;
                oferta.Ubicacion = request.Ubicacion;
                oferta.Descripcion = request.Descripcion;
                oferta.Salario = request.Salario;
                oferta.Jornada = request.Jornada;
                oferta.Contrato = request.Contrato;
                oferta.Requerimientos = request.Requerimientos;
                oferta.Experiencia = request.Experiencia;
                oferta.Fecha_publicacion = request.Fecha_publicacion;
                oferta.Fk_IdReclutador = request.Fk_IdReclutador;

                _context.OfertaTrabajo.Update(oferta);
                await _context.SaveChangesAsync();

                return new Response<int>(oferta.IdOfertaTrabajo);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar la oferta de trabajo: " + ex.Message);
            }
        }

        public async Task<Response<int>> EliminarOfertaTrabajo(int id)
        {
            try
            {
                var oferta = await _context.OfertaTrabajo.FindAsync(id);
                if (oferta == null)
                {
                    return new Response<int>("Oferta de trabajo no encontrada");
                }

                _context.OfertaTrabajo.Remove(oferta);
                await _context.SaveChangesAsync();

                return new Response<int>(oferta.IdOfertaTrabajo);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al eliminar la oferta de trabajo: " + ex.Message);
            }
        }
    }
}
