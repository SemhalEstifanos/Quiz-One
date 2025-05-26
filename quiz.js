//1 Create a CustomerOrder class with properties: orderId (string), items (array of objects with name, quantity, price), and status (string). Add a method calculateTotal() that returns the total order amount. Write an async method processPayment() that simulates payment with a Promise that resolves after 2 seconds. After calling the method, change the status to "paid" and print a success message.



//Algorithm

// Create class  called CustomerOrder with propertes such as order identifier,item,status and method calcukateToatl
// for each item  multiply quantity by price and sum for all items
// return total amount
// create async funciton  named processPayment
// retrun a promise that resolves after 2 seconds
// update status to paid
// print sucess message

class CustomerOrder {
    constructor(orderId, items, status) {
        this.orderId = orderId;
        this.items = items;
        this.status = "Pending";
    }
    calculateTotal() {
        let sum = 0;
        for (let item of this.items) {
            sum += item.quantity * item.price
        }
        return sum
    }
    async processPayment() {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.status = "Paid";
        console.log("your order has been successful.");
    }
}
let order1 = new CustomerOrder("s20202", [{ name: "Books", quantity: 5, price: 1300 }, { name: "Pens", quantity: 10, price: 150 }])
let total = order1.calculateTotal()
console.log(`Your total price is ${total}$.`);
order1.processPayment()



// 2 Create a TeamMember class that takes name, role, and an array of tasks (each task is an object with title and completed boolean). Write a prototype method completeTask(taskTitle) that marks a task as completed. Write another method checkProgress() that returns a Promise resolving to "All tasks completed!" or rejecting with "Pending tasks remaining" based on the state of the tasks array.


// Create a class called TeamMember object
// Has properties such as name,role and list of tasks
// Create a function prototype called  completeTask that  takes taskTitle
// Check if  the task exist in the given array
// If found assign completed status to true
// Check if every task in the tasks arrray is complete 
// if completed,resolve with "With all tasks completed"
// if not reject with"Pendinf tasks remaining"

class TeamMember {
    constructor(name, role, tasks) {
        this.name = name;
        this.role = role;
        this.tasks = tasks;
    }
}


TeamMember.prototype.completeTask = function (taskTitle) {
    const task = this.tasks.find(item => item.title === taskTitle);
    if (task) task.completed = true;
};

TeamMember.prototype.checkProgress = function () {
    return new Promise((resolve, reject) => {
        const done = this.tasks.every(t => t.completed);
        if (done) {
            resolve("All tasks completed!");
        } else {
            reject("Pending tasks remaining");
        }
    });
};


const member = new TeamMember("Semhal", "Developer", [
    { title: "FrontEnd", completed: true },
    { title: "Write Tesy", completed: true }
]);

member.completeTask("Setup project");

member.checkProgress()
    .then(message => console.log(message))
    .catch(message => console.log(message));


// number 3
// Build a Candidate class with properties: name, position, and interviews (array of objects with date, status). Add a method scheduleInterview(date) that pushes a new interview with status "pending". Then write an async function sendConfirmation() that returns a Promise that resolves after 1 second with a message "Interview confirmed with [name]", and log the message


class Candidate {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.interviews = [];
    }

    scheduleInterview(date) {
        this.interviews.push({ date: date, status: "pending" });
    }

    async sendConfirmation() {
        return new Promise(resolve => {
            setTimeout(() => {
                const message = `Interview confirmed with ${this.name}`;
                resolve(message);
            }, 1000);
        });
    }
}

const candidate = new Candidate("Semhal", "Developer");
candidate.scheduleInterview("2025-05-30");

candidate.sendConfirmation().then(message => console.log(message));


//4   Design a Course class with properties: title, instructor, and students (array of student objects with name and progress). Add a method updateProgress(studentName, value) that modifies the student’s progress. Create an async method generateCertificate(studentName) that returns a Promise resolving only if the progress is 100, otherwise reject with "Incomplete progress".


// Create a class called  Course 
// It has properties of title (string),instructor (string),students (array of objects: { name, progress })
// Create a function called updateProgress that takes studentName and value
// Find the student by name
// Set their progress to the given value.
// Create  async function called generateCertificate that takes in  studentName
// Find the student by name.
// If their progress is 100, resolve the Promise with a certificate message.
// If not reject with "Incomplete progress"


class Course {
    constructor(title, instructor, students) {
        this.title = title;
        this.instructor = instructor;
        this.students = students;
    }

    updateProgress(studentName, value) {
        const student = this.students.find(pupil => pupil.name === studentName);
        if (student) {
            student.progress = value;
        }
    }

    async generateCertificate(studentName) {
        return new Promise((resolve, reject) => {
            const student = this.students.find(pupil => pupil.name === studentName);
            if (student && student.progress === 100) {
                resolve(`Certificate awarded to ${studentName}!`);
            } else {
                reject("Incomplete progress");
            }
        });
    }
}


const course = new Course("FrontEnd", "Hunter", [
    { name: "Semhal", progress: 80 },
    { name: "Bruk", progress: 100 }
]);

course.updateProgress("Semhal", 100);

course.generateCertificate("Semhal")
    .then(message => console.log(message))
    .catch(error => console.log(error));

course.generateCertificate("Bruk")
    .then(message => console.log(message))
    .catch(error => console.log(error));



//5 Create a StockTracker class with a property watchlist (array of objects with symbol, threshold, currentPrice). Add a method updatePrice(symbol, newPrice) that updates the stock’s current price. Write an async method checkAlerts() that loops through the watchlist and returns a Promise resolving with a list of stocks where currentPrice >= threshold, or rejecting with "No alerts triggered".


//   Algorithm
// Create class called StockTracker 
// Has  properties of watchlist (array of {symbol, threshold, currentPrice})
// Has a method of updatePrice(symbol, newPrice)
// Find the stock by symbol in the watchlist
// Update its currentPrice to newPrice.
// Create Async function called checkAlerts()
// Loop through the watchlist
// Collect stocks where currentPrice >= threshold
// If found, resolve with their list
// If none, reject with "No alerts triggered"




class StockTracker {
    constructor(watchlist) {
        this.watchlist = watchlist;
    }

    updatePrice(symbol, newPrice) {
        const stock = this.watchlist.find(item => item.symbol === symbol);
        if (stock) {
            stock.currentPrice = newPrice;
        }
    }

    async checkAlerts() {
        return new Promise((resolve, reject) => {
            const triggered = this.watchlist.filter(
                item => item.currentPrice >= item.threshold
            );
            if (triggered.length > 0) {
                resolve(triggered);
            } else {
                reject("No alerts triggered");
            }
        });
    }
}


const tracker = new StockTracker([
    { symbol: "SSS", threshold: 120, currentPrice: 245 },
    { symbol: "SVS", threshold: 1000, currentPrice: 995 }
]);

tracker.updatePrice("SSS", 245);

tracker.checkAlerts()
    .then(alerts => console.log(alerts))
    .catch(message => console.log(message));
