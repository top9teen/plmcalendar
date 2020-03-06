
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
  onPrdDate: Date;
  setOnPrdDate: string;
  thisProject: HistoryProjectCalendar[] = [];
  dataValue: EventInput;
  datacalenderShow: EventInput[];
  dataProjetEvent: any[];
  // setData
  Mount: string;
  differ: any;
  calendar: any;

  cursorStatus: string;
  // isCollapsed: boolean;

  dataCapacity: any[];
  dataProjectCalendar: any[];
  dataDayOnPrd: Array<string>;
  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
  ) {
  }

  async ngOnInit() {
    this.isSaving = true;
    this.setVariableFromQueryParams();
    this.istable = false;
    // this.isCollapsed = true;
    this.dataEvent = [];
    this.datacalender = [];
    this.datacalenderShow = [];
    this.thisProject = [];
    this.dataProjetEvent = [];
    this.setToolsCalendar();
    this.getDataProjectEvent(this.projectId);
    // this.getCapacityAllmont
    setTimeout(() => {
      this.isSaving = false;
    }, 500);
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
            title: '<li>' + data[index].productNameMkt + ' : ' + data[index].user + ' (' + data[index].count + ')</li>',
            date:  setdate,
            backgroundColor: color,
            id: data[index].rowId,
            editable: statusEdit,
            description : data[index].description
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

  async eventClick(model) {
    console.log(model);
      this.Datamulti = [];
      // tslint:disable-next-line:max-line-length
      await this.http.get(PLM_SPRING_URL + '/report/calendarDetailsMkt/' + model.event.id).toPromise().then(async (data: CalendarDetails[]) => {
        this.Datamulti = data;
      }, err => console.log('ERROR on calendarDetails'));
      this.modalRefshow.show();

  }


  eventRender(e) {
    // console.log(e.event._def);
    e.el.querySelectorAll('.fc-title')[0].innerHTML = e.el.querySelectorAll('.fc-title')[0].innerText;
    if (e.event._def.extendedProps.description === 'No') {
      console.log(e.event._instance.range.start);
      this.isSaving = true;
      // tslint:disable-next-line:max-line-length
      this.http.get(PLM_SPRING_URL + '/api/seveFristValue/' +  e.event.id + '/' + e.event._instance.range.start  , { responseType: 'text' }).toPromise().then(async (data: any) => {
      alert(data);
      location.reload();
    }, err => console.log('ERROR on getDataCalenderEvent:' + err));
    }
    // console.log('e', e.el.querySelectorAll('.fc-title')[0]);
  }

 async handleDatesRender(e) {
    this.isSaving = true;
    this.Mount = e.view.title;

    // tslint:disable-next-line:max-line-length
   for (let index = 0; index < e.el.lastElementChild.children[1]
    .children[0]
    .cells[0]
    .childNodes[0]
    .childNodes[0]
    .childNodes.length; index++) {
    // tslint:disable-next-line:max-line-length
    for (let index2 = 0; index2 < e.el.lastElementChild.children[1]
      .children[0]
      .cells[0]
      .childNodes[0]
      .childNodes[0]
      .childNodes[index]
      .children[0]
      .childNodes[0]
      .childNodes[0]
      .childNodes[0]
      .cells.length; index2++) {
    // tslint:disable-next-line:max-line-length
    // Check Color //
   let data = await this.getCapacityAllMount(e.el.lastElementChild.children[1]
      .children[0]
      .cells[0]
      .childNodes[0]
      .childNodes[0]
      .childNodes[index].childNodes[0]
      .children[0]
      .childNodes[0]
      .childNodes[0]
      .cells[index2].dataset.date);
    if (!data) {
      e.el.lastElementChild.children[1]
      .children[0]
      .cells[0]
      .childNodes[0]
      .childNodes[0]
      .childNodes[index]
      .childNodes[0]
      .children[0]//
      .childNodes[0]
      .childNodes[0]
      .cells[index2].style.background = '#e5e8e8';
    }
    }
   }    // tslint:disable-next-line:max-line-length
   await this.getDataCalender(e.view.title, this.projectId);
   await this.getDataProjectEvent(this.projectId);
   this.isSaving = false;
    // tslint:disable-next-line:max-line-length
  }

  async handleDateClick(e) {
    console.log(e);
    // handler method
    this.isSaving = true;
    this.istable = true;
    this.dataCapacity = [];
    this.dataProjectCalendar = [];
    console.log(e.dateStr);
    this.onPrdDate = new Date(e.dateStr);
    this.setOnPrdDate = e.dateStr;
   await this.getCapacity(e.dateStr, this.projectId);
   await this.getDataProjectCalendar(e.dateStr);
  //  await this.getAllByProjectId(e.dateStr);
   this.isSaving = false;
  }

 async updateEvent(e) {
   console.log(e);
  this.istable = false;
  // console.log(e.event.id);
  // console.log(e);
  // console.log(e.event);
  // console.log(e.event.start);
  // console.log(e.event._def.extendedProps.description);

  // tslint:disable-next-line:max-line-length
  // await this.http.get(PLM_SPRING_URL + '/api/seveFlwReserveAsCalendarEvent/' +  e.event.id + '/' + e.event.start , { responseType: 'text' }).toPromise().then(async (data: any) => {
  //     alert(data);
  //     this.datacalenderShow = [];
  //     await this.getDataCalender(this.Mount, this.projectId);
  //   }, err => console.log('ERROR on getDataCalenderEvent:' + err));
  }

  async delete(id) {
    this.isSaving = true;
    // tslint:disable-next-line:max-line-length
   await this.http.get(PLM_SPRING_URL + '/api/deleteFristValue/' +  id , { responseType: 'text' }).toPromise().then(async (data: any) => {

      // location.reload();
      await this.getDataCalender(this.Mount, this.projectId);
      await this.getDataProjectEvent(this.projectId);
      await this.getCapacity(this.setOnPrdDate, this.projectId);
      await this.getDataProjectCalendar(this.setOnPrdDate);
      alert(data);
    }, err => console.log('ERROR on deleteFristValue:' + err));
    this.isSaving = false;
  }

  async setVariableFromQueryParams() {
    let splitted = window.location.href.split('=');
    this.projectId = splitted[1];
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
          title: eventEl.innerText,
          id: eventEl.id,
          description : 'No'
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

  async getDataProjectCalendar(date) {
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getDataProjectCalendar/' + date).toPromise().then(async (data: HistoryProjectCalendar[]) => {
      this.thisProject = data.sort();
    }, err => console.log('ERROR on getDataProjectCalendar'));
  }

  async getDataProjectEvent(projectId) {
    // tslint:disable-next-line: max-line-length
    await this.http.get(PLM_SPRING_URL + '/api/getFlwReserveAsCalendarEvent/' + projectId).toPromise().then(async (data: any[]) => {
      this.dataProjetEvent = data;
    }, err => console.log('ERROR on getFlwReserveAsCalendarEvent'));
  }

  async setdata() {
    this.datacalenderShow = [
      { title: 'Event Now', start: new Date() }
    ];
  }

  async setdataTest() {

    // this.datacalenderShow = [
    //   {
    //     title: '<li>test20200225FBB_03</li>',
    //     date: '2020-03-03T04:09:13.122Z',
    //     backgroundColor: '#D07CDB',
    //     id: '221d7051-2591-4581-ab29-652cfcd839ad',
    //     editable: true,
    //    description: 'Y'
    //   },
    //   {
    //     title: '<li>test20200225FBB_02</li>',
    //     date: '2020-03-03T04:09:13.122Z',
    //     backgroundColor: '#D07CDB',
    //     id: 'b85f6dd0-fa3c-4e17-b3dd-bcee58c2032c',
    //     editable: true,
    //    description: 'Y'
    //   }
    // ];
  }
  async getCapacityAllMount(day) {
    // tslint:disable-next-line:max-line-length
  return  await this.http.get(PLM_SPRING_URL + '/api/getCapAsCalendar/' + day).toPromise().then(async (data: boolean) => {
    return data;
    }, err => console.log('ERROR on getFlwReserveAsCalendarEvent'));
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

export interface HistoryProjectCalendar {
  rowId: string;
  projectCode: string;
  projectName: string;
  poGroup: string;
  onPrdDt: Date;
  submitDt: Date;
  projectRowId: string;
}

// rendering: 'background',
//         color: 'red'
