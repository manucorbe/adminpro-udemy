import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: []
})
export class DoughnutComponent implements OnInit {

@Input('label') doughnutChartLabels: Label[] = [];
@Input('data') doughnutChartData: MultiDataSet = [];
@Input('type') doughnutChartType: ChartType = null;

  constructor() { }

  ngOnInit() {
  }

}
