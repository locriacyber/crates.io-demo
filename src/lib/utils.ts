export function formatNum(x: number): string {
    var raw_number = `${x}`;
    var result = '';
    while (raw_number.length > 0) {
        if (raw_number.length > 3) {
            result = raw_number.substring(raw_number.length - 3) + ',' + result;
            raw_number = raw_number.substring(0, raw_number.length - 3);
        } else {
            result = raw_number + ',' + result;
            raw_number = '';
        }
    }
    return result.substring(0, result.length - 1);
}

export function getURI(part1: string, part2: string): string {
    return `${part1}/${part2}`; // stub
}

export function getRoute(route: string): string {
    return route; // NOOP
}
