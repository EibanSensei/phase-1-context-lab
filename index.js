

 function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(data) {
    return data.map(createEmployeeRecord);
}

function createTimeInEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');

    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };

    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');

    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };

    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
    return 0;
}

function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0);
}
