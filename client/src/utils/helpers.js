export function formatDate(date){
    return new Intl.DateTimeFormat('no').format(date)
}