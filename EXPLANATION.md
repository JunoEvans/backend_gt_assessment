. Validation
(Data validation)
-Before an Order is created, UserId should be verified for certainty that it's present and is a positive number(integer)
-Verify for the presence of Items, an array and ensure the array is not empty
-Ensure each Item has a productId present as a positive number(integer)
-There should be no duplicate productID in same order
-all fields that shouldnt be present should be absent

(Business logic validation)
-If the UserId actually exists
The idea is to ascertain that this individual is actually real to avoid taking ghost orders

-If the products requested are still for sale
The idea is to ascertain that this product is still available or out for sale so as to avoid validating sales of products not available and thus dissapointing customers

-If the items required are enough
The idea is to ensure the quantity required is still within selling capabilities

-If this account is still allowed to buy
just incase the account requesting the order wasn't banned

2. POSSIBLE ERRORS
-Product not found
-invalid request format
-Insufficient stock
-invalid quantity
-Maximum Order requested

3. HTTP RESPONSES
-Succesful order creation-- 201 Created
The customer has succeded at fulfilling a request to create a new order, hence that response(201 Created) Indicates that, yh this is done.

-Invalid Request body-- 400 Bad Request
The request did not fully follow the format for a request, hence, not understood, Basically informing the customer to check for mistakes in the requests they have inputed and fix it.

-Product not found-- 404 Not Found
what the customer requsted could not be found

-Server error-- 500 Internal Server Error
When the problem comes from us and not anything the customer did, we inform them to be patient, not your fault



# Explanation – Task Management API Implementation

## How I approached the implementation
I started very simple
1. Made one single file (index.js) with everything inside to make it easy to read and run the best i can
2. I also Used in-memory array for tasks (no database setup needed).
3. Added basic header check (x-user-id) instead of real login.
4. Checked permissions manually in each route (if assignedBy == current user, etc.).
5. Added try/catch for basic error handling and proper status codes (201, 400, 403, 404, 204).

Later I could split into folders/files like the "professional" version.

## Why I structured the code the way I did
- Keep it in **one file** → beginners can see everything at once, no "where is that function?" confusion.
- Helper function for user ID → avoid repeating code.
- Try/catch in every route → catch mistakes and return nice error messages instead of server crash.
- Clear comments → so I (or you) understand later.

## Assumptions I made
- User is trusted via x-user-id header (no real JWT/auth yet).
- No need to filter tasks by user (everyone sees all tasks) – simple for now.
- assignedTo and assignedBy are just numbers (no user table check).
- Tasks never get too many (in-memory is ok for demo/assessment).
- No rate limiting, no HTTPS, no logging to file.

## What I would improve if given more time
1. Add real database (MongoDB or PostgreSQL).
2. Add JWT authentication instead of header.
3. Split code: routes/, controllers/, services/, models/, middleware/.
4. Add Redis for caching + rate limiting.
5. Use PM2 for clustering & monitoring.
6. Support filtering tasks by current user only.

## Tools or AI assistance used
I used Grok (xAI) to help explain some steps and give code examples. I read and understood each line before using it. I also searched Google and youtube sometimes for Express best practices and for ways to improve my code