import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hspace',
  templateUrl: './horizontal-spacing.component.html'
})
export class HorizontalSpacingComponent {

  @Input() public amount: number;

}
