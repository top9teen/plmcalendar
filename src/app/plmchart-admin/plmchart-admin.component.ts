import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PLM_SPRING_URL } from '../app.properties';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plmchart-admin',
  templateUrl: './plmchart-admin.component.html',
  styleUrls: ['./plmchart-admin.component.css']
})
export class PlmchartAdminComponent implements OnInit {

   lineChart: any = [];
   DataUser : any = null;
   isSaving: boolean;
   valueSum: number = 0; 
   valueOffline: number = 0;
   valueOnline: number = 0;
  constructor(private http: HttpClient,
   ) { }

 async ngOnInit(){

   this.isSaving = true;
   // Get Data
   await this.getDataUser();
   
     // สร้าง object และใช้ชื่อ id lineChart ในการอ้างอิงเพื่อนำมาเเสดงผล
    this.lineChart = new Chart('lineChart', { 
       // ใช้ชนิดแผนภูมิแบบเส้นสามารถเปลี่ยนได้
       type: 'doughnut', 
        // ข้อมูลภายในแผนภูมิแบบเส้น
       data: {
          // ชื่อของข้อมูลในแนวแกน x
           labels: ['USER ONLINE','USER OFFLINE'], 
           // กำหนดค่าข้อมูลภายในแผนภูมิแบบเส้น
           datasets: [{ 
              label: 'Number of items USER',
              data: [this.DataUser[0], this.DataUser[1]],
              fill: true,
              lineTension: 0.4,
              borderColor: "d5fb3a", 
              borderWidth: 3,
              backgroundColor: [   
                "#63ec7e",  
                "#f75b70"  
              ],
              hoverBackgroundColor: '#667ffa',
           }]
       },
      //  options: {
      //     title: { // ข้อความที่อยู่ด้านบนของแผนภูมิ
      //        text: "USER ALL IN PLM",
      //        display: true
      //     }
      //  },
       scales: { // แสดง scales ของแผนภูมิเริมที่ 0
          yAxes: [{
             ticks:{
                beginAtZero:true
             }
          }]
        }
    })
    this.valueSum = this.valueOffline + this.valueOnline;
    this.isSaving = false;
 }

 async getDataUser(){
  await this.http.get(PLM_SPRING_URL + '/newApi/CheckTask/setDataUserToService').toPromise().then(async (data: any) => {
   this.DataUser = data;
   this.valueOnline = data[0];
   this.valueOffline = data[1];
    }, err => console.log('ERROR on setDataUserToService'));
 }
}
