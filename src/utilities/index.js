export function formatCurrency(currency) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(currency);
};

export function isScoopQuantityInvalid(value) {
    return value < 0 || value > 10 || (value !== undefined && value % 1 !== 0) || isNaN(value);
};