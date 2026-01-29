# ROUTING — FUNDAMENTALS
# Date: 29/01/2026
---

## What Routing Is
Routing is the process of **mapping an incoming HTTP request to the correct handler**.
Routing decisions are typically made using:

- HTTP method
- request path
- sometimes query parameters or headers

Routing answers one question:
> **Which piece of code should handle this request?**
---

Routing separates:
- **request identification**
  from
- **request handling**

This separation is critical for clarity and scale.

---

## Where Routing Sits in the Request Lifecycle

Request arrives
→ HTTP parsing
→ Routing decision
→ Handler / controller
→ Business logic

Routing happens **before** business logic and **after** HTTP parsing.

---

## Types of Routing

### 1. Static Routes
Routes with a fixed path.
Examples:
GET /health
GET /users

Used when:
- the resource is fixed
- no dynamic identification is required

Failure mode:
- excessive static routes cause duplication and rigidity

---

### 2. Dynamic Routes (Path Parameters)
Routes where part of the path identifies a resource.
Examples:
GET /users/:id
GET /orders/:orderId

Path parameters:
- are part of the route
- identify **which resource** is being acted on

Why they matter:
- central to REST-style APIs
- clearly express resource identity

Failure mode:
- ambiguous or overloaded path parameters

---

### 3. Query Parameters
Used to modify or filter a request **without changing the resource identity**.
Examples:
GET /users?active=true
GET /orders?limit=10&page=2

Key distinction:
- path parameters → _what_ resource
- query parameters → _how_ to view, filter, or paginate

Failure mode:
- using query parameters to identify unique resources

---

### 4. Nested Routes
Routes that express **hierarchical relationships** between resources.
Example:
GET /users/:id/orders

Used when:
- one resource logically belongs to another

Benefit:
- relationships are explicit and readable

Failure mode:
- deep nesting leading to rigid and complex APIs

---

### 5. Route Versioning and Deprecation
Used to evolve APIs without breaking existing clients.

Common pattern:
/v1/users
/v2/users

Why versioning exists:
- APIs are contracts
- breaking changes must be controlled

Deprecation means:
- old routes continue to work
- clients are guided to migrate

Failure mode:
- versioning every small change unnecessarily

---

### 6. Catch-All Routes
Routes that match requests not handled by earlier routes.
Example:
GET /\*

Used for:
- returning 404 responses
- fallbacks
- frontend routing support

Important rule:
> Catch-all routes must be defined **last**.

Failure mode:
- accidentally swallowing valid routes

---
