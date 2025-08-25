import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [TitleCasePipe],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tag {
  tag = input.required<string | undefined>();
}
