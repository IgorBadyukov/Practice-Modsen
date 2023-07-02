import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBackgroundWeather]",
})
export class BackgroundWeatherDirective implements OnChanges {
  @Input() weatherID: string | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    switch (this.weatherID) {
      case "01d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/clear-sky.png)"
        );
        break;
      case "02d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/few-clouds.png"
        );
        break;
      case "03d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/scattered-clouds.png"
        );
        break;
      case "04d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/broken-clouds.png"
        );
        break;
      case "09d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/shower-rain.png"
        );
        break;
      case "10d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/rain.png"
        );
        break;
      case "11d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/thunderstorm.png"
        );
        break;
      case "13d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/snow.png"
        );
        break;
      case "50d":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/thunderstorm.png"
        );
        break;
      case "01n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/clear-sky.png)"
        );
        break;
      case "02n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/few-clouds.png"
        );
        break;
      case "03n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/scattered-clouds.png"
        );
        break;
      case "04n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/broken-clouds.png"
        );
        break;
      case "09n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/shower-rain.png"
        );
        break;
      case "10n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/rain.png"
        );
        break;
      case "11n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/thunderstorm.png"
        );
        break;
      case "13n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/snow.png"
        );
        break;
      case "50n":
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/thunderstorm.png"
        );
        break;
      default:
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          "background-image",
          "url(assets/background-window/default.png"
        );
        break;
    }
  }
}
