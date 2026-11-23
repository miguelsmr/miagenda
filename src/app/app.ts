import { Component, computed, signal } from '@angular/core';

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  grupo: string;
  favorito: boolean;
}

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // Estado de la app: la lista de contactos y el texto del buscador
  contactos = signal<Contacto[]>([]);
  busqueda = signal('');

  // Valores calculados: se actualizan solos cuando cambia algún signal del que dependen
  numFavoritos = computed(() => this.contactos().filter((c) => c.favorito).length);

  filtrados = computed(() => {
    const texto = this.busqueda().toLowerCase();
    return this.contactos().filter((c) => c.nombre.toLowerCase().includes(texto));
  });

  constructor() {
    this.cargar();
  }

  // Lee los contactos de public/contactos.json y los guarda en el signal
  async cargar() {
    try {
      const respuesta = await fetch('/contactos.json');
      const datos: Contacto[] = await respuesta.json();
      this.contactos.set(datos);
    } catch (error) {
      console.error('No se pudieron cargar los contactos', error);
    }
  }

  // Primera letra de las dos primeras palabras del nombre, en mayúsculas
  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map((palabra) => palabra[0])
      .join('')
      .toUpperCase();
  }

  // Devuelve una lista nueva en la que ese contacto tiene el favorito al revés
  cambiarFavorito(id: number) {
    this.contactos.update((lista) =>
      lista.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c)),
    );
  }
}
