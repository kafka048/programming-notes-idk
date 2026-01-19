// ======================================================
// DATE: 19/01/25
// TOPIC: TYPE DEFINITIONS & HTTP REQUESTS (AXIOS vs FETCH)
// ======================================================


// ======================================================
// 1. DECLARATION FILES (.d.ts)
// ======================================================

/*
.d.ts files:
- Describe types for JavaScript code
- Contain ONLY type information
- No runtime code
- Used by libraries like axios, react, etc.

They allow TS to understand JS libraries.
*/

// ======================================================
// 2. TYPING API DATA (SHAPE FIRST)
// ======================================================

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/*
Rule:
Always define the EXPECTED SHAPE of data
before consuming it.
*/

// ======================================================
// 3. AXIOS WITH GENERICS
// ======================================================

import axios from "axios";
import type { AxiosResponse } from "axios";

const fetchTodo = async () => {
  try {
    // AxiosResponse<T> is generic
    // T represents the shape of response.data
    const response: AxiosResponse<Todo> =
      await axios.get("https://jsonplaceholder.typicode.com/todos/1");

    console.log("Status:", response.status);
    console.log("Todo title:", response.data.title);
  } catch (error: unknown) {
    // Axios provides a built-in type guard
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.message);

      if (error.response) {
        console.log("HTTP status:", error.response.status);
      }
    }
  }
};

/*
Why Axios generics matter:
- response.data becomes strongly typed
- Autocomplete works correctly
- Prevents incorrect property access
*/

// ======================================================
// 4. FETCH API WITH TYPESCRIPT
// ======================================================

interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchPost = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments/1"
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // fetch() returns unknown JSON
    // We must assert or type the parsed data
    const data: Post = await response.json();

    console.log("Post email:", data.email);
  } catch (error) {
    console.log("Fetch error");
  }
};

/*
Difference from Axios:
- fetch() does NOT provide generics
- response.json() returns `any`
- Manual typing is required
*/

// ======================================================
// 🔑 KEY TAKEAWAYS — AXIOS & FETCH
// ======================================================

/*
- .d.ts files provide type info for JS libraries
- Always define interfaces for external data
- Axios supports generics → safer and cleaner
- Axios provides built-in error type guards
- Fetch requires manual typing and checks

Operational rule:
Type the data boundary first — never trust external data blindly.
*/
