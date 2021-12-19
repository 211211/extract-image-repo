export const getDate = () => {
    const d = new Date()
    const date = d.getUTCDate()
    const month = d.getUTCMonth() + 1
    const year = d.getUTCFullYear()

    return `${date}-${month}-${year}`
}
