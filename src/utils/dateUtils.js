export const formatDate = (time) => {
    if (!time) return ''
    let date = new Date(time)
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    return date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}