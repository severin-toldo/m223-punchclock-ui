import {Component, Input, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

@Component({
  selector: 'app-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss']
})
export class IconCardComponent implements OnInit {

  @Input() public icon: IconDefinition;
  @Input() public route: string[];
  @Input() public cardText: string;


  constructor() {
  }

  public ngOnInit(): void {
  }

}
