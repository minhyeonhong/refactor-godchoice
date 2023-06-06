
const getDate = new Date();
const month = (getDate.getMonth() + 1) < 10 ? "0" + (getDate.getMonth() + 1) : (getDate.getMonth() + 1);
const day = getDate.getDate() < 10 ? "0" + getDate.getDate() : getDate.getDate();
const hours = getDate.getHours() < 10 ? "0" + getDate.getHours() : getDate.getHours();
const minutes = getDate.getMinutes() < 10 ? "0" + getDate.getMinutes() : getDate.getMinutes();
const seconds = getDate.getSeconds() < 10 ? "0" + getDate.getSeconds() : getDate.getSeconds();

export const today = `${getDate.getFullYear()}-${month}-${day}`;

export const writeTime = `${today} ${hours}:${minutes}:${seconds}:${getDate.getMilliseconds()}`;