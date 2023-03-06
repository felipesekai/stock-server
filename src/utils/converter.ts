export function convertHoursStringToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number);

    const minutesAmmount = (hours * 60) + minutes;
    return minutesAmmount;
}

export function convertMinutesToHoursString(min: number) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getHour() {
    const date = new Date()
    let format = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    return format;
}