#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class User {
  name: string;
  gender: string;
  email: string;
  password: string | number;

  constructor(
    name: string,
    gender: string,
    email: string,
    password: string | number
  ) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.password = password;
  }
}

class newEvent{
  title: string
date: string
pricerange: string
availableTickets: Number

constructor(title: string, date: string, price: string, ticket: number){
  this.title = title,
  this.date = date,
  this.pricerange = price
  this.availableTickets = ticket
  }}
  

class Event {
  title: string;
  time: string;
  city: string;
  availableTickets: number;
  ticketsLeft: number;

  constructor(
    name: string,
    time: string,
    city: string,
    tickets: number,
    ticketleft: number
  ) {
    this.title = name;
    this.time = time;
    this.city = city;
    this.availableTickets = tickets = 100;
    this.ticketsLeft = this.availableTickets - ticketleft;
  }

   purchaseTicket(ticketbought: number) {
    if (ticketbought > 100) {
      console.log(chalk.redBright("You cannot buy more than 100 tickets!"));
    } else if (ticketbought > this.availableTickets) {
      console.log(chalk.redBright("Sorry! Not enough tickets available."));
      process.exit()
    } else {
      this.availableTickets -= ticketbought;
      console.log(chalk.greenBright(
        `Congrats! You have successfully secured ${ticketbought} tickets for ${this.title}!`
      ));
    }
  }

  remainingTickets() {
    return this.availableTickets;
  }
}

class Admin {
  email: string
  password: string

  constructor(email: string, password: string){
    this.email = email,
    this.password = password
  }
}

let fundraisingEvent = new Event("Fundraising Event", "12:00", "City", 100, 0);
let musicEvent = new Event("Music Event", "12:00", "City", 100, 0);
let galaEvent = new Event("Gala Festival Event", "12:00", "City", 100, 0);
let artEvent = new Event("Art Show Event", "12:00", "City", 100, 0);

console.log(
  chalk.bold.blueBright("Welcome to the Online Ticketing Platform!")
);

