export function formatDate(date: Date) {
    return date.getDate() + "." + date.getMonth() + " " + date.getHours();
}

export function formatDateFromString(dateString: string) {
    const date = new Date(dateString);

    let hoursMin = date.toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return [date.toLocaleDateString("cs-CZ"), hoursMin];
}
