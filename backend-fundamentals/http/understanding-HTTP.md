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

They are signals, not decoration.

---

## 7. HTTPS (Boundary)

HTTP has no security.

HTTPS = HTTP + TLS

TLS provides:
- encryption
- integrity
- server identity

HTTP defines messages.  
TLS defines trust.

---

## 8. One Mental Model to Remember

HTTP is:
- stateless
- explicit
- message-driven

Everything else in backend engineering exists to **compensate for what HTTP does not provide**.


## 
