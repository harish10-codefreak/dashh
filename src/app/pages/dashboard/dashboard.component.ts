import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('campaignPieCanvas') campaignPieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('vehiclePieCanvas') vehiclePieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('campaignBarCanvas') campaignBarCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('vehicleBarCanvas') vehicleBarCanvas!: ElementRef<HTMLCanvasElement>;

  private campaignPieChart!: Chart;
  private vehiclePieChart!: Chart;
  private campaignBarChart!: Chart;
  private vehicleBarChart!: Chart;

  username = 'ajaz@mycariq.com';
  password = 'e10adc3949ba59abbe56e057f20f883e';
  twoFAResult: any;

  securityKey = '7208';
  securedActionId = '57311243';
  otpResult: any;

  loading = { twoFA: false, otp: false, campaign: true, vehicle: true };
  error = { twoFA: '', otp: '', campaign: '', vehicle: '' };
  chartsInitialized = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchCampaignStatus();
    this.fetchVehicleMakeModel();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    // Delay initialization to ensure canvases are rendered
    setTimeout(() => this.initializeChartsIfReady(), 100);
  }

  authenticate() {
    this.loading.twoFA = true;
    this.error.twoFA = '';
    this.apiService.authenticate2FA(this.username, this.password).subscribe({
      next: (res) => {
        console.log('2FA Response:', res);
        this.twoFAResult = res;
        this.loading.twoFA = false;
      },
      error: (err) => {
        console.error('2FA Error:', err);
        this.error.twoFA = 'Authentication failed: ' + err.message;
        this.loading.twoFA = false;
      }
    });
  }

  verifyOTP() {
    this.loading.otp = true;
    this.error.otp = '';
    this.apiService.verifyOTP(this.securityKey, this.securedActionId).subscribe({
      next: (res) => {
        console.log('OTP Response:', res);
        this.otpResult = res;
        this.loading.otp = false;
      },
      error: (err) => {
        console.error('OTP Error:', err);
        this.error.otp = 'OTP verification failed: ' + err.message;
        this.loading.otp = false;
      }
    });
  }

  fetchCampaignStatus() {
    this.loading.campaign = true;
    this.error.campaign = '';
    this.apiService.getCampaignStatus().subscribe({
      next: (res) => {
        console.log('Campaign Status Response:', res);
        this.processCampaignData(res);
        this.loading.campaign = false;
        this.initializeChartsIfReady();
      },
      error: (err) => {
        console.error('Campaign Status Error:', err);
        this.error.campaign = 'Failed to fetch campaign status: ' + err.message;
        this.loading.campaign = false;
        this.initializeChartsIfReady();
      }
    });
  }

  fetchVehicleMakeModel() {
    this.loading.vehicle = true;
    this.error.vehicle = '';
    this.apiService.getVehicleMakeModel().subscribe({
      next: (res) => {
        console.log('Vehicle Make/Model Response:', res);
        this.processVehicleData(res);
        this.loading.vehicle = false;
        this.initializeChartsIfReady();
      },
      error: (err) => {
        console.error('Vehicle Make/Model Error:', err);
        this.error.vehicle = 'Failed to fetch vehicle data: ' + err.message;
        this.loading.vehicle = false;
        this.initializeChartsIfReady();
      }
    });
  }

  private initializeChartsIfReady() {
    if (!this.loading.campaign && !this.loading.vehicle && !this.chartsInitialized) {
      console.log('Initializing charts...');
      console.log('Canvas Refs - Campaign Pie:', this.campaignPieCanvas?.nativeElement);
      console.log('Canvas Refs - Vehicle Pie:', this.vehiclePieCanvas?.nativeElement);
      console.log('Canvas Refs - Campaign Bar:', this.campaignBarCanvas?.nativeElement);
      console.log('Canvas Refs - Vehicle Bar:', this.vehicleBarCanvas?.nativeElement);
      if (this.campaignPieCanvas && this.vehiclePieCanvas && this.campaignBarCanvas && this.vehicleBarCanvas) {
        this.initCharts();
        this.chartsInitialized = true;
        console.log('Charts Initialized:', {
          campaignPie: !!this.campaignPieChart,
          vehiclePie: !!this.vehiclePieChart,
          campaignBar: !!this.campaignBarChart,
          vehicleBar: !!this.vehicleBarChart
        });
      } else {
        console.warn('Canvas elements not available, retrying...');
        setTimeout(() => this.initializeChartsIfReady(), 500); // Increased delay
      }
    }
  }

  private initCharts() {
    console.log('initCharts called');
    this.campaignPieChart = new Chart(this.campaignPieCanvas.nativeElement, {
      type: 'pie',
      data: { labels: [], datasets: [{ data: [], backgroundColor: ['#4CAF50', '#F44336', '#FF9800'] }] },
      options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });

    this.vehiclePieChart = new Chart(this.vehiclePieCanvas.nativeElement, {
      type: 'pie',
      data: { labels: [], datasets: [{ data: [], backgroundColor: ['#2196F3', '#9C27B0', '#FFEB3B'] }] },
      options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });

    this.campaignBarChart = new Chart(this.campaignBarCanvas.nativeElement, {
      type: 'bar',
      data: { labels: [], datasets: [{ data: [], label: 'Campaign Status', backgroundColor: '#4CAF50' }] },
      options: { responsive: true, scales: { x: { stacked: false }, y: { stacked: false, beginAtZero: true } }, plugins: { legend: { display: false } } }
    });

    this.vehicleBarChart = new Chart(this.vehicleBarCanvas.nativeElement, {
      type: 'bar',
      data: { labels: [], datasets: [{ data: [], label: 'Vehicle Count', backgroundColor: '#2196F3' }] },
      options: { responsive: true, scales: { x: { stacked: false }, y: { stacked: false, beginAtZero: true } }, plugins: { legend: { display: false } } }
    });

    // Re-process any fetched data
    if (this.campaignPieChart && this.campaignBarChart) {
      this.fetchCampaignStatus();
    }
    if (this.vehiclePieChart && this.vehicleBarChart) {
      this.fetchVehicleMakeModel();
    }
  }

  private processCampaignData(data: any) {
    const labels = Object.keys(data);
    const values = Object.values(data) as number[];
    console.log('Processing Campaign Data - Labels:', labels, 'Values:', values);
    if (this.campaignPieChart) {
      this.campaignPieChart.data.labels = labels;
      this.campaignPieChart.data.datasets[0].data = values;
      this.campaignPieChart.update('active');
      console.log('Campaign Pie Chart Updated');
    } else {
      console.warn('Campaign Pie Chart not initialized yet');
    }
    if (this.campaignBarChart) {
      this.campaignBarChart.data.labels = labels;
      this.campaignBarChart.data.datasets[0].data = values;
      this.campaignBarChart.update('active');
      console.log('Campaign Bar Chart Updated');
    } else {
      console.warn('Campaign Bar Chart not initialized yet');
    }
  }

  private processVehicleData(data: any) {
    const labels: string[] = [];
    const values: number[] = [];
    for (const make in data) {
      if (data[make]['count']) {
        labels.push(make);
        values.push(data[make]['count']);
      }
    }
    console.log('Processing Vehicle Data - Labels:', labels, 'Values:', values);
    if (this.vehiclePieChart) {
      this.vehiclePieChart.data.labels = labels;
      this.vehiclePieChart.data.datasets[0].data = values;
      this.vehiclePieChart.update('active');
      console.log('Vehicle Pie Chart Updated');
    } else {
      console.warn('Vehicle Pie Chart not initialized yet');
    }
    if (this.vehicleBarChart) {
      this.vehicleBarChart.data.labels = labels;
      this.vehicleBarChart.data.datasets[0].data = values;
      this.vehicleBarChart.update('active');
      console.log('Vehicle Bar Chart Updated');
    } else {
      console.warn('Vehicle Bar Chart not initialized yet');
    }
  }
}