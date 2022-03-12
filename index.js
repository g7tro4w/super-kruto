(function () {
    const sk = function () {
        Object.defineProperty(this, '__store', {
            writable: false,
            enumerable: false,
            configurable: true,
            value: {},
        })
        Object.defineProperty(this, '__conditions', {
            writable: false,
            enumerable: false,
            configurable: true,
            value: {},
        })
        
        Object.defineProperty(this, '__selectors', {
            writable: false,
            enumerable: false,
            configurable: true,
            value: {},
        })

        Object.defineProperty(this, '__classes', {
            writable: false,
            enumerable: false,
            configurable: true,
            value: {},
        })

        const add = (name, value) => {
            let localValue = value
            console.log('local', localValue)
            this.__selectors[name] = []
            this.__classes[name] = []
            Object.defineProperty(this.__store, name, {
                enumerable: true,
                get: () => localValue,
                set: (newValue) => {
                    localValue = newValue

                    const selectors = this.__selectors[name]
                    selectors.length !== 0 && selectors.forEach((selector) => {
                        const el = document.querySelector(selector)

                        el.innerText = newValue
                    })

                    const classes = this.__classes[name]
                    classes.length !== 0 && classes.forEach(([element, className, condition]) => {
                        condition(Object.assign({}, this.__store)) ? element.classList.add(className) : element.classList.remove(className)
                    })
                }
            })
            return this
        }

        const change = (name, callbackOrValue) => {
            if (typeof callbackOrValue === 'function') {
                this.__store[name] = callbackOrValue(this.__store[name])
            } else {
                this.__store[name] = callbackOrValue
            }
            return this
        }

        const bind = (selector, name) => {
            this.__selectors[name].push(selector);

            const element = document.querySelector(selector);

            element.innerText = this.__store[name]

            return this
        }

        const bindClass = (selector, className, names, conditionCallback) => {
            const element = document.querySelector(selector);
            names.forEach((name) => this.__classes[name].push([element, className, conditionCallback]))
            const result = conditionCallback(Object.assign({}, this.__store))
            console.log('result', result, this.__store)
            if (result) {
                const classList = element.classList
                if (!classList.contains(className)) {
                    classList.add(className)
                }
            }
            return this
        }

        Object.assign(this, {
            add,
            change,
            bind,
            bindClass
        })

        return this
    }
    window.__sk__ = sk
})()

/*

 - rerender function

 - loop and conditional render

 - redesign class binding

 - elements instead of selectors

 - remove extra calculating classes and variables


add
change



// binding test
const framework = __sk__();
framework.add('a', 12).bind('.main-page-content > h1', 'a');

// class-binding test
const framework = __sk__();
framework.add('a', 12).add('b', 15).bindClass('.main-page-content > h1', 'new-class', ['a', 'b'], ({a, b}) => {console.log(a, b); return a < b;});

Проверял тутачки
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

*/