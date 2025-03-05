import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/Cariq'; // Proxy path

  constructor(private http: HttpClient) {}

  getCampaignStatus(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWphekBteWNhcmlxLmNvbTplMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZQ==',
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });
    return this.http.get(`${this.baseUrl}/rvm/distribution/campaign/count/status`, { headers });
  }

  getVehicleMakeModel(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWphekBteWNhcmlxLmNvbTplMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZQ==',
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });
    return this.http.get(`${this.baseUrl}/cars/admin/grouped/makemodel/count`, { headers });
  }

  authenticate2FA(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic Y2FyaXFhZG1pbjo1NDUzZjgyOGZiNDEzMTc1ZWQyZjBlOTkxYThjMDdiZQ==',
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/admin/authenticate/2fa`, body, { headers });
  }

  verifyOTP(securityKey: string, securedActionId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic Y2FyaXFhZG1pbjo1NDUzZjgyOGZiNDEzMTc1ZWQyZjBlOTkxYThjMDdiZQ==',
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });
    const body = { securityKey, securedActionId };
    return this.http.post(`${this.baseUrl}/security/action/execute`, body, { headers });
  }
}