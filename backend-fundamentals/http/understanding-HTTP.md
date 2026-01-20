# HTTP — FUNDAMENTALS FOR BACKEND ENGINEERS
Date: 19/01/26

---

## 1. What HTTP Is

HTTP is a **stateless request–response protocol**.

- Client sends a request
- Server returns a response
- No state is stored between requests by HTTP itself

HTTP defines **how messages look and how intent is expressed**.  
It does not handle identity, security, or reliability.

---

## 2. HTTP Messages

HTTP communication happens through **messages**.

There are two types:
- Request
- Response

Each message has:
1. **Start line**
2. **Headers**
3. **Optional body**

### Request Start Line
METHOD /path HTTP/version


- Method → intent
- Path → target resource
- Version → protocol rules

---

## 3. Headers (Why They Exist)

Headers carry **metadata**, not data.

They are used to:
- describe the body
- pass context
- negotiate behavior

Without headers, HTTP cannot work in real systems.

### Important Header Categories

**Request headers**
- `Authorization`
- `Cookie`
- `Accept`
- `User-Agent`

**Representation headers**
- `Content-Type`
- `Content-Length`
- `Content-Encoding`
- `ETag`

**General headers**
- `Cache-Control`
- `Connection`
- `Date`

/* Headers are **inputs**. Never trust them blindly. */

---

## 4. HTTP Methods (Intent)

Methods define **what the client wants to do**.

- **GET** — read (no modification)
- **POST** — create / trigger
- **PUT** — replace entire resource
- **PATCH** — partial update
- **DELETE** — remove

Wrong method = wrong semantics.

---

## 5. Idempotency (Critical)

An operation is **idempotent** if repeating it results in the same final state.
For example, the following methods are idempotent: GET, PUT, DELETE

Why this matters:
- Retries happen
- Timeouts happen
- Load balancers retry

Non-idempotent: an operation which on repeating produce varying results for the same request.
PUT method is a non idempotent operation 
Non-idempotent design causes **data corruption**.

---

## 6. Status Codes (Signals)

Status codes tell the client **what happened**.

- **2xx** — success
- **4xx** — client mistake
- **5xx** — server failure

---

## One Mental Model to Remember

HTTP is:
- stateless
- explicit
- message-driven

Everything else in backend engineering exists to **compensate for what HTTP does not provide**.


## CORS (Cross-Origin Resource Sharing)

### What CORS Is
CORS is a **browser-enforced security mechanism** that controls whether a web page can make requests to a different origin.
Origin = **scheme + domain + port**
CORS exists because browsers follow the **Same-Origin Policy**.

---

## Cross-Origin Request (Clarified)

A request is **cross-origin** when:
- the origin of the web page
- and the origin of the server

are **not identical**.

This comparison is done by the **browser**, not the server.

---

### Same-Origin Policy
Browsers, by default, prevent JavaScript running on one origin from reading responses from another origin.

This prevents:
- malicious websites from stealing data
- unauthorized cross-site actions using cookies or tokens

CORS is the **controlled relaxation** of this rule.

---

### What CORS Is NOT
- Not authentication
- Not authorization
- Not backend security
- Not enforced by servers

---

## Simple Request Flow

A **simple request** does not require preflight.

### Flow
1. Browser sends the request with an `Origin` header
2. Server responds with:
   - `Access-Control-Allow-Origin`
3. Browser checks the response:
   - If header is present and valid → response is allowed
   - If missing or invalid → browser blocks access to response

Important:
> The request reaches the server either way.  
> Only the **response access** is blocked by the browser.

---

## Preflighted Request Flow

Some requests are considered **potentially dangerous** by browsers.
Before sending them, the browser sends a **preflight request**.

---

### When Preflight Is Triggered
Preflight occurs if **any one** of the following is true:

1. Method is not `GET`, `POST`, or `HEAD`
2. Request uses non-simple headers (e.g. `Authorization`, `X-Custom-Header`)
3. `Content-Type` is not a simple type  
   (e.g. `application/json` triggers preflight)

---

### Preflight Flow

1. Browser sends an `OPTIONS` request
2. Server responds with permission headers:
   - `Access-Control-Allow-Origin` Which origin is allowed
   - `Access-Control-Allow-Methods` Which HTTP methods are permitted
   - `Access-Control-Allow-Headers` Which headers may be sent
   - `Access-Control-Max-Age` How long the browser can cache the preflight result
3. Browser evaluates the response:
   - Allowed → sends the original request
   - Not allowed → blocks the request entirely

If blocked:
> The original request is **never sent**.

---

## Final Mental Model 

- Browser enforces Same-Origin Policy
- CORS is a browser permission system
- OPTIONS is the permission check
- Backend logic runs **only if the browser allows it**
- CORS answers:
> “Can browser JavaScript access this response?”
















