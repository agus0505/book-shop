export type FormData = {
    nombre: string;
    telefono: number,
    provincia: string;
    localidad: string;
    calle: string;
    numero: number;
    piso?: string;
    email: string;
    indicaciones?: string;
  } | undefined