const isEmpty = (value) => {
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
    }
    return true; // Consider other types as empty
}
const filterKeysWithLength = (data) => {
    const result = {};
    for (const key in data) {
        const value = data[key];
        if (typeof value === "object" && !Array.isArray(value)) {
            const filteredValue = filterKeysWithLength(value);
            if (Object.keys(filteredValue).length !== 0) {
                result[key] = filteredValue;
            }
        } else if (Array.isArray(value)) {
            const filteredList = value.filter(item => item.length !== 0);
            if (filteredList.length !== 0) {
                result[key] = filteredList;
            }
        } else if (value.length !== 0) {
            result[key] = value;
        }
    }
    return result;
}
module.exports = { isEmpty, filterKeysWithLength }