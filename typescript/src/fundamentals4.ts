// ======================================================
// DATE: 18/01/25
// TOPIC: OOP CONCEPTS IN TYPESCRIPT
// ======================================================


// ======================================================
// 1. CLASSES & CONSTRUCTORS
// ======================================================

class Coffee {
  isBlack: boolean;
  price: number;

  constructor(isBlack: boolean, price: number) {
    this.isBlack = isBlack;
    this.price = price;
  }
}

const bulletCoffee = new Coffee(true, 20);
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


