import { PlmchartAdmin2addtreeComponent } from './plmchart-admin2addtree/plmchart-admin2addtree.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlmcalendarComponent } from './plmcalendar/plmcalendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { PlmIndexComponent } from './plm-index/plm-index.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './/app-routing.module';
import { PlmchartAdminComponent } from './plmchart-admin/plmchart-admin.component';



import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { PlmcalendarMtkComponent } from './plmcalendar-mtk/plmcalendar-mtk.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:[
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    FullCalendarModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations:[
     AppComponent,
      PlmcalendarComponent,
      PlmIndexComponent,
      PlmchartAdminComponent,
      PlmchartAdmin2addtreeComponent,
      PlmcalendarMtkComponent,
    ],
  bootstrap:[ 
    AppComponent 
  ]
})
export class AppModule { }
