// TOPIC 1 — SETTING UP A TYPESCRIPT PROJECT (14/1)

function greet(person: string): string {
  return `hello ${person}`;
}

const username = "amrit"; // inferred as string
// console.log(greet(username));

/*
Key takeaway:
- Function parameters and return types form a contract.
- TypeScript prevents invalid calls at compile time.
*/


// TOPIC 2 — TYPE ANNOTATIONS VS TYPE INFERENCE

const channelName = "CHAIAURCODE"; // inferred as string
const chaiOrder: number = 1;       // explicit annotation
const wantTheOrder: boolean = false;

/*
Key takeaway:
- Prefer inference when TypeScript can infer correctly.
- Use annotations at boundaries or for clarity.
*/


// TOPIC 3 — UNION TYPES AND `any`

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

// ------------------------------------------------------------------------------------

// DATE: 15/1/25
// TOPIC - 4 TYPE GUARDS AND TYPE NARROWING
/* CORE IDEA:
TypeScript narrows types only when you PROVE something at runtime.
That proof is called a TYPE GUARD.
The result of that proof is TYPE NARROWING.
*/

// 1. TYPEOF — Primitive Type Guard

function getOrder(time: string | number) {
  // `time` can be string OR number

  if (typeof time === "string") {
    // Type Guard:
    // At runtime, we check that `time` is a string

    // Type Narrowing:
    // Inside this block, TypeScript knows `time` is string
    return `Order will be delivered in ${time} minutes`;
  }

  // Outside the `if`, the type is narrowed to number
  return `Order will be delivered in ${time} minutes`;
}


// 2. CONTROL-FLOW BASED NARROWING (Truthy checks)

function serveOrder(msg?: string) {
  // msg is: string | undefined

  if (msg) {
    // `undefined` is eliminated here
    // TypeScript narrows `msg` to string
    return `Serving ${msg}`;
  }

  return "Serving default message";
}


// 3. INSTANCEOF — Class-Based Type Guard

class Restaurant {
  serve(){
    return `Serving from Restaurant`
  } 
}

class Dhaba {
  serve(){
    return `Serving from Dhaba`
  } 
}

function serve(outlet: Restaurant | Dhaba) {
  // outlet can be either Restaurant or Dhaba

  if (outlet instanceof Restaurant) {
    // Runtime check using prototype chain
    // TypeScript narrows `outlet` to Restaurant
    return outlet.serve();
  }

  // Else case is automatically Dhaba
  return outlet.serve();
}


// 4. CUSTOM TYPE GUARD — `value is Type`
type Response = {
  data: string;
  status: number;
};

function isResponse(obj: any): obj is Response {
  /*
  This is a CUSTOM TYPE GUARD.

  The return type:
    obj is Response

  is a promise to TypeScript:
  "If I return true, you can trust that obj is Response"
  */

  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.data === "string" &&
    typeof obj.status === "number"
  );
}

function handleResponse(resp: Response | string) {
  if (isResponse(resp)) {
    // resp is narrowed to Response
    return `Responded with data: ${resp.data}`;
  }

  // Here, resp is string
  return `Custom response: ${resp}`;
}

// 5. DISCRIMINATED UNIONS — Best Narrowing Pattern

type ThrillerNovel = {
  type: "Thriller",
  amount: number
}
type ActionrNovel = {
  type: "Action",
  amount: number
}
type ClassicNovel = {
  type: "Classic",
  amount: number,
  date: number
}

type Novel = ThrillerNovel | ActionrNovel | ClassicNovel

function deliverNovel(typeOfNovel: Novel){
  switch (typeOfNovel.type) {
    case "Thriller":
      return "Thriller Novel"      
      break;
    
    case "Action":
      return "Action Novel"      
      break;

    case "Classic":
      return "Classic Novel"      
      break; 
   
  }
}

function deliver(novel: ThrillerNovel | ClassicNovel){
  if("date" in novel){
    //
  }
}

// ======================================================
// PRACTICAL USES OF TYPE GUARDS & TYPE NARROWING
// ======================================================

/*
CONTEXT:
Most real-world bugs happen when we ASSUME the shape or type of data.
Type guards + narrowing prevent those assumptions.
*/


// 1. API RESPONSE HANDLING (VERY COMMON)

type ApiSuccess = {
  status: "success";
  data: string;
};

type ApiError = {
  status: "error";
  message: string;
};

type ApiResponse = ApiSuccess | ApiError;

function handleApiResponse(res: ApiResponse) {
  // Discriminated union narrowing using `status`
  if (res.status === "success") {
    // res is ApiSuccess here
    return res.data.toUpperCase();
  }

  // res is ApiError here
  return res.message;
}

/*
Practical benefit:
- Prevents accessing `data` on an error response
- Forces handling all possible API states
*/



// 2. USER INPUT / UNKNOWN DATA

function handleUserInput(input: unknown) {
  // User input is always unknown

  if (typeof input === "string") {
    // input is narrowed to string
    return input.trim();
  }

  return "Invalid input";
}

/*
Practical benefit:
- Prevents calling string methods on non-strings
- Common in forms, query params, request bodies
*/



// 3. DATABASE OPTIONAL FIELDS (MongoDB-style)

type DbUser = {
  id: string;
  email?: string;
};

function sendEmail(user: DbUser) {
  if (!user.email) {
    // email is undefined here
    return "No email provided";
  }

  // email is narrowed to string
  return `Email sent to ${user.email}`;
}

/*
Practical benefit:
- Prevents undefined access
- Common with optional DB fields
*/



// 4. AUTH & PERMISSIONS (SECURITY-CRITICAL)

type Admin = {
  role: "admin";
  permissions: string[];
};

type User = {
  role: "user";
};

type Account = Admin | User;

function canDelete(account: Account) {
  if (account.role === "admin") {
    // account is Admin here
    return account.permissions.includes("delete");
  }

  // account is User here
  return false;
}

/*
Practical benefit:
- Prevents privilege bugs
- Common in auth & role-based systems
*/



// 5. CUSTOM TYPE GUARD FOR EXTERNAL DATA

type ResponseData = {
  data: string;
  status: number;
};

function isResponseData(value: unknown): value is ResponseData {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    "status" in value
  );
}

function processResponse(value: unknown) {
  if (isResponseData(value)) {
    // value is ResponseData here
    return value.data;
  }

  return "Invalid response format";
}

/*
Practical benefit:
- Safely handles external / untrusted data
- Common in APIs, SDKs, third-party libraries
*/







