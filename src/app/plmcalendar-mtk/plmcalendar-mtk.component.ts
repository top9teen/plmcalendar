import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PLM_SPRING_URL } from '../app.properties';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventInput } from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
@Component({
  selector: 'app-plmcalendar-mtk',
  templateUrl: './plmcalendar-mtk.component.html',
  styleUrls: ['./plmcalendar-mtk.component.css']
})
export class PlmcalendarMtkComponent implements OnInit {
  @ViewChild('external') external: ElementRef;
  @ViewChild('modalRefshow')
  modalRefshow: ModalDirective;

  datacalender: EventInput[];
  datacalenderShow: EventInput[];
  options: any;
  isSaving: boolean;
  istable: boolean;
  Datamulti: any[];
  projectId: string;
  dataEvent: EventInput[];
  thisOnPrd: HistoryPlmPo[] = [];
  onPrdDate: Date;
  setOnPrdDate: string;
  thisProject: HistoryPlmPo[] = [];

  // setData
  Mount: string;
  differ: any;
  calendar: any;
  // isCollapsed: boolean;

  dataCapacity: any[];
  dataPlmPo: any[];

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
  ) {
  }

  async ngOnInit() {
    this.setVariableFromQueryParams();
    this.istable = false;
    this.isSaving = false;
    // this.isCollapsed = true;
    this.dataEvent = [];
    this.datacalender = [];
    this.datacalenderShow = [];
    this.setToolsCalendar();
    // this.getDataCalenderEvent(this.projectId);
    this.getAllByProjectId(this.projectId);
      // tslint:disable-next-line:no-unused-expression
  }

  async getDataCalender(date, projectId) {
    this.datacalender = [];
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getFlwReserveAsCalendar/' + date + '/' + projectId).toPromise().then(async (data: any[]) => {
      data.forEach(element => {
        let value = {} as EventInput;
        value.backgroundColor = '#D07CDB';
        value.date = element.date + 'T00:00:00';
        // tslint:disable-next-line:max-line-length
        value.title = '<li>' + element.productNameMkt + '</li>';
        value.id = element.rowId;
        if (element.projectRowId === projectId) {
          value.editable = true;
        } else {
          value.editable = false;
        }
        value.description = 'Y';
        this.datacalender.push(value);
      });
    }, err => console.log('ERROR on getDataCalender'));
    this.datacalenderShow = this.datacalender;
  }

  hideModal() {
    this.modalRefshow.hide();
  }

  eventRender(e) {
     e.el.querySelectorAll('.fc-title')[0].innerHTML = e.el.querySelectorAll('.fc-title')[0].innerText;
  }

  handleDatesRender(e) {
    this.istable = false;
    // console.log(e);
    // console.log(e.view.title);
    this.Mount = e.view.title;
    this.getDataCalender(e.view.title, this.projectId);
    // tslint:disable-next-line:no-unused-expression
  }

  handleDateClick(e) {
    // handler method
    this.istable = true;
    this.isSaving = true;
    this.dataCapacity = [];
    this.dataPlmPo  = [];
    console.log(e.dateStr);
    this.onPrdDate = new Date(e.dateStr);
    this.setOnPrdDate = e.dateStr;
    this.getCapacity(e.dateStr, this.projectId);
    this.getDataPlmPo(e.dateStr);
    this.getAllThisOnPrd(e.dateStr);
    this.isSaving = false;

    // console.log(e.date);
  }

 async updateEvent(e) {
  this.istable = true;
  console.log(e.event.id);
  console.log(e);
  console.log(e.event);
  console.log(e.event.start);
  // tslint:disable-next-line:max-line-length
  await this.http.get(PLM_SPRING_URL + '/api/seveFlwReserveAsCalendarEvent/' +  e.event.id + '/' + e.event.start , { responseType: 'text' }).toPromise().then(async (data: any) => {
    alert(data);
  }, err => console.log('ERROR on getDataCalenderEvent:'+err));
  //  window.location.reload();
  await this.getDataCalender(this.Mount, this.projectId);
  await this.getCapacity(this.setOnPrdDate , this.projectId);
  await this.getDataPlmPo(this.setOnPrdDate );
  await this.getAllThisOnPrd(this.setOnPrdDate );
  this.istable = false;
  }

  async delete(id) {
    // alert(id);
  }

  async setVariableFromQueryParams() {
    let splitted = window.location.href.split('=');
    this.projectId = splitted[1];
  }

  async getAllThisOnPrd(date) {
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getReserveByOnPrdDt/' + date).toPromise().then(async (data: HistoryPlmPo[]) => {
      this.thisOnPrd = data.sort();
    }, err => console.log('ERROR on getAllThisOnPrd:'+err));
  }

  async getAllByProjectId(projectId) {
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getReserveOnPrdDtByPrjectId/' + projectId).toPromise().then(async (data: HistoryPlmPo[]) => {
      this.thisProject = data.sort();
    }, err => console.log('ERROR on getAllThisOnPrd:'+err));
  }

  setToolsCalendar() {
    this.options = {
      editable: true,
      eventLimit: true,
      droppable: true,
      locale: 'us',
      themeSystem: 'bootstrap',
      header: {
        left: 'prev today next ',
        center: 'title',
        right  : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin],
    };
  }

  async getCapacity(date, projectId) {
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getCapacity/' +  projectId + '/' + date).toPromise().then(async (data: any[]) => {
      this.dataCapacity = data;
    }, err => console.log('ERROR on getCapacity'));
  }

  async getDataPlmPo(date) {
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getDataPlmPo/' + date).toPromise().then(async (data: any[]) => {
      this.dataPlmPo = data;
    }, err => console.log('ERROR on getDataPlmPo'));
  }

  async setdata(){
    this.datacalenderShow = [
      { title: 'Event Now', start: new Date() }
    ];
  }
  // end class
}

export interface ReportCalendar {
  projectCode: string;
  projectNameMkt: string;
  projectOwner: string;
  billingSystem: string;
  onPrdDt: string;
  color: string;
  pjcount: string;

}

export interface Capacity {
  actualLoad: string;
  actualLoadMax: string;
  actualMainLoad: string;
  mainPromoPerCycle: string;
  actcolor: string;
  onPrdDt: string;
}

export interface CalendarDetails {
  projectOwner: string;
  productName: string;
  onPrdDt: Date;
  promotionGroup: string;
  poSubGroup: string;
  status: string;
  productClass: string;
  priceType: string;
  billingSystem: string;
  rowId: string;
  flwProductDetailCode: FlwProductDetailCode[];
}

export interface FlwProductDetailCode {
  rowId: string;
  billingSystemDynField: string;
  billingSystemDynFieldValue: string;
  downstreamSystem: string;
  productDetailRowId: string;
}

export interface HistoryPlmPo{
  rowId: string;
  projectRowId: string;
  projectCode: string;
  poRowId: string;
  productName: string;
  promotionGroup: string;
  onPrdDt: Date;
  submitDt: Date;
  status: string;
}

// rendering: 'background',
//         color: 'red'
