function throttle(fn, wait) {
    const now = () => new Date().getTime();
    let start = now();
    return (...args) => {
        let now = now();
        if (now - start >= wait) {
            start = now;
            fn.apply(this, args);
        }
    }
}