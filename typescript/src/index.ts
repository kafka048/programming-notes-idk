// LECTURE 1 SETTING UP A TYPESCRIPT PROJECT DATE 14/1

function greet(person: string): string {
    return `hello ${person}`;
}

const username: string = "amrit";
console.log(greet(username));

// LECTURE 2 TYPE ANNOTATIONS AND TYPE INFERENCES

const channelName = "CHAIAURCODE"; // inference
const chaiOrder: number = 1; // annotation
const wantTheOrder: boolean = false; // annotation

// LECTURE 3: UNIONS AND ANY

const subs: number | string = 10; // union.
let apiReqStats: "pending" | "success" | "error" = "pending"; 
apiReqStats = "error";

const orders = ["12", "13", "14", "15"];
let currentOrder: any; // disables type checking

for(let order of orders){
    if(order === "14"){
        currentOrder = order;
        break;
    }
}

currentOrder = 13;


// avoid any in maximum cases
