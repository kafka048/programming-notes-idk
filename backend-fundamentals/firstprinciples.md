# FIRST PRINCIPLES OF BACKEND

The core principles or the building blocks that exist in every backend system, regardless of the language or framework.

1. Request-Response Lifecycles
   Defines how a request is received, processed, and responded to.
   All backend behavior exists inside this boundary.

2. Routing
   Selects the correct handler for a request.

3. Middlewares/Proxies
   Enforces cross-cutting policies outside business logic.
   Keeps concerns separated and predictable.

4. Authentication and Authorisation
   Authentication establishes identity.
   Authorization restricts capability.

5. Validation and Sanitisation
   Constrains input to valid, safe data before use.
   Prevents corruption and abuse at the boundary.

6. Business Logic
   Implements rules that transform state.
   Must be isolated, deterministic, and testable.

7. Data Persistence
   Stores state beyond request execution.

8. Error Handling
   Controls failure paths without breaking system flow.

9. Observability
   Provides insight into system behavior.

10. Concurrency and Asynchrony
    Handles multiple operations safely in parallel.
    Prevents race conditions and state inconsistency.
    
11. Security
    Protects data, execution, and access boundaries.
    Assumed at every layer.

12. Scalability and Performance
    Maintains correct behavior under increasing load.
