// separate-file.js
export function Amount(priceCents) {
    // We name the parameter 'priceCents' so we can use it directly
    return `$${(priceCents / 100).toFixed(2)}`;
}