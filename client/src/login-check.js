const isChrome = () => {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

const isFirefox = () => {
    return typeof InstallTrigger !== 'undefined';
}

const check = () => {
    return new Promise((resolve, reject) => {
        const res = {
            browserCheck: false,
            extensionCheck: false,
            loginCheck: false,
        }
        res.browserCheck = isChrome() || isFirefox()
        res.extensionCheck = window.metamask.isInstall()
        if (res.extensionCheck) {
            window.metamask.isLocked().then(locked => {
                res.loginCheck = !locked
                resolve(res)
            })
        } else {
            resolve(res)
        }
    })
}

export { check }