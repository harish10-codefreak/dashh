import {
    Chart,
    BarController,
    LineController,
    PieController,
    BarElement,
    LineElement,
    PointElement,
    ArcElement, // Changed from PieArcElement
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register all necessary components globally
  Chart.register(
    BarController,
    LineController,
    PieController,
    BarElement,
    LineElement,
    PointElement,
    ArcElement, // Changed from PieArcElement
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );