import { DNAComponent } from '../../src/dna-component.js';

export class TestComponent extends DNAComponent {
    createdCallback() {
        this.created = true;
        super.createdCallback();
    }

    attachedCallback() {
        this.attached = true;
        super.attachedCallback();
    }

    detachedCallback() {
        this.attached = false;
        super.detachedCallback();
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal;
        super.attributeChangedCallback(attr, oldVal, newVal);
    }
}