interface EventData {
  title: string;
  date: string;
  pricerange: string;
  availableTickets: number;
}
let createevent: EventData[] = []
async function info() {
  let emailInfo: { [email: string]: User } = {};

  let loggedInUser: User | null = null;
  let exit = false;

  while (!exit) {
    let userInfo = await inquirer.prompt([
      {
        name: "options",
        type: "list",
        message: "please choose one option",
        choices: ["User", "Admin"],
      },
    ]);
    if ((userInfo.options === "User")) {
      let authInfo = await inquirer.prompt([
        {
          name: "info",
          message: "Please choose one option: ",
          type: "list",
          choices: ["login", "signup", "exit"],
        },
      ]);

      if (authInfo.info === "signup") {
        let { name, gender, email, password } = await inquirer.prompt([
          {
            name: "name",
            message: "Please enter your Fullname: ",
            type: "input",
            validate: (input) => {
              if (!isNaN(input)) {
                return "Please enter valid input!";
              } else {
                return true;
              }
            },
          },
          {
            name: "gender",
            type: "list",
            message: "Please choose your gender: ",
            choices: ["female", "male"],
          },
          {
            name: "email",
            message: "Please enter your email: ",
            type: "input",
            validate: (input) => {
              if (!isNaN(input)) {
                return chalk.red("Please enter valid input!")
              } else {
                return true;
              }
            },
          },
          {
            name: "password",
            message: "Please enter your password: ",
            type: "input",
          },
        ]);

        let userSignedUp = new User(name, gender, email, password);
        emailInfo[userSignedUp.email] = userSignedUp;
        console.log(chalk.italic.greenBright("Successfully signed up!"));
        loggedInUser = userSignedUp;
      } else if (authInfo.info === "login") {
        let { email, password } = await inquirer.prompt([
          {
            name: "email",
            message: "Enter your email: ",
            type: "input",
          },
          {
            name: "password",
            message: "Please enter your password: ",
            type: "input",
          },
        ]);

        const userSignedUp = emailInfo[email];

        if (!userSignedUp || userSignedUp.password !== password) {
          console.log(chalk.redBright("User not found or incorrect password!"));
          process.exit()
        } else {
          console.log(chalk.greenBright("Successfully logged in!"));
          loggedInUser = userSignedUp;
        }
      } else {
        exit = true;
        break;
      }

      if (loggedInUser) {
        let userOptions = await inquirer.prompt([
          {
            name: "choices",
            message: "What do you want to do?",
            type: "list",
            choices: [
              "Browse for events",
              "Ticket selection and Purchase",
              "My Purchased Tickets",
              "Logout",
            ],
          },
        ]);

        if (userOptions.choices === "Browse for events") {

            let askUser = await inquirer.prompt([{
                name: "Question",
                type: "list",
                message: "Do you want to browse current events or upcoming events?",
                choices: ["Current events", "Upcoming events"]
            }]);
            if(askUser.Question === "Current events"){
                let currentEvents = await inquirer.prompt([
                    {
                      name: "currentEvents",
                      message: "Please choose one category to view current events: ",
                      type: "list",
                      choices: ["category", "date", "timing", "keyword", "exit"],
                    }]);
                    if(currentEvents.currentEvents === "category"){
                        let eventcategory = await inquirer.prompt([
                            {
                              name: "categories",
                              message: "These are the current events category: ",
                              type: "list",
                              choices: ["Fundraising Event", "Music Event", "Gala Festival Event", "Art Show Event", "exit"]
                            }]);
                            switch(eventcategory.categories){
                                case "Fundraising Event":
                                case "Music Event":
                                case "Gala Festival Event":
                                    case "Art Show Event":
                                console.log(chalk.red("Please buy a ticket to attend this event!"))
                             
                            }
                    } else if(currentEvents.currentEvents === "date"){
                        let eventdates= await inquirer.prompt([
                            {
                              name: "dates",
                              message: "Enter the date to view the available event: ",
                              type: "number",
                          }]);
                          let chosenDate = eventdates.dates
                          if(isNaN(chosenDate)){
                            console.log(chalk.redBright("Please enter date in number"))
                          }
                          else{
                            if (chosenDate > 0 && chosenDate <= 10) {
                                console.log(chalk.blueBright("Fundraising event is available on this date."));
                            } else if (chosenDate > 10 && chosenDate <= 20) {
                                console.log(chalk.blueBright("Music event is available on this date."));
                            } else if (chosenDate > 20 && chosenDate <= 25) {
                                console.log(chalk.blueBright("Gala Event is available on this date."));
                            } else if (chosenDate > 25 && chosenDate <= 30) {
                                console.log(chalk.blueBright("Art Event is available on this date."));
                            } else {
                                console.log(chalk.redBright("Invalid input"));
                        }
                    }
                }
                    
                    else if(currentEvents.currentEvents === "timing"){
let eventTiming = await inquirer.prompt([{
    name: "timings",
    type: "list",
    message: "These are the following timings for current events: ",
    choices: ["9:00 am", "3:00 pm", "8:00 pm", "12:00 am", "exit"]
}])
switch(eventTiming.timings){
    case "9:00 am":
    case "3:00 pm":
    case "8:00 pm":
        case "12:00 am":
    console.log(chalk.red("Please buy a ticket to attend this event at this time!"))
                    }
                }
               else if(currentEvents.currentEvents === "keyword"){
let eventkeyword = await inquirer.prompt([{
    name: "keyword",
    type: "input",
    message: "Please enter the keyword to search for the event: "
}])
let userkeyword = eventkeyword.keyword.toLowerCase()
if(userkeyword.includes("fundraising") || userkeyword.includes("funds") || userkeyword.includes("fund")){
    console.log(chalk.italic.blackBright("Fundraising event is available. Buy a ticket to attend the event!"))
}
else if(userkeyword.includes("music") || userkeyword.includes("songs") || userkeyword.includes("concert")){
    console.log(chalk.italic.blackBright("Music event is available. Buy a ticket to attend the event!"))
}
else if(userkeyword.includes("gala")){
console.log(chalk.italic.blackBright("Gala event is available. Buy a ticket to attend the event!"))
}
else if(userkeyword.includes("art") || userkeyword.includes("drawing") || userkeyword.includes("craft")){
    console.log(chalk.italic.blackBright("Art event is available. Buy a ticket to attend the event!"))
}
else{
console.log("No events found with the given keyword!")
}               }
                    else{
                        process.exit()
                    }
            }
            else if(askUser.Question === "Upcoming events"){
let upcomingevents = await inquirer.prompt([{
    name: "choices",
    type: "list",
    message: "These are all the upcoming events for the next month: ",
    choices: ["Tech Conference - Available Dates: 1st - 10th - Timings: 9:00 AM", 
    "Food Festival - Available Dates: 10th - 20th, Timings: 3:00 PM",
    "Film Screening - Available Dates: 20th - 25th, Timings: 8:00 PM",
    "Book Fair - Availabe Dates: 25th - 30th, Timings: 12:00 PM"
    ]
}])
console.log(chalk.red(`Currently tickets are not available for ${upcomingevents.choices} as it is an upcoming event. We will notify you when it will become available.`))
            }
          
        }  else if (userOptions.choices === "Ticket selection and Purchase") {
          let purchaseTicket = await inquirer.prompt([
            {
              name: "chooseEvent",
              type: "list",
              message: "For which event do you want to buy a ticket?",
              choices: [
                "Fundraising Event",
                "Music Event",
                "Gala Festival Event",
                "Art Show Event",
              ],
            },
            {
              name: "ticketSelection",
              type: "number",
              message: "How many tickets do you want to buy?",
           
             },
            {
                name: "Date",
                type: "input",
                message: "Enter the date of this month you want to attend event on: ",
                validate: (input) => {
                    if(isNaN(input)){
                        console.log(chalk.redBright("Please enter date in number!"))
                    }
                    else if(input > 30){
                        console.log(chalk.redBright("Please enter correct date!."))
                    }
                    else{
                        return true
                    }
                }
            },
            {
                name: "time",
                type: "list",
                message: "Please select timing of event: ",
                choices: ["9:00 am", "1:00 pm", "5:00 pm", "8:00 pm", "12:00 am"]
            },
            {
              name: "CreditCard Details",
              type: "number",
              message: "Please enter your Credit Card Number: "  
            },
            {
                name: "price",
                type: "list",
                message: "Please choose Ticket price according to row category: ",
                choices: ["500", "400", "350"]

            },
          
          ]);
         
let chosenEvent = purchaseTicket.chooseEvent;
          let ticketsToBuy = purchaseTicket.ticketSelection;
          let totalprice = purchaseTicket.price * ticketsToBuy
          let chosenDate = purchaseTicket.Date

          if (isNaN(ticketsToBuy)) {
            console.log(chalk.redBright("Please enter tickets in number"));
    
          } else {
            switch (chosenEvent) {
              case "Fundraising Event":
               fundraisingEvent.purchaseTicket(ticketsToBuy);
                console.log(chalk.cyanBright(`Here is your e-ticket: 
                Event Name: ${chosenEvent}
                Event Date: ${purchaseTicket.Date}
                Event Time: ${purchaseTicket.time}
                No of tickets: ${ticketsToBuy}
                Ticket Price: $${totalprice}`))

                break;
case "Music Event":
                musicEvent.purchaseTicket(ticketsToBuy);
                console.log(chalk.cyanBright(`Here is your e-ticket: 
                Event Name: ${chosenEvent}
                Event Date: ${purchaseTicket.Date}
                Event Time: ${purchaseTicket.time}
                No of tickets: ${ticketsToBuy}
                Ticket Price: $${totalprice}`))


                break;
              case "Gala Festival Event":
                galaEvent.purchaseTicket(ticketsToBuy);
                console.log(chalk.cyanBright(`Here is your e-ticket: 
                Event Name: ${chosenEvent}
                Event Date: ${purchaseTicket.Date}
                Event Time: ${purchaseTicket.time}
                No of tickets: ${ticketsToBuy} 
                Ticket Price: $${totalprice}`))
                
                break;
              case "Art Show Event":
                artEvent.purchaseTicket(ticketsToBuy);
                console.log(chalk.cyanBright(`Here is your e-ticket: 
                Event Name: ${chosenEvent}
                Event Date: ${purchaseTicket.Date}
                Event Time: ${purchaseTicket.time}
                No of tickets: ${ticketsToBuy}
                Ticket Price: $${totalprice}`))
break;
            }
          } 
          
        } 
        else if (
            userOptions.choices === "My Purchased Tickets"
          ) {
            let viewPurchasedTickets = await inquirer.prompt([
              {
                name: "PurchasedTickets",
                type: "list",
                message: "Choose the event to view your purchased tickets: ",
                choices: [
                  "Fundraising Event Ticket",
                  "Music Event Ticket",
                  "Gala Festival Event Ticket",
                  "Art Show Event Ticket",
                  "Exit",
                ],
              },
            ]);
  
            if (viewPurchasedTickets.PurchasedTickets === "Fundraising Event Ticket") {
                console.log(chalk.italic.blue(`You have bought ${100 - fundraisingEvent.remainingTickets()} tickets for Fundraising Event!`))
              console.log(chalk.italic.blue(`Remaining tickets for this event: ${fundraisingEvent.availableTickets}`
        
              ));
            } else if (viewPurchasedTickets.PurchasedTickets === "Music Event Ticket") {
                console.log(chalk.italic.blue(`You have bought ${100 - musicEvent.remainingTickets()} tickets for Music Event!`))
                console.log(chalk.italic.blue(`Remaining tickets for this event: ${musicEvent.availableTickets}`))
            } else if (viewPurchasedTickets.PurchasedTickets === "Gala Festival Event Ticket" ) {
                console.log(chalk.italic.blue(`You have bought ${100 - galaEvent.remainingTickets()} tickets for Gala Event!`))
                console.log(chalk.italic.blue(`Remaining tickets for this event: ${galaEvent.availableTickets}`))
            } else {
                console.log(chalk.italic.blue(`You have bought ${100 - artEvent.remainingTickets()} tickets for Art Event!`))
                console.log(chalk.italic.blue(`Remaining tickets for this event: ${artEvent.availableTickets}`))
            }
          }
          else if (userOptions.choices === "Logout") {
          loggedInUser = null;
        }
      }
    }
    else if(userInfo.options === "Admin"){
let adminaccess = await inquirer.prompt([{
  name: "acesss",
  type: "list",
  message: "Please choose one option: ",
  choices: ["Sign in", "Exit"]
}])
if(adminaccess.acesss === "Sign in"){
let adminaccess = await inquirer.prompt([{
  name: "email",
  type: "input",
  message: "Please enter your Admin email: "
},{
  name: "password",
  type: "input",
  message: "Please enter your password: "
}])

let admin = new Admin(adminaccess.email, adminaccess.password)

if ((adminaccess.email === "admin@gmail.com" || adminaccess.email === "Admin@gmail.com") && adminaccess.password === "1234") {
  console.log(chalk.greenBright("Welcome, Admin! You have successfully signed in!"));
} else {
  console.log(chalk.redBright("Invalid email or password! Please enter correct Admin email and password."));
  process.exit()
}

if(admin){
let adminActions = await inquirer.prompt([{
  name: "chooseAction",
  type: "list",
  message: "What do you want to do?",
  choices: ["Create event", "Manage event", "Display all events", "Exit"]
}])
if(adminActions.chooseAction === "Create event"){
let condition = true
while(condition){
  let createevents = await inquirer.prompt([{
    name: "title",
    type: "input",
    message: "Please mention name of the event that you want to create: "
  },
{
  name: "date",
  type: "input",
  message: "please enter the date of your event: ",
  validate: (input) => {
    if(isNaN(input)){
      return "Please enter date in number"
    }
    else if(input > 30){
      return "Invalid input"
    }
    else{
      return true
    }
  }
},{
  name: "setprice",
  message: "Please select price range for your event: ",
  type: "list",
  choices: ["300$ - 400$", "450$ - 550$", "600$ - 700$"]
},{
  name: "availableTickets",
  message: "Please enter available no of tickets for your event: ",
  type: "input",
  validate: (input) => {
    if(isNaN(input) || input <= 0){
      return "Please enter valid input"
    }
    else if(input > 100){
      return "Please choose no of tickets under 100!"
    }
    else{
      return true
    }
  }
},{
  name: "createMore",
  type: "confirm",
  message: "Do you want to create more event?",
  default: false
}])

let addevent: EventData = {title: createevents.title,
  date: createevents.date,
  pricerange: createevents.setprice,
  availableTickets: parseInt(createevents.availableTickets)}
createevent.push(addevent)
condition = createevents.createMore
console.log(chalk.blueBright("These are the new events added:"));
createevent.forEach(event => {
  console.log(chalk.blueBright(`
    Title: ${event.title} 
    Date: ${event.date} 
    Price range: ${event.pricerange} 
    Available tickets: ${event.availableTickets}
  `));
});
}
}
 
else if(adminActions.chooseAction === "Manage event"){
let manageevents = await inquirer.prompt([{
  name: "manageevents",
  type: "list",
  message: "What do you want to do?",
  choices: ["Edit events", "Filter events with 0 tickets"]
}])
if (manageevents.manageevents === "Edit events") {
 let editEvent = await inquirer.prompt([
        {
            name: "eventTitle",
            type: "input",
            message: "Enter the title of the event you want to edit:"
        },
        {
            name: "newDate",
            type: "input",
            message: "Enter the new date for the event:",
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter date in number";
                } else if (input > 30) {
                    return "Invalid input";
                }
                return true;
            }
        },
        {
            name: "newPrice",
            type: "list",
            message: "Select the new price range:",
            choices: ["300$ - 400$", "450$ - 550$", "600$ - 700$"]
        },
        {
            name: "newAvailableTickets",
            type: "input",
            message: "Enter the new number of available tickets:",
            validate: (input) => {
                if (isNaN(input) || input <= 0) {
                    return "Please enter a valid number";
                } else if (input > 100) {
                    return "Please enter a number less than or equal to 100";
                }
                return true;
        } }
    ]);

    let eventToEdit = createevent.find(event => event.title.toLowerCase() === editEvent.eventTitle.toLowerCase());

    if (eventToEdit) {
        eventToEdit.date = editEvent.newDate;
        eventToEdit.pricerange = editEvent.newPrice;
        eventToEdit.availableTickets = parseInt(editEvent.newAvailableTickets);
        console.log(chalk.greenBright("Event edited successfully!"));
    } else {
        console.log(chalk.redBright("Event not found!"));
      
    }
   }
else if(manageevents.manageevents === "Filter events with 0 tickets"){
let filterevent = []
if(fundraisingEvent.availableTickets === 0){
  filterevent.push("Fundraising event")

}
if(galaEvent.availableTickets === 0){
  filterevent.push("Gala Festival event")
}
if(artEvent.availableTickets === 0){
  filterevent.push("Art show event")
}
if(musicEvent.availableTickets === 0){
filterevent.push("Music event")
 }
filterevent.forEach(event => console.log(`${event} has 0 tickets!`))
   } 
}
else if(adminActions.chooseAction === "Display all events"){
  console.log(chalk.blueBright(`
  These are all the current events: 
  Fundraising event
  Gala Festival event
  Music event
  Art Show event
  
  These are all the upcoming events: 
  Tech Conference 
  Food Festival
  Film Screening
  Book Fair`))

 console.log( createevent.map(event => "This is the new event created by Admin: " +
 `Event name: ${event.title}, Event date: ${event.date}, Prices: ${event.pricerange}, Available tickets: ${event.availableTickets}`))
  
}
else{
  exit = true
}
    }
    }
}  }}

info();
