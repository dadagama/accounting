import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public message;
  public class;

  constructor(public apiService: APIService) { }

  ngOnInit() {
  }

  backup() {
    this.message = 'Ejecutando...';
    this.class = 'text-primary';
    this.apiService.backup('camls').subscribe(resp => {
      console.log('backup resp:', resp);
      this.message = 'OK';
      this.class = 'text-success';
    },
    error => {
      console.log('backup error:', error);
      this.message = error.message;
      this.class = 'text-danger';
    });
  }
}
