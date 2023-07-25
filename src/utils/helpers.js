export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100)
}

export const getUniqueValues = (products, key) => {
    let uniqueValues = products.map(product => product[key]);
    if (key === 'colors') {
        uniqueValues = uniqueValues.flat();
    }
    return ['all', ...new Set(uniqueValues)];
}
