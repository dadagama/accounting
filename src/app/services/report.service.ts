import { Injectable } from '@angular/core';
import { GetResponse } from '../interfaces/APIResponses';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(protected apiService: APIService) {
    // console.log('[service] - report - constructor');
  }

  getReportData(params: { [x: string]: string | number | boolean; }): Observable<GetResponse> {
    // console.log('[service] - report - getReportData');
    return this.apiService.getReportData(params);
  }
}
