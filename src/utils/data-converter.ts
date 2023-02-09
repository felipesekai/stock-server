export function formatDate() {
    let date = new Date()
    let format = ((date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()))
    return format
}
