import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PLM_SPRING_URL } from '../app.properties';

@Component({
  selector: 'app-plmcalendar-mtk',
  templateUrl: './plmcalendar-mtk.component.html',
  styleUrls: ['./plmcalendar-mtk.component.css']
})
export class PlmcalendarMtkComponent implements OnInit {
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('external') external: ElementRef;
  @ViewChild('modalRefshow')
  modalRefshow: ModalDirective;

  datacalender: EventInput[];

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
  dataValue: EventInput;
  datacalenderShow: EventInput[];
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
    this.thisOnPrd = [];
    this.thisProject = [];
    this.setToolsCalendar();
    // this.getDataCalenderEvent(this.projectId);
    this.getAllByProjectId(this.projectId);
      // tslint:disable-next-line:no-unused-expression
  }

  async getDataCalender(date, projectId) {
    // this.datacalender = [];
    let simpleData: EventInput[];
    simpleData = [];
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getFlwReserveAsCalendar/' + date + '/' + projectId).toPromise().then(async (data: any[]) => {

      for (let index = 0; index < data.length; index++) {
          let data2: EventInput;
          let setdate = new Date(data[index].onPrdDt + 'T00:00:00');
          let statusEdit: boolean ;
          let color: string ;
        if (data[index].projectRowId === projectId) {
          statusEdit = true;
          color = '#5fd508';
        } else {
          statusEdit = false;
          color = '#f48d11';
        }
          data2 = [];
          data2 = {
            title: '<li>' + data[index].productNameMkt + '</li>',
            date:  setdate,
            backgroundColor: color,
            id: data[index].rowId,
            editable: statusEdit,
            description : data[index].onPrdDt
          };
          simpleData.push(data2);
      }

    }, err => console.log('ERROR on getDataCalender'));
    this.datacalenderShow = simpleData;
    // console.log(this.datacalenderShow);
  }

  hideModal() {
    this.modalRefshow.hide();
  }

  eventRender(e) {
    // console.log('e', e.el.querySelectorAll('.fc-title')[0]);
     e.el.querySelectorAll('.fc-title')[0].innerHTML = e.el.querySelectorAll('.fc-title')[0].innerText;
  }

  handleDatesRender(e) {
    this.istable = false;
    console.log(e);
    // console.log(e.view.title);
    this.Mount = e.view.title;
    this.getDataCalender(e.view.title, this.projectId);
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:no-unused-expression
  }

  async handleDateClick(e) {
    // handler method
    this.istable = true;
    // this.isSaving = true;
    this.dataCapacity = [];
    this.dataPlmPo  = [];
    console.log(e.dateStr);
    this.onPrdDate = new Date(e.dateStr);
    this.setOnPrdDate = e.dateStr;
// .fc-day {
//   background: green;
// }
    console.log(e.dayEl);
    console.log(e.dayEl.style);
    // (document.querySelector('.app-alerts') as HTMLElement).style.top = '150px';
    // tslint:disable-next-line:max-line-length
    e.dayEl.style.background = 'green';
    // e.el.querySelectorAll('.fc-title')[0].css = e.el.querySelectorAll('.fc-title')[0].innerText;
    // e.css('background-color', 'red');


    await this.getCapacity(e.dateStr, this.projectId);
   await this.getDataPlmPo(e.dateStr);
   await this.getAllThisOnPrd(e.dateStr);
    // this.isSaving = false;

    // console.log(e.date);
  }

 async updateEvent(e) {
  this.istable = false;
  // console.log(e.event.id);
  // console.log(e);
  // console.log(e.event);
  // console.log(e.event.start);
  // console.log(e.event._def.extendedProps.description);
  // tslint:disable-next-line:max-line-length
  await this.http.get(PLM_SPRING_URL + '/api/seveFlwReserveAsCalendarEvent/' +  e.event.id + '/' + e.event.start , { responseType: 'text' }).toPromise().then(async (data: any) => {
      alert(data);
      this.datacalenderShow = [];
      await this.getDataCalender(this.Mount, this.projectId);
    }, err => console.log('ERROR on getDataCalenderEvent:' + err));
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
    }, err => console.log('ERROR on getAllThisOnPrd:' + err));
  }

  async getAllByProjectId(projectId) {
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getReserveOnPrdDtByPrjectId/' + projectId).toPromise().then(async (data: HistoryPlmPo[]) => {
      this.thisProject = data.sort();
    }, err => console.log('ERROR on getAllThisOnPrd:' + err));
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
        right  : ''
        // right  : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin],
    };

    // tslint:disable-next-line:no-unused-expression
    new Draggable(this.external.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        console.log(eventEl);
        return {
          title: eventEl.innerText
        };
      }
  });
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

  async setdata() {
    this.datacalenderShow = [
      { title: 'Event Now', start: new Date() }
    ];
  }

  async setdataTest() {

    this.datacalenderShow = [
      {
        title: '<li>test20200225FBB_03</li>',
        date: '2020-03-03T04:09:13.122Z',
        backgroundColor: '#D07CDB',
        id: '221d7051-2591-4581-ab29-652cfcd839ad',
        editable: true,
       description: 'Y'
      },
      {
        title: '<li>test20200225FBB_05</li>',
        date: '2020-03-03T04:09:13.122Z',
        backgroundColor: '#D07CDB',
        id: '64a402d6-f12a-4b0c-9f99-203001960da4',
        editable: true,
       description: 'Y'
      },
      {
        title: '<li>test20200225FBB_04</li>',
        date: '2020-03-03T04:09:13.122Z',
        backgroundColor: '#D07CDB',
        id: 'e1718f5b-24cc-4cdd-9fe5-8a5dadfa17e1',
        editable: true,
       description: 'Y'
      },
      {
        title: '<li>test20200225FBB_01</li>',
        date: '2020-03-03T04:09:13.122Z',
        backgroundColor: '#D07CDB',
        id: '6a4f12a3-7c18-420f-a71a-d757fbd8ddbe',
        editable: true,
       description: 'Y'
      },
      {
        title: '<li>test po 20200203 11</li>',
        date: '2020-03-03T04:09:13.122Z',
        backgroundColor: '#D07CDB',
        id: '329b8dbe-d017-4abf-aaba-73855fb85b2f',
        editable: true,
       description: 'Y'
      },
      {
        title: '<li>test20200225FBB_02</li>',
        date: '2020-03-03T04:09:13.122Z',
        backgroundColor: '#D07CDB',
        id: 'b85f6dd0-fa3c-4e17-b3dd-bcee58c2032c',
        editable: true,
       description: 'Y'
      }
    ];
  }

  eventDragStop(model) {
    console.log(model);
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

export interface HistoryPlmPo {
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
