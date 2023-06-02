
const getDate = new Date();
const month = (getDate.getMonth() + 1) < 10 ? "0" + (getDate.getMonth() + 1) : (getDate.getMonth() + 1);
const day = getDate.getDate() < 10 ? "0" + getDate.getDate() : getDate.getDate();

export const today = `${getDate.getFullYear()}-${month}-${day}`;

export const writeTime = `${today} ${getDate.getHours()}:${getDate.getMinutes()}:${getDate.getSeconds()}:${getDate.getMilliseconds()}`;