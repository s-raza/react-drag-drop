export function diff (first, second) {
    const a = new Set(first);
    const b = new Set(second);
    const difference = new Set([...a].filter(x => !b.has(x)));

    return ([...difference])
}
    
export function intersection (first, second) {
    const a = new Set(first);
    const b = new Set(second);
    const intersection = new Set([...a].filter(x => b.has(x)));

    return ([...intersection])
}
    
    
export function union(first, second) {
    const a = new Set(first);
    const b = new Set(second);
    const union = new Set([...a, ...b]);

    return ([...union])
}

export function arrayItemsSame(first, second) {
    const first_in_second = diff(first, second)
    const second_in_first = diff(second, first)

    return (first_in_second.length === 0) && (second_in_first.length === 0)
}

