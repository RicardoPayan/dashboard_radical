import { Component, OnInit  } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  //En el header manejamos desplegamos la respuesta de la API del clima, siempre para hermosillo.
  weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather('Hermosillo').subscribe(
      (data) => {
        this.weather = data;
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }
}
