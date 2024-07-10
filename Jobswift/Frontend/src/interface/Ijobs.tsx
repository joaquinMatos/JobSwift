export interface OfertaTrabajo {
    idOfertaTrabajo: number;
    titulo: string;
    urgente: boolean;
    ubicacion: string;
    descripcion: string;
    salario: string;
    jornada: string;
    contrato: string;
    requerimientos: string;
    experiencia: string;
    fecha_publicacion: string;
    fk_IdReclutador: number;
    reclutadores: any;
}