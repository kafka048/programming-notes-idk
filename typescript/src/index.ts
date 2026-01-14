// LECTURE 1 — SETTING UP A TYPESCRIPT PROJECT (14/1)

function greet(person: string): string {
  return `hello ${person}`;
}

const username = "amrit"; // inferred as string
console.log(greet(username));

/*
Key takeaway:
- Function parameters and return types form a contract.
- TypeScript prevents invalid calls at compile time.
*/


// LECTURE 2 — TYPE ANNOTATIONS VS TYPE INFERENCE

const channelName = "CHAIAURCODE"; // inferred as string
const chaiOrder: number = 1;       // explicit annotation
const wantTheOrder: boolean = false;

/*
Key takeaway:
- Prefer inference when TypeScript can infer correctly.
- Use annotations at boundaries or for clarity.
*/


// LECTURE 3 — UNION TYPES AND `any`

const subs: number | string = 10;

let apiReqStatus: "pending" | "success" | "error" = "pending";
apiReqStatus = "error";

/*
Literal unions restrict values to known states.
This prevents invalid assignments.
*/

const orders = ["12", "13", "14", "15"];

let currentOrder: any; // disables type checking (dangerous)

for (const order of orders) {
  if (order === "14") {
    currentOrder = order;
    break;
  }
}

currentOrder = 13; // allowed by TypeScript, but unsafe

/*
Key takeaway:
- `any` turns off type safety completely.
- It allows assignments that may break logic.
- Should be avoided unless absolutely necessary.
*/
