import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, CommonModule], // Add CommonModule for *ngIf
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isBrowser: boolean;

  // Bar Chart
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: { x: {}, y: { beginAtZero: true } }
  };
  barChartType = 'bar' as const;
  barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{ data: [65, 59, 80, 81, 56], label: 'Sales' }]
  };

  // Line Chart
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: { x: {}, y: { beginAtZero: true } }
  };
  lineChartType = 'line' as const;
  lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{ data: [28, 48, 40, 19, 86], label: 'Visits', tension: 0.4 }]
  };

  // Pie Chart
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true
  };
  pieChartType = 'pie' as const;
  pieChartData: ChartData<'pie'> = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [{ data: [300, 500, 100] }]
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Fetch real data here if needed
  }
}