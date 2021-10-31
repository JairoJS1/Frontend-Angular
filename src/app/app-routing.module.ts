import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { EditarComponentComponent } from './editar-component/editar-component.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';

const routes: Routes = [
  { path: 'creacion', component: CrearPersonaComponent},
  { path: 'editar', component: EditarComponentComponent},
  { path: 'menu', component: MenuComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
