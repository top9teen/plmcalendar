import { PlmchartAdmin2addtreeComponent } from './plmchart-admin2addtree/plmchart-admin2addtree.component';
import { PlmIndexComponent } from './plm-index/plm-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlmcalendarComponent } from './plmcalendar/plmcalendar.component';
import { PlmchartAdminComponent } from './plmchart-admin/plmchart-admin.component';
import { PlmcalendarMtkComponent } from './plmcalendar-mtk/plmcalendar-mtk.component';

const ROUTES: Routes = [
  { path: 'home/index', redirectTo: 'index', pathMatch: 'full' },
  { path: 'home/calendar', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'home/chart', redirectTo: 'chart', pathMatch: 'full' },
  { path: 'home/tree', redirectTo: 'tree', pathMatch: 'full' },
  { path: 'home/calendarmkt', redirectTo: 'calendarmkt', pathMatch: 'full' },

  { path: 'index', component: PlmIndexComponent },
  { path: 'calendar', component: PlmcalendarComponent },
  { path: 'chart', component: PlmchartAdminComponent },
  { path: 'tree', component: PlmchartAdmin2addtreeComponent },
  { path: 'calendarmkt', component: PlmcalendarMtkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
