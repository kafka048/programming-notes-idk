// ======================================================
// DATE: 19/01/25
// TOPIC: OOP CONCEPTS IN TYPESCRIPT
// ======================================================


// ======================================================
// 1. CLASSES & CONSTRUCTORS
// ======================================================

class Cafe {
  isBlack: boolean;
  price: number;

  constructor(isBlack: boolean, price: number) {
    this.isBlack = isBlack;
    this.price = price;
  }
}

const bulletCoffee = new Cafe(true, 20);
bulletCoffee.price = 15;

/*
Classes:
- Bundle data + behavior
- Constructor initializes the objects
- Properties are mutable by default
*/

// ======================================================
// 2. ACCESS MODIFIERS
// ======================================================

class MorningCoffee {
  public variant: string = "Espresso"; // accessible everywhere
  private usedCoffeeMaker = false;      // accessible only inside class
  protected howStrong: string = "very"; // accessible in subclasses

  reveal() {
    return this.usedCoffeeMaker;
  }
}

const firstCup = new MorningCoffee();
firstCup.variant; // allowed
firstCup.reveal(); // allowed

// ------------------------------------------------------
// PROTECTED ACCESS — SUBCLASS USAGE
// ------------------------------------------------------

class StrongCoffee extends MorningCoffee {
  strength() {
    return this.howStrong; // allowed because protected
  }
}

/*
Access modifiers:
- public → everywhere
- private → only inside class
- protected → class + subclasses
Enforced at compile-time by TS.
*/

// ======================================================
// 3. JAVASCRIPT PRIVATE FIELDS (`#`)
// ======================================================

class Wallet {
  #balance = 100;

  getBalance() {
    return this.#balance;
  }
}

const w = new Wallet();

/*
`#` fields:
- JavaScript-level privacy
- Enforced at runtime
- Stronger than TS `private`
*/

// ======================================================
// 4. READONLY PROPERTIES
// ======================================================

class Cup {
  readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }
}

// capacity can be set once (constructor only)
// further reassignment is blocked

/*
Readonly:
- Prevents reassignment
- Useful for constants and configuration
*/

// ======================================================
// 5. GETTERS & SETTERS (CONTROLLED ACCESS)
// ======================================================

class ModernChai {
  private _sugar = 2;

  get sugar() {
    return this._sugar;
  }

  set sugar(value: number) {
    if (value > 5) throw new Error("Too Sweet");
    this._sugar = value;
  }
}

const c = new ModernChai();
c.sugar = 3;

/*
Getters & setters:
- Encapsulate validation logic
- Control read/write access
- Expose property-like API
*/

// ======================================================
// 6. STATIC MEMBERS
// ======================================================

class EkChai {
  static shopName = "EkChaiCaffe";

  constructor(public flavour: string) {}
}

console.log(EkChai.shopName);

/*
Static members:
- Belong to the class, not instances
- Used for constants, helpers, shared config
*/

// ======================================================
// 7. ABSTRACT CLASSES
// ======================================================

abstract class Drink {
  abstract make(): void;
}

class MyChai extends Drink {
  make() {
    console.log("Brewing Chai");
  }
}

/*
Abstract classes:
- Cannot be instantiated
- Force subclasses to implement behavior
- Useful for base templates
*/

// ======================================================
// 8. COMPOSITION / DEPENDENCY INJECTION
// ======================================================

class Heater {
  heat() {}
}

class HeatingSystem {
  constructor(private heater: Heater) {}

  make() {
    this.heater.heat();
  }
}

/*
Composition:
- Prefer over inheritance
- Inject dependencies instead of extending
- Makes code flexible and testable
*/


// ======================================================
// TOPIC 2: INTERFACES & GENERICS IN TYPESCRIPT
// ======================================================


// ======================================================
// INTERFACES
// ======================================================

// ------------------------------------------------------
// 1. INTERFACE — OBJECT SHAPE
// ------------------------------------------------------

interface Coffee {
  isStrong: boolean;
  price: number;
  beans?: string;                 // optional property
  readonly countryOfOrigin: string; // readonly property
}

/*
Interfaces define the SHAPE of objects.
They act as contracts.
*/

const morningCup: Coffee = {
  isStrong: true,
  price: 40,
  beans: "Arabica",
  countryOfOrigin: "India",
};

// ------------------------------------------------------
// 2. FUNCTION INTERFACE (CALL SIGNATURE)
// ------------------------------------------------------

interface DiscountCalculator {
  (price: number): number;
}

/*
This is NOT a method.
This defines the SIGNATURE of a function.
A signature of a function defines
1. what arguments the function accepts
2. what it returns
*/

const apply50: DiscountCalculator = (p) => p * 0.5;

// ------------------------------------------------------
// 3. INTERFACE FOR METHODS (BEHAVIOR CONTRACT)
// ------------------------------------------------------

interface CoffeeMachine {
  start(): void;
  stop(): void;
}

const machine: CoffeeMachine = {
  start() {
    console.log("started");
  },
  stop() {
    console.log("stopped");
  },
};

/*
Interfaces can enforce behavior,
not just data structure.
*/

// ------------------------------------------------------
// 4. INDEX SIGNATURES
// ------------------------------------------------------

interface CoffeeRatings {
  [beans: string]: number;
}

/*
Index signatures:
- Allow dynamic keys
- Enforce value type consistency
*/

const ratings: CoffeeRatings = {
  arabica: 4.5,
  espresso: 3.5,
};

// ------------------------------------------------------
// 5. INTERFACE EXTENSION
// ------------------------------------------------------

interface A {
  a: string;
}

interface B {
  b: string;
}

interface C extends A, B {}

/*
Interfaces can extend multiple interfaces.
Used to compose object contracts.
*/

// ======================================================
// GENERICS
// ======================================================

// ------------------------------------------------------
// 6. GENERIC FUNCTIONS
// ------------------------------------------------------

function wrapInArray<T>(item: T): T[] {
  return [item];
}

/*
Generics:
- Preserve type information
- Avoid `any`
- Make functions reusable
*/

wrapInArray("Masala");
wrapInArray(45);
wrapInArray({ variant: "Mocha" });

// ------------------------------------------------------
// 7. MULTIPLE GENERIC PARAMETERS
// ------------------------------------------------------

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

/*
Each generic parameter represents
an independent type.
*/

// ------------------------------------------------------
// 8. GENERIC INTERFACES
// ------------------------------------------------------

interface Box<T> {
  content: T;
}

const numberBox: Box<number> = { content: 10 };
const stringBox: Box<string> = { content: "10" };

// ------------------------------------------------------
// 9. REAL-WORLD GENERIC INTERFACE (API RESPONSE)
// ------------------------------------------------------

interface APIPromise<T> {
  status: number;
  data: T;
}

/*
Generic interfaces adapt to different data shapes.
*/

const res: APIPromise<{ flavour: string }> = {
  status: 200,
  data: {
    flavour: "Ginger",
  },
};

