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
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistorialCitasComponent } from './pages/historial-citas/historial-citas.component';
import { NotificacionesCitasComponent } from './pages/notificaciones-citas/notificaciones-citas.component';
import { CitasProximasComponent } from './pages/citas-proximas/citas-proximas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaCitasComponent,
    FormularioCitaComponent,
    HomeComponent,
    ListaPacientesComponent,
    FormularioPacienteComponent,
    LoginComponent,
    DashboardComponent,
    HistorialCitasComponent,
    NotificacionesCitasComponent,
    CitasProximasComponent    
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
