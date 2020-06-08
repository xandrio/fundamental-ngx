import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fdp-object-marker',
  templateUrl: './object-marker.component.html',
  styleUrls: ['./object-marker.component.scss']
})
export class ObjectMarkerComponent {

    /**
     * Glyph (icon) of the Object Status.
     */
    @Input()
    glyph: string;

    /** Whether the Object Status is clickable. */
    @Input()
    clickable: boolean = false;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: string = null;
}
