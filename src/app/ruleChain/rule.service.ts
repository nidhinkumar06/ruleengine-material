import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuleListResponse, AddRuleParams } from './rule.model';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }


  fetchRules(): Observable<RuleListResponse[]> {
    return this.http
      .get<RuleListResponse[]>(`${this.url}/v1/rules`);
  }

  addRules(params: AddRuleParams): Observable<RuleListResponse> {
    return this.http.post<RuleListResponse>(`${this.url}/v1/rules`, params);
  }

  updateRule(params: AddRuleParams, id: number) {
    return this.http.put<RuleListResponse>(`${this.url}/v1/rules/${id}`, params);
  }

  getRuleDataById(id: number) {
    return this.http.get<RuleListResponse>(`${this.url}/v1/rules/${id}`);
  }

  deleteRule(params: any) {
    return this.http.delete(`${this.url}/v1/rules`, { params });
  }

  fetchActions() {
    return this.http.get<any>(`${this.url}/v1/actions`);
  }

  createRuleEngine(params: any) {
    return this.http.post<any>(`${this.url}/v1/rule_details`, params);
  }

  updateRuleEngine(params: any, id: number) {
    return this.http.put<any>(`${this.url}/v1/rule_details/${id}`, params);
  }

  fetchRuleById(params: any) {
    return this.http.get<any>(`${this.url}/v1/rule_details?rule_id=${params.rule_id}`);
  }

}
