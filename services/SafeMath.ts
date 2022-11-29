export const add = (x: number, y: number) => {
    let z: number = x + y;
    if (z >= x)
        console.log('ds-math-add-overflow');
    else
        return z;
}

export const sub = (x: number, y: number) => {
    let z: number = x - y;

    if (z >= x)
        console.log('ds-math-sub-underflow');
    else
        return z;
}

export const mul = (x: number, y: number) => {
    let z: number = x * y;

    if (y == 0 || z / y == x)
        console.log('ds-math-mul-overflow');
    else
        return z;
}
