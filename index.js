(function () {
    const sk = function () {
        Object.defineProperty(this, '__store', {
            writable: false,
            enumerable: false,
            configurable: true,
            value: {},
        })

        const add = (name, value) => {
            this.__store[name] = {}
            this.__store[name].__value = value

            Object.defineProperty(this.__store[name], 'value', {
                get: () => this.__store[name].__value,
                set: (newValue) => {
                    this.__store[name].__value = newValue

                    const selectors = this.__store[name].__selectors
                    if (selectors.length === 0) return;
                    selectors.forEach((selector) => {
                        const el = document.querySelector(selector)

                        el.innerText = newValue
                    })
                }
            })

            Object.defineProperty(this.__store[name], '__selectors', {
                writable: false,
                enumerable: false,
                configurable: true,
                value: [],
            })

            return this
        }

        const change = (name, value) => {
            this.__store[name].value = value

            return this
        }

        const bind = (selector, name) => {
            this.__store[name].__selectors.push(selector);

            const element = document.querySelector(selector);

            element.innerText = this.__store[name].value
        }

        Object.assign(this, {
            add,
            change,
            bind
        })

        return this
    }
    window.__sk__ = sk
})()

/*

1. selector
2. data
3. callback


add
change

const frameWork = __sk__();
frameWork.add('a', 12).bind('.main-page-content > h1', 'a');

Проверял тутачки
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

*/