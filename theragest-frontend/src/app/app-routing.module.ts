import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListaCitasComponent } from './pages/lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { FormularioPacienteComponent } from './pages/formulario-paciente/formulario-paciente.component';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';

const routes: Routes = [
  {path: '', component:HomeComponent}, //ruta raíz
  {path: 'citas', component:ListaCitasComponent},
  {path: 'nueva-cita', component:FormularioCitaComponent},
  {path: 'editar-cita/:id', component:FormularioCitaComponent},
  { path: 'pacientes', component: ListaPacientesComponent },
  {path: 'nuevo-paciente', component:FormularioPacienteComponent},
  { path: 'editar-paciente/:id', component: FormularioPacienteComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
