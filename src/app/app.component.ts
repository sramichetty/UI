import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graphs';
  multi: any[] = [];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };
  view: any[] = [700, 420];

 // options
legend: boolean = false;
showLabels: boolean = true;
animations: boolean = true;
xAxis: boolean = true;
yAxis: boolean = true;
showYAxisLabel: boolean = true;
showXAxisLabel: boolean = true;
xAxisLabel: string = 'Temerature and humidity';
yAxisLabel: string = 'Time';
timeline: boolean = true;
rotateXAxisTicks:boolean = true;
trimXAxisTicks:boolean = true;
autoScale: boolean = true;
public dataArray: CSVData[] = [];
constructor(
  private http:HttpClient
){}
ngOnInit(){ this.http.get('assets/analog.csv', {responseType: 'text'})
.subscribe(
    data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.dataArray.push(new CSVData(row[0], row[1]));
        }
        let temparray = [];
        let humidityarray = [];
        console.log(this.dataArray);
        this.dataArray.forEach(function(e){
         console.log(e);
        // temparray.push(e.temp);
        // humidityarray.push(e.humidity);
         temparray.push({name:e.temp,value:e.temp})
        humidityarray.push({name:e.temp, value:e.humidity})
      
        })
        this.multi = [{name:"Temperature", series: temparray},{name:'Humidity', series:humidityarray}];
               console.log(this.multi);
       
    },
    error => {
        console.log(error);
    }
);
}
}
export class CSVData{
  temp: string;
  humidity: string;
  
   constructor( temprature: string, humdi: string){
  this.temp = temprature;
  this.humidity = humdi;
  }
  }
