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


// ======================================================
// TOPIC 2: TYPE vs INTERFACE (WITH RELATED CONCEPTS)
// ======================================================

/*
CORE QUESTION:
How do we model data and contracts correctly in TypeScript?
Answer:
- Use `interface` for object contracts
- Use `type` for composition, unions, and logic
*/

// ------------------------------------------------------
// 1. INTERFACE — OBJECT CONTRACT
// ------------------------------------------------------

interface ChaiOrder {
  type: string;
  sugar: number;
  strong: boolean;
}

/*
Why interface here?
- This is a pure object shape
- Represents a contract
- May be extended or implemented
*/

function makeChai(order: ChaiOrder) {
  console.log(`Making ${order.type} chai`);
}

function serveChai(order: ChaiOrder) {
  console.log(`Serving ${order.type} chai`);
}

// ------------------------------------------------------
// 2. INTERFACE WITH CLASSES (PRIMARY USE CASE)
// ------------------------------------------------------

interface TeaRecipe {
  water: number;
  milk: number;
}

/*
Interfaces are IDEAL for classes.
They define what a class MUST implement.
*/

class MasalaChai implements TeaRecipe {
  water = 100;
  milk = 50;
}

// ------------------------------------------------------
// 3. INTERFACE EXTENSION
// ------------------------------------------------------

interface BaseCup {
  size: "small" | "medium" | "large";
}

interface BrandedCup extends BaseCup {
  brand: string;
}
/* 
extends mean:
Take everything in BaseCup and add more requirements
In expanded form,, it becomes equivalent to
*/

interface BrandedCup {
  size: "small" | "medium" | "large";
  brand: string;
}

/* This avoids duplication of the size variable.
If you duplicated it, and if size changes later, you must update multiple places.
Introduces unnecessary complications */

/* NOTE: Interface extension is inheritance for shapes, not behavior. */



// ------------------------------------------------------
// 4. TYPE — UNION (IMPOSSIBLE WITH INTERFACE)
// ------------------------------------------------------

type TeaType = "Masala" | "Ginger" | "Black";

/*
Union types represent VARIANTS.
Interfaces cannot express this.
*/

function serveTea(tea: TeaType) {
  console.log(`Serving ${tea} tea`);
}

// ------------------------------------------------------
// 5. TYPE — INTERSECTION (COMPOSITION)
// ------------------------------------------------------

type BaseChai = {
  teaLeaves: number;
};

type ExtraIngredients = {
  ginger: number;
};

type GingerTea = BaseChai & ExtraIngredients;

/*
Intersection combines multiple structures.
This is composition, not inheritance.
You must use all properties together, unlike in union.
*/

const gingerTea: GingerTea = {
  teaLeaves: 2, // Property from BaseChai
  ginger: 1, // Property from ExtraIngredients
};

// ------------------------------------------------------
// 6. OPTIONAL PROPERTIES
// ------------------------------------------------------

interface User {
  username: string;
  bio?: string;
}

/*
Optional properties:
- May or may not exist
- Must be checked before usage
*/ 

const userA: User = { username: "justin" };
const userB: User = { username: "gaethje", bio: "the dangerous" };
console.log(userA.bio?.toUpperCase()); /* 
This is optional chaining. 
If bio exists, you make all the letters uppercase.
If it doesn't, then you return an undefined without any crash or error
Another method can be:
*/
const bio = userA.bio ?? "No bio provided";
console.log(bio.toUpperCase());
// Now you definitely guarantee a string here.

/* BAD PRACTICES — OPTIONAL PROPERTIES
❌ Unsafe: optional property may be undefined
userA.bio.toUpperCase();

❌ Dangerous: type assertion hides the problem */
(userA.bio as string).toUpperCase();
// Type assertions do NOT add runtime safety.
// They only silence the compiler.


// ------------------------------------------------------
// 7. READONLY PROPERTIES
// ------------------------------------------------------

interface Config {
  readonly appName: string;
  version: number;
}

/*
Readonly:
- Can be set once
- Prevents reassignment
- Useful for configuration and constants
*/

const cfg: Config = {
  appName: "Uber",
  version: 1,
};

// cfg.appName = "Ola"; ❌ Compile-time error
cfg.version = 2; // ✅ Allowed

// ------------------------------------------------------
// 8. WHEN BOTH LOOK POSSIBLE — DECISION RULE
// ------------------------------------------------------

/*
Ask ONE question:

"Is this describing the SHAPE of an object?"

YES → interface
NO  → type
*/
