import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-ui-shell',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  templateUrl: './ui-shell.html',
  styleUrl: './ui-shell.scss',
})
export class UiShellComponent {
  readonly title = input.required<string>();
}
