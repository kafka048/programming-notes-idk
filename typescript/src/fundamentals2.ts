// ======================================================
// DATE: 17/01/25
// TOPIC 1: TYPE ASSERTION, UNKNOWN, AND NEVER (TYPESCRIPT)
// ======================================================good

// ------------------------------------------------------
// 1. TYPE ASSERTION (`as`)
// ------------------------------------------------------

/*
Type assertion tells TypeScript:
"I know more about this value than you do."

⚠️ It does NOT perform runtime checks.
⚠️ If the assertion is wrong, runtime bugs will occur.
*/

let response: any = "42";

// Assertion: telling TS that `response` is a string
let numericLength: number = (response as string).length;

// ------------------------------------------------------

type Book = {
  name: string;
};

let bookString = `{"name": "Frankenstein"}`;

// JSON.parse returns `any`
// We assert the expected structure
let bookObject = JSON.parse(bookString) as Book;

// Assertion is used because TS cannot infer runtime JSON shape

// ------------------------------------------------------
// DOM access (very common real-world use of assertion)
// ------------------------------------------------------

const inputElement = document.getElementById("username") as HTMLInputElement;

// TS cannot know which element is returned at runtime
// We assert because we know the DOM structure

// ------------------------------------------------------
// 2. `any` VS `unknown`
// ------------------------------------------------------

/*
`any` disables type checking completely.
TypeScript stops protecting you.
*/

let value: any;

value = "book";
value = [1, 2, 3];
value = 2.5;

// ❌ No error, even though this is unsafe
value.toUpperCase();

/*
This is the danger of `any`:
- No errors
- No guarantees
- Runtime crashes are possible
*/

// ------------------------------------------------------

/*
`unknown` allows assignment,
but FORCES validation before usage.
*/

let newValue: unknown;

newValue = "book";
newValue = [1, 2, 3];
newValue = 2.5;

// ❌ Compile-time error
// newValue.toUpperCase();

// Must narrow before use
if (typeof newValue === "string") {
  newValue.toUpperCase(); // safe
}

/*
Difference summary:
- `any` → no safety
- `unknown` → safety enforced at usage
*/

// ------------------------------------------------------
// `unknown` in try–catch blocks
// ------------------------------------------------------

try {
  // some code
} catch (error) {
  // error is `unknown` by default in strict mode

  if (error instanceof Error) {
    // type guard + narrowing
    console.log(error.message);
  }

  console.log("Error:", error);
}

// ------------------------------------------------------
// Assertion AFTER validation (correct pattern)
// ------------------------------------------------------

const data: unknown = "mercenary";

// Assertion used after ensuring correctness
const stringData: string = data as string;

// ------------------------------------------------------
// 3. TYPE `never`
// ------------------------------------------------------

/*
`never` represents:
- Code paths that cannot happen
- Functions that never return
- Exhaustive checking
*/

type Role = "Admin" | "User" | "SuperAdmin";

function redirectBasedOnRole(role: Role): void {
  if (role === "Admin") {
    console.log("Redirecting to Admin Dashboard");
    return;
  }

  if (role === "User") {
    console.log("Redirecting to User Dashboard");
    return;
  }

  /*
  At this point:
  - If Role had only "Admin" | "User",
    `role` would be inferred as `never`
  - Adding "SuperAdmin" makes TS flag this block

  This helps catch unhandled cases at compile time.
  */

  role; // inferred as `never` if all cases are handled
}


// TOPIC 2: TYPES AND INTERFACE

