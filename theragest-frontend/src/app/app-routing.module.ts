import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListaCitasComponent } from './pages/lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { FormularioPacienteComponent } from './pages/formulario-paciente/formulario-paciente.component';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistorialCitasComponent } from './pages/historial-citas/historial-citas.component';
import { CitasProximasComponent } from './pages/citas-proximas/citas-proximas.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'citas', component:ListaCitasComponent, canActivate: [AuthGuard]},
  {path: 'nueva-cita', component:FormularioCitaComponent, canActivate: [AuthGuard]},
  {path: 'editar-cita/:id', component:FormularioCitaComponent, canActivate: [AuthGuard]},
  { path: 'pacientes', component: ListaPacientesComponent, canActivate: [AuthGuard] },
  {path: 'nuevo-paciente', component:FormularioPacienteComponent, canActivate: [AuthGuard]},
  {path: 'editar-paciente/:id', component: FormularioPacienteComponent, canActivate: [AuthGuard] },
  {path: 'historial-citas/:id', component: HistorialCitasComponent, canActivate: [AuthGuard] },
  {path: 'citas-proximas', component: CitasProximasComponent, canActivate: [AuthGuard] },
  
  {path: '', redirectTo: 'login', pathMatch:'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
