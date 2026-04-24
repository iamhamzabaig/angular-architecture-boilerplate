import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiShellComponent } from '@boilerplate/ui-shell';

@Component({
  imports: [RouterOutlet, UiShellComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  protected readonly title = 'Angular Enterprise Boilerplate';
}
