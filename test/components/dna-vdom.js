import { DNAMixedComponent } from '../../src/dna-mixed-component.js';
import { DNAPropertiesComponent } from '../../src/dna-properties-component.js';
import { DNAVDomComponent } from '../../src/extra/dna-vdom-component.js';

class TestComponent extends DNAMixedComponent {
    static get behaviors() {
        return [DNAPropertiesComponent, DNAVDomComponent];
    }
    static get properties() {
        return ['name', 'lastName', 'title'];
    }
    get fullname() {
        return `${this.name ? `${this.name} ` : ''}${this.lastName || ''}`;
    }
}

export class TestComponent1 extends TestComponent {
    static get template() {
        return function() {
            return `${this.title ? `<h1>${this.title}</h1><br>` : ''}Hello, ${this.fullname}`;
        };
    }
}

export class TestComponent2 extends TestComponent {
    static get template() {
        return '<span class="dna-test">Hello DNA!</span>';
    }
}

export class TestComponent3 extends TestComponent {
    static get template() {
        return '<span class="dna-test">Hello DNA!</span>';
    }
}

export class TestComponent4 extends TestComponent {
    static get template() {
        let elem = document.createElement('template');
        elem.innerHTML = '<span class="dna-test">Hello DNA!</span>';
        return elem;
    }
}

export class TestComponent5 extends TestComponent {
    static get template() {
        let elem = document.createElement('template');
        elem.innerHTML = '<span class="dna-test">Hello DNA!</span><span>Hello World!</span>';
        return elem;
    }
}

export class TestComponent6 extends TestComponent {
    static get template() {
        return 4;
    }
}

export class TestComponent7 extends TestComponent {
    static get properties() {
        return ['radius'];
    }
    static get template() {
        return function() {
            return `
                <svg>
                    <circle r="${this.radius}" stroke="black" stroke-width="3" fill="red" />
                </svg>
            `;
        };
    }
}
