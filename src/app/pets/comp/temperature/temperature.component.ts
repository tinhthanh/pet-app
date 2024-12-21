import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";

  @Component({
    selector: 'app-temperature',
    templateUrl: 'temperature.component.html',
    styleUrl: 'temperature.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule],
    encapsulation: ViewEncapsulation.ShadowDom
  })
  export class TemperatureComponent implements OnInit {
    units: {[key: string]: string} = {
      Celcius: '°C',
      Fahrenheit: '°F'
    };

    config = {
      minTemp: -20,  // Giới hạn nhiệt độ tối thiểu
      maxTemp: 50,  // Giới hạn nhiệt độ tối đa
      unit: 'Celcius'
    };

    rangeValue: number = 37.8; // Initial range value
    temperatureHeight: number = 0; // Height of the temperature bar
    temperatureValue: string = '0°C'; // Temperature value displayed
    constructor(private cdf: ChangeDetectorRef) {

    }
    ngOnInit() {
      setTimeout(() => {
        this.updateTemperature();
        this.cdf.detectChanges();
      }
      , 1000);
    }

    updateTemperature() {
      const { minTemp, maxTemp, unit } = this.config;
      this.temperatureHeight = ((this.rangeValue - minTemp) / (maxTemp - minTemp)) * 100;
      this.temperatureValue = this.rangeValue + this.units[unit];
    }

    toggleUnit() {
      this.config.unit = this.config.unit === 'Celcius' ? 'Fahrenheit' : 'Celcius';
      this.updateTemperature();
    }

    onMinMaxChange(field: 'minTemp' | 'maxTemp') {
      const value = parseFloat(this.config[field] as unknown as string);
      if (isNaN(value)) {
        // Nếu giá trị không hợp lệ, quay lại giá trị mặc định
        this.config[field] = field === 'minTemp' ? 30 : 50;
      } else {
        // Nếu giá trị hợp lệ, cập nhật lại
        if (field === 'minTemp' && this.rangeValue < value) {
          this.rangeValue = value;
        }
        if (field === 'maxTemp' && this.rangeValue > value) {
          this.rangeValue = value;
        }
        this.updateTemperature();
      }
    }

  }
