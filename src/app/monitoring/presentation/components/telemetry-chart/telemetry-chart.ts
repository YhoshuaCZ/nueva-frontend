import {Component, computed, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Reading} from '../../../domain/model/reading.entity';

/**
 * Point of the chart in SVG coordinates.
 */
interface ChartPoint {
  x: number;
  y: number;
  reading: Reading;
  outOfRange: boolean;
}

const WIDTH = 600;
const HEIGHT = 220;
const LEFT = 40;
const RIGHT = 590;
const TOP = 12;
const BOTTOM = 196;

/**
 * Line chart of the readings of a sensor, with its acceptable range and the out-of-range readings.
 */
@Component({
  selector: 'app-telemetry-chart',
  imports: [DatePipe],
  template: `
    @if (points().length) {
      <svg [attr.viewBox]="'0 0 ' + width + ' ' + height" role="img" [attr.aria-label]="label()">
        <rect [attr.x]="left" [attr.y]="y(upper())" [attr.width]="right - left" [attr.height]="y(lower()) - y(upper())" class="band"/>
        <line [attr.x1]="left" [attr.x2]="right" [attr.y1]="y(upper())" [attr.y2]="y(upper())" class="limit"/>
        <line [attr.x1]="left" [attr.x2]="right" [attr.y1]="y(lower())" [attr.y2]="y(lower())" class="limit"/>
        <text [attr.x]="right - 4" [attr.y]="y(upper()) - 5" class="limit-label" text-anchor="end">{{ upper() }} {{ unit() }}</text>
        <text [attr.x]="right - 4" [attr.y]="y(lower()) + 14" class="limit-label" text-anchor="end">{{ lower() }} {{ unit() }}</text>
        @for (tick of ticks(); track tick) {
          <text [attr.x]="left - 8" [attr.y]="y(tick) + 4" class="axis" text-anchor="end">{{ tick }}</text>
        }
        <polyline [attr.points]="polyline()" class="line"/>
        @for (point of points(); track point.reading.id) {
          <circle [attr.cx]="point.x" [attr.cy]="point.y" [attr.r]="point.outOfRange ? 5 : 3" [class.alert]="point.outOfRange" class="dot"/>
        }
        @if (peak(); as top) {
          <text [attr.x]="top.x + 8" [attr.y]="top.y + 4" class="peak">{{ top.reading.value }} {{ unit() }} · {{ top.reading.recordedAt | date: 'HH:mm' : 'UTC' }} UTC</text>
        }
        @for (point of axisPoints(); track point.reading.id) {
          <text [attr.x]="point.x" [attr.y]="height - 4" class="axis" text-anchor="middle">{{ point.reading.recordedAt | date: 'HH:mm' : 'UTC' }}</text>
        }
      </svg>
    } @else {
      <p class="empty">{{ emptyText() }}</p>
    }`,
  styles: `
    :host { display: block; padding: 12px; border-radius: 8px; background: var(--gray-bg); }
    svg { display: block; width: 100%; height: auto; }
    .band { fill: var(--mint); }
    .limit { stroke: var(--danger); stroke-width: 1; }
    .limit-label { fill: var(--teal); font-size: 11px; }
    .axis { fill: var(--slate); font-size: 11px; }
    .line { fill: none; stroke: var(--teal); stroke-width: 2; }
    .dot { fill: var(--teal); }
    .dot.alert { fill: var(--danger); }
    .peak { fill: var(--danger); font-size: 12px; font-weight: 600; }
    .empty { margin: 24px 0; color: var(--muted); text-align: center; }
  `
})
export class TelemetryChart {
  protected readonly width = WIDTH;
  protected readonly height = HEIGHT;
  protected readonly left = LEFT;
  protected readonly right = RIGHT;

  /** Readings to draw, oldest first. */
  readonly readings = input.required<Reading[]>();

  /** Lower acceptable limit. */
  readonly lower = input.required<number>();

  /** Upper acceptable limit. */
  readonly upper = input.required<number>();

  /** Unit of the readings. */
  readonly unit = input<string>('');

  /** Accessible description of the chart. */
  readonly label = input<string>('Telemetry chart');

  /** Text shown when there are no readings. */
  readonly emptyText = input<string>('No IoT data is associated.');

  /** Lowest and highest values of the vertical axis. */
  private readonly range = computed(() => {
    const values = this.readings().map(reading => reading.value);
    const span = this.upper() - this.lower();
    return {
      min: Math.floor(Math.min(this.lower() - span * 0.4, ...values)),
      max: Math.ceil(Math.max(this.upper() + span * 0.4, ...values))
    };
  });

  /** Readings as chart points. */
  protected readonly points = computed<ChartPoint[]>(() => {
    const readings = this.readings();
    const step = readings.length > 1 ? (RIGHT - LEFT) / (readings.length - 1) : 0;
    return readings.map((reading, index) => ({
      x: LEFT + step * index,
      y: this.y(reading.value),
      reading,
      outOfRange: reading.value < this.lower() || reading.value > this.upper()
    }));
  });

  /** Points of the line. */
  protected readonly polyline = computed(() => this.points().map(point => `${point.x},${point.y}`).join(' '));

  /** Highest out-of-range point, labelled in the chart. */
  protected readonly peak = computed(() =>
    this.points().filter(point => point.outOfRange).sort((a, b) => b.reading.value - a.reading.value)[0]);

  /** Points labelled on the time axis. */
  protected readonly axisPoints = computed(() => {
    const points = this.points();
    const every = Math.max(1, Math.ceil(points.length / 5));
    return points.filter((_, index) => index % every === 0);
  });

  /** Values labelled on the vertical axis. */
  protected readonly ticks = computed(() => {
    const {min, max} = this.range();
    return [min, this.lower(), this.upper(), max].filter((value, index, all) => all.indexOf(value) === index);
  });

  /**
   * Vertical SVG coordinate of a value.
   * @param value - Reading value.
   */
  protected y(value: number): number {
    const {min, max} = this.range();
    return BOTTOM - ((value - min) / (max - min || 1)) * (BOTTOM - TOP);
  }
}
