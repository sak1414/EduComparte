export interface Recurso {
  id?: number;
  titulo: string;
  universidad: string;       // Nuevo campo
  asignatura: string;        // Antes era 'curso'
  categoria: string;         // Nuevo campo
  descripcion: string;
  url: string;
  autor: string;
}