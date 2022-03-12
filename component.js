(function () {
    const factory = function (name, html, injectToElement) {
        injectToElement.innerHtml = html
    }
    window.__componentCreator__ = factory
})()