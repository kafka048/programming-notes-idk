// ======================================================
// DATE: 18/01/25
// TOPIC 1: OBJECTS IN TYPESCRIPT (UTILITY TYPES)
// ======================================================

// ------------------------------------------------------
// BASE OBJECT TYPE
// ------------------------------------------------------

type User = {
  username: string;
  email: string;
  age: number;
};

/*
This is a fully-defined object type.
All properties are required by default.
*/

// ------------------------------------------------------
// 1. PARTIAL<T>
// ------------------------------------------------------

type PartialUser = Partial<User>;

/*
Partial<T>:
- Makes ALL properties optional
- Does NOT change property types
- Used when updating or patching data
*/

const updateUser: PartialUser = {
  email: "new@mail.com"
};

// Practical use:
// - PATCH APIs
// - Update forms
// - Partial state updates

// ------------------------------------------------------
// 2. REQUIRED<T>
// ------------------------------------------------------

type RequiredUser = Required<User>;

/*
Required<T>:
- Makes ALL properties mandatory
- Even optional ones become required
- Used when you need full certainty
*/

const fullUser: RequiredUser = {
  username: "amrit",
  email: "amrit@mail.com",
  age: 22
};

// Practical use:
// - Final validation
// - Persisting to database
// - Business-critical logic

// ------------------------------------------------------
// 3. PICK<T, K>
// ------------------------------------------------------

type UserPreview = Pick<User, "username" | "email">;

/*
Pick<T, K>:
- Selects ONLY specified properties
- Creates a smaller, focused object
*/

const preview: UserPreview = {
  username: "raj",
  email: "raj@mail.com"
};

// Practical use:
// - API responses
// - UI previews
// - Limiting exposed data

// ======================================================
// TOPIC 2: FUNCTIONS IN TYPESCRIPT
// ======================================================

// ------------------------------------------------------
// 1. FUNCTION PARAMETER & RETURN TYPES
// ------------------------------------------------------

function add(a: number, b: number): number {
  return a + b;
}

/*
Function typing rules:
- Parameter types are mandatory (good practice)
- Return type can be inferred but SHOULD be explicit
*/

// ------------------------------------------------------
// 2. OPTIONAL PARAMETERS
// ------------------------------------------------------

function greet(name?: string): string {
  if (name) {
    return `Hello, ${name}`;
  }
  return "Hello, Guest";
}

/*
Optional parameters:
- Treated as: T | undefined
- Must be checked before use
*/

// ------------------------------------------------------
// 3. DEFAULT PARAMETERS
// ------------------------------------------------------

function makeTea(type: string = "Masala"): string {
  return `Making ${type} tea`;
}

/*
Default parameters:
- Automatically optional
- Provide fallback values
- Preferred over optional params when possible
*/

// ------------------------------------------------------
// 4. FUNCTION AS TYPES
// ------------------------------------------------------

type Logger = (message: string) => void;

const logMessage: Logger = (msg) => {
  console.log(msg);
};

/*
Function types:
- Describe the function signature
- Useful for callbacks and APIs
*/

// ------------------------------------------------------
// 5. VOID VS NEVER (CONTEXTUAL)
// ------------------------------------------------------

function logError(msg: string): void {
  console.log(msg);
}

/*
void:
- Function returns nothing meaningful
*/

function crash(msg: string): never {
  throw new Error(msg);
}

/*
never:
- Function never completes
- Used for fatal errors or impossible states
*/

// ======================================================
// 🔑 KEY TAKEAWAYS — OBJECTS & FUNCTIONS
// ======================================================

/*
OBJECTS:
- Partial<T> → makes all properties optional
- Required<T> → makes all properties mandatory
- Pick<T, K> → selects specific properties
Rule:
Use utility types to TRANSFORM object intent, not rewrite types.

FUNCTIONS:
- Always type parameters
- Prefer explicit return types
- Optional params = T | undefined
- Default params > optional when possible
- void = no return, never = no completion

Operational rule:
Model data with utility types, model behavior with precise function signatures.
*/


// ======================================================
// TOPIC 3: ARRAYS, TUPLES, AND ENUMS IN TYPESCRIPT
// ======================================================


// ======================================================
// ARRAYS IN TYPESCRIPT
// ======================================================

// ------------------------------------------------------
// 1. BASIC TYPED ARRAYS
// ------------------------------------------------------

const chaiFlavours: string[] = ["Masala", "Adrak"];
const rating1: number[] = [4.51, 5.20];

// Alternative generic syntax (functionally identical)
const rating2: Array<number> = [4.5, 5.0];

/*
Rule:
T[] and Array<T> are equivalent.
Use whichever is more readable in context.
*/

// ------------------------------------------------------
// 2. ARRAY OF OBJECTS
// ------------------------------------------------------

type Coffee = {
  name: string;
  price: number;
  isStrong: boolean;
};

const menu: Coffee[] = [
  { name: "Mocha", price: 50, isStrong: true },
  { name: "Latte", price: 20, isStrong: false },
  { name: "Espresso", price: 500, isStrong: true },
];

/*
Array typing enforces:
- Correct object shape
- Consistency across elements
*/

// ------------------------------------------------------
// 3. READONLY ARRAYS
// ------------------------------------------------------

const cities: readonly string[] = ["Delhi", "Pune"];

// cities.push("Mumbai"); ❌ not allowed (mutation blocked)

const states: string[] = ["Bihar", "Rajasthan"];
states.push("Punjab"); // ✅ allowed

/*
Readonly arrays:
- Prevent mutation
- Useful for constants and config-like data
*/

// ------------------------------------------------------
// 4. MULTI-DIMENSIONAL ARRAYS
// ------------------------------------------------------

const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];

// ======================================================
// TUPLES IN TYPESCRIPT
// ======================================================

// ------------------------------------------------------
// 5. BASIC TUPLES
// ------------------------------------------------------

let userInfo: [string, number, boolean?];

userInfo = ["amrit", 68];
userInfo = ["raj", 78, true];

/*
Tuples:
- Fixed length
- Fixed order
- Each position has a specific type
*/

// ------------------------------------------------------
// 6. READONLY TUPLES
// ------------------------------------------------------

const location: readonly [number, number] = [28.66, 32.22];

// location[0] = 30; ❌ mutation not allowed

// ------------------------------------------------------
// 7. NAMED TUPLES (READABILITY)
// ------------------------------------------------------

const novels: [name: string, year: number] = ["Frankenstein", 1831];

/*
Named tuples:
- Improve readability
- Do NOT change runtime behavior
*/

// ======================================================
// ENUMS IN TYPESCRIPT
// ======================================================

// ------------------------------------------------------
// 8. NUMERIC ENUMS
// ------------------------------------------------------

enum Status {
  PENDING = 100,
  SERVED,      // 101
  CANCELLED,   // 102
}

/*
Numeric enums:
- Auto-increment values
- Can cause unintended values if not careful
*/

// ------------------------------------------------------
// 9. STRING ENUMS (PREFERRED)
// ------------------------------------------------------

enum Novels {
  THRILLER = "Rage of Angels",
  CLASSIC = "Frankenstein",
}

/*
String enums:
- Explicit
- Predictable
- Safer for APIs and logging
*/

function orderNovels(type: Novels) {}

orderNovels(Novels.CLASSIC);

/*
Best practices for enums:
- Keep values homogeneous
- Prefer string enums over numeric
- Use `const enum` if values must never change
*/

