import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './componentes-comunes/utils/material-module';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { EditarComponentComponent } from './editar-component/editar-component.component';
@NgModule({
  declarations: [
    AppComponent,
    CrearPersonaComponent,
    MenuComponentComponent,
    EditarComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
