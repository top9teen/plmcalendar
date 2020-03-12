import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PLM_SPRING_URL } from '../app.properties';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-plmcalendar',
  templateUrl: './plmcalendar.component.html',
  styleUrls: ['./plmcalendar.component.css']
})

export class PlmcalendarComponent implements OnInit {
  @ViewChild('modalRefshow')
  modalRefshow: ModalDirective;

  datacalender: Calendarvalue[];
  options: any;
  isSaving: boolean;
  Datamulti: any[];

  constructor(
    public http: HttpClient,

  ) { }

  async ngOnInit() {
    this.isSaving = true;
    await this.getDataCalender();
    this.options = {
      editable: true,
      eventLimit: true,
      droppable: true,
      themeSystem: 'Litera',
      header: {
        left: 'prev today next ',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      plugins: [dayGridPlugin],
    };
    this.isSaving = false;
  }

  async getDataCalender() {

    this.datacalender = [];
    await this.http.get(PLM_SPRING_URL + '/report/calendar').toPromise().then(async (data: ReportCalendar[]) => {
      data.forEach(element => {
        let value = {} as Calendarvalue;
        value.backgroundColor = element.color;
        value.start = element.onPrdDt;
        value.title = '<li>'+element.projectCode + ' : ' + element.projectOwner + ' (' + element.pjcount + ')</li>';
        value.id = element.projectCode + '/' + element.onPrdDt + '/' + element.billingSystem;
        value.description = 'Y';
        this.datacalender.push(value);
      });
    }, err => console.log('ERROR on getDataCalender'));
    await this.http.get(PLM_SPRING_URL + '/report/getCapacity').toPromise().then(async (data: Capacity[]) => {
      data.forEach(element => {
        let value = {} as Calendarvalue;
        value.backgroundColor = element.actcolor;
        value.start = element.onPrdDt;
        value.title = '<b>Capacity:</b> '+element.mainPromoPerCycle + ' Total : ' + element.actualLoad + ' Cap : ' + element.actualLoadMax + '</li>';
        value.id = element.actualLoad;
        value.description = 'N';
        this.datacalender.push(value);

      });
    }, err => console.log('ERROR on getCapacity'));

  }

  async eventClick(model) {
    console.log(model)
    if (model.event._def.extendedProps.description !== null && model.event._def.extendedProps.description === 'Y') {
      this.Datamulti = [];
      await this.http.get(PLM_SPRING_URL + '/report/calendarDetails/' + model.event.id).toPromise().then(async (data: CalendarDetails[]) => {
        this.Datamulti = data;
      }, err => console.log('ERROR on calendarDetails'));
      this.modalRefshow.show();
    }
  }

  hideModal() {

    this.modalRefshow.hide();
  }

  eventRender(e){
    // console.log("eventrender : "+e.event.title)
     e.el.querySelectorAll('.fc-title')[0].innerHTML = e.el.querySelectorAll('.fc-title')[0].innerText; 
    }
  // end class
}

export interface Calendarvalue {
  title: string;
  start: string;
  backgroundColor: string;
  id: string;
  description: string;
  rendering: string;
  color: string;
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

// rendering: 'background',
//         color: 'red'