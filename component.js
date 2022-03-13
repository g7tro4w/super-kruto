(function () {
    const parseName = (name) => {
        return name
    }

    const factory = function (name, html, injectToElement) {
        class ComponentClass extends HTMLElement {
            render () {
                this.isRendered = true;
                this.innerHTML = html
            }

            connectedCallback () {
                if (!this.isRendered) {
                    this.render();
                }
            }

            // static get observedAttributes() {
            //     return [];
            // }
            // attributeChangedCallback(name, oldValue, newValue) {
            // }
        }

        customElements.define(parseName(name), ComponentClass);
    }
    window.__componentCreator__ = factory
})()