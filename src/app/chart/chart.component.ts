import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GameDetails } from '../twitch/interfaces/twitch.interface';
import { TwitchService } from '../twitch/twitch.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data!: GameDetails[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  colors;
  lineChartData!: ChartConfiguration['data'];

  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: 'rgba(255,255,255,0.35)',
        },
      },
      'y-axis-0': {
        position: 'left',
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: 'rgba(255,255,255,0.35)',
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#FFFFFF',
        },
      },
    },
  };

  lineChartType: ChartType = 'line';

  constructor(private twitchService: TwitchService) {
    this.colors = this.twitchService.colors;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['data'] &&
      changes['data'].currentValue &&
      changes['data'].currentValue.length
    ) {
      const datasets = [
        ...this.data.map((values: GameDetails, index: number) => {
          return {
            data: this.lineChartData
              ? [...this.lineChartData.datasets[index].data, values.views]
              : [values.views],
            label: values.name,
            backgroundColor: this.colors[index].backgroundColor,
            borderColor: this.colors[index].pointBackgroundColor,
            pointBackgroundColor: this.colors[index].pointBackgroundColor,
            pointBorderColor: '#FFFFFF',
            pointHoverBackgroundColor: '#000',
            pointHoverBorderColor: this.colors[index].pointHoverBorderColor,
            fill: 'origin',
          };
        }),
      ];

      const now = new Date();

      const date = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const labels = this.lineChartData
        ? [...(this.lineChartData.labels as string[]), date]
        : [date];

      this.lineChartData = {
        datasets: datasets,
        labels: labels,
      };
    }
  }

  ngOnInit(): void {}
}
