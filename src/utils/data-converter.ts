export const formatDate = () => {
    let date = new Date()
    return ((date.getFullYear() + "-" + pad2((date.getMonth() + 1)) + "-" + pad2(date.getDate())))
}

// export const DateFormat = (date) => {
//     return ((date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate())))
// }

//colocando 0 antes do dia e ano caso eles sejam apenas de um digito 0-9
const pad2 = (n: number) => {
    return (n < 10 ? '0' : '') + n;
}
