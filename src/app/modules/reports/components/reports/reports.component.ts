import { Component, OnInit, Injectable } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgbDate, NgbCalendar, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { DecimalPipe } from '@angular/common';

const I18N_VALUES = {
  es: {
    weekdays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'es';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this.i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class ReportsComponent implements OnInit {

  form: FormGroup;

  //////////// BAR CHART

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{ }],
      yAxes: [{
        ticks: {
          min: 0,
          // callback(value, index, values) {
          //   // return formatNumber(value);
          //   debugger;
          //   return this.decimalPipe.transform(value, '1.0-3');
          // }
        }
       }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  //////////// BAR CHART

  ////////////////////// DATEPICKER

  hoveredDate: NgbDate;
  dateTypes = [
    { id: 'day', name: 'Día' },
    { id: 'range', name: 'Rango de fechas' }
  ];
  reports = [
    { id: 'EarningsBySeller', name: 'Ingresos por Vendedor' },
    { id: 'EarningsByProduct', name: 'Ingresos por Producto' },
    // {id: 'EarningsByTag', name: 'Ingresos por Etiqueta'},
    { id: 'CountByProduct', name: 'Cantidad por Producto' },
  ];

  fromDate: NgbDate;
  toDate: NgbDate;
  today: NgbDate;

  constructor(calendar: NgbCalendar, private reportService: ReportService, private decimalPipe: DecimalPipe) {
    this.today = calendar.getToday();
    this.form = this.createInitialForm();
  }

  onDateSelection(date: NgbDate) {
    // console.log('[component] - reports - onDateSelection', date);
  }

  onRangeSelection(date: NgbDate) {
    // console.log('[component] - reports - onRangeSelection', date);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.form.controls.startDate.setValue(this.fromDate);
    this.form.controls.endDate.setValue(this.toDate);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  ////////////////////// DATEPICKER

  // constructor() { }

  ngOnInit() {
    // this.form.controls.currentDate.setValue(this.today);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  createInitialForm() {
    // console.log('[component] - reports - createInitialForm');
    const formGroup = new FormGroup({
      reportType: new FormControl(null, [Validators.required]),
      dateType: new FormControl('day', [Validators.required])
    });
    return this.setDateFromControl(formGroup);
  }

  setDateFromControl(formGroup: FormGroup) {
    // console.log('[component] - reports - setDateFromControl');
    switch (formGroup.controls.dateType.value) {
      case 'day':
        formGroup.removeControl('startDate');
        formGroup.removeControl('endDate');
        this.fromDate = null;
        this.toDate = null;
        formGroup.addControl('currentDate', new FormControl('', [Validators.required]));
        break;
      case 'range':
        formGroup.removeControl('currentDate');
        formGroup.addControl('startDate', new FormControl('', [Validators.required]));
        formGroup.addControl('endDate', new FormControl('', [Validators.required]));
        break;
    }
    return formGroup;
  }

  onSubmitForm(form: FormGroup) {
    // console.log('[component] - reports - onSubmitForm');
    const params = { ...form.value };
    switch (params.dateType) {
      case 'day':
        params.currentDate = `${params.currentDate.year}-${params.currentDate.month < 10 ? '0' + params.currentDate.month : params.currentDate.month}-${params.currentDate.day < 10 ? '0' + params.currentDate.day : params.currentDate.day}`;
        break;
      case 'range':
        params.startDate = `${params.startDate.year}-${params.startDate.month < 10 ? '0' + params.startDate.month : params.startDate.month}-${params.startDate.day < 10 ? '0' + params.startDate.day : params.startDate.day}`;
        params.endDate = `${params.endDate.year}-${params.endDate.month < 10 ? '0' + params.endDate.month : params.endDate.month}-${params.endDate.day < 10 ? '0' + params.endDate.day : params.endDate.day}`;
        break;
    }
    this.reportService.getReportData(params).subscribe(resp => {
      this.barChartData = [];
      this.barChartLabels = [];
      const days = [];
      switch (params.dateType) {
        case 'day':
          resp.data.forEach(r => {
            this.barChartData.push({ data: [r.value], label: r.label });
            days.push(r.date);
          });
          this.barChartLabels = [...new Set(days)];
          break;
        case 'range':
          const data: object = {};
          resp.data.forEach(r => {
            if (!data.hasOwnProperty(r.label)) {
              data[r.label] = [];
            }
            data[r.label].push(r.value);
            days.push(r.date);
          });
          Object.entries(data).forEach(
            ([key, value]) => {
              this.barChartData.push({ data: value, label: key });
            });
          this.barChartLabels = [...new Set(days)];
          break;
      }
    });
  }


}
