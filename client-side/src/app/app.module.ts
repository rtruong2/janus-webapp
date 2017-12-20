import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavModule } from './nav/nav.module';
import { JanusComponent } from './janus/janus.component';
import { ChuckNorrisService } from './services/chuck-norris.service';
import { ReportingService } from './services/reporting.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CaliberModule } from './Caliber/caliber.module';
import { TraineeTechSkillsComponent } from './Caliber/reports/trainee-tech-skills/trainee-tech-skills.component';


// loading routes from child modules this way will lazy load them
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: JanusComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'Caliber', loadChildren: './Caliber/caliber.module#CaliberModule'},
      {path: 'AssignForce', loadChildren: './Assign-Force/assign-force.module#AssignForceModule'},
      {path: 'TrackForce', loadChildren: './Track-Force/track-force.module#TrackForceModule'},
      {path: '**', pathMatch: 'full', redirectTo: '/dashboard'}
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    NavModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ChartsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    JanusComponent,
  ],
  providers: [
    ChuckNorrisService,
    ReportingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
