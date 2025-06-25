import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <div style="padding: 20px; background: lightblue; margin: 20px;">
      <h1>🧪 Componente de Prueba</h1>
      <p>Si ves esto, las rutas funcionan correctamente.</p>
      <a href="/login">Ir al Login</a>
    </div>
  `
})
export class TestComponent {}
