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
