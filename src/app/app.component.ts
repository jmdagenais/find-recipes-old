import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('fr');
    translateService.use('fr');
  }

  switchLang(lang): void {
    this.translateService.use(lang);
  }

  isEnglish(): boolean {
    return this.translateService.currentLang == 'en';
  }

  isFrench(): boolean {
    return this.translateService.currentLang == 'fr';
  }
}
