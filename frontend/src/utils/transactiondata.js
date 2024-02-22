const getHoursAndMinutes = (transactionDate) => {
    const date = new Date(transactionDate);
    const hour = date.getHours()
    const minutes = date.getMinutes()
    return `${hour}:${minutes}`
}

const chartData = (data) => {
    let initialAmount = 0;
    data.map((t) => {
    if (t.transactionType === 'Deposit'){
        initialAmount += t.amount
        return {time: getHoursAndMinutes(t.dateAndTime),amout : initialAmount}
    }
    if(t.transactionType === 'Withdraw'){
        initialAmount -= t.amount
    return {time: getHoursAndMinutes(t.dateAndTime),amout : initialAmount}
    }
    return {time: getHoursAndMinutes(t.dateAndTime),amout : initialAmount};
})}

export default chartData;