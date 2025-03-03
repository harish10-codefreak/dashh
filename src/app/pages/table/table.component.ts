import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataService, TableData } from '../../services/table-data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableData: TableData[] = [];
  loading = true;

  constructor(private tableDataService: TableDataService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.tableDataService.getTableData().subscribe({
      next: (data) => {
        // Add mock status since API doesn't provide it
        this.tableData = data.map(item => ({
          ...item,
          status: Math.random() > 0.5 ? 'Active' : 'Inactive' // Random status for demo
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.tableData = [];
        this.loading = false;
      }
    });
  }
}