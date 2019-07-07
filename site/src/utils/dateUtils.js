export function parseDate(tempDate){
    var date = new Date(tempDate);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    hours = (hours > 9) ? hours : '0'+ hours;
    var mins = date.getMinutes();
    mins = (mins > 9) ? mins : '0'+ mins;
    var str = month + ' ' + day + ',' + date.getFullYear() + ' | '  + hours + ':' + mins;
    return str;
}