import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCitasComponent } from './pages/lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';
import { FormularioPacienteComponent } from './pages/formulario-paciente/formulario-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaCitasComponent,
    FormularioCitaComponent,
    HomeComponent,
    ListaPacientesComponent,
    FormularioPacienteComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
