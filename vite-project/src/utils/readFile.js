
const filereader = (file) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload=(event) => {
        res(event.target.result)
    }

    reader.onerror=event => rej(event)
    reader.readAsText(file);
})
export default filereader