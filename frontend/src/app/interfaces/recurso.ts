
export interface Recurso {
  id?: number;
  titulo: string;
  universidad: string;
  asignatura: string;
  categoria: string;
  descripcion: string;
  url: string;
  autor: string;
  fecha?: string;   // Nuevo campo para el mockup
  tipo?: string;    // Nuevo campo (PDF, ZIP, DOCX)
}