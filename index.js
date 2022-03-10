(function () {
    const sk = function () {
        const __store = {};
        const __selectors = {};
        const __classes = {};

        const add = (name, value) => {
            let localValue = value
            __selectors[name] = []
            __classes[name] = []
            Object.defineProperty(__store, name, {
                enumerable: true,
                get: () => localValue,
                set: (newValue) => {
                    localValue = newValue

                    const selectors = __selectors[name]
                    selectors.length !== 0 && selectors.forEach((selector) => {
                        const el = document.querySelector(selector)

                        el.innerText = newValue
                    })

                    const classes = __classes[name]
                    classes.length !== 0 && classes.forEach(([element, className, condition]) => {
                        condition(Object.assign({}, __store)) ? element.classList.add(className) : element.classList.remove(className)
                    })
                }
            })
            return this
        }

        const change = (name, callbackOrValue) => {
            if (typeof callbackOrValue === 'function') {
                __store[name] = callbackOrValue(__store[name])
            } else {
                __store[name] = callbackOrValue
            }
            return this
        }

        const bind = (selector, name) => {
            __selectors[name].push(selector);

            const element = document.querySelector(selector);

            element.innerText = __store[name]

            return this
        }
//attrbiteValue - string | object | array
        const bindAttribute = (element, attribute, attributeValue) => {
            let attributeResultValue = null;
            if (typeof attributeValue === 'string') {
                attributeResultValue = attributeValue
            } else if (attributeValue && typeof attributeValue === 'object') {
                const objectParseFunction = (obj) => {
                    Object.entries(obj).reduce((acc, [name, callback]) => {
                        if (typeof callback === 'function' && callback(__store)) {
                            acc.push(name)
                        }
                        return acc
                    }, [])
                }

                if (Array.isArray(attributeValue)) {
                    attributeResultValue = attrbiteValue.reduce((acc, el) => {
                        if (el && typeof el === 'object') {
                            acc.concat(objectParseFunction(el))
                        } else if (typeof el === 'string') {
                            acc.push(el)
                        }
                        return acc
                    }, []).join(' ')
                } else {
                    attributeResultValue = objectParseFunction(el).join(' ')
                }
            }
            element.setAttribute(attribute, attributeResultValue)
            
            const result = conditionCallback(Object.assign({}, __store))
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
            bindAttribute
        })

        return this
    }
    window.__sk__ = sk
})()