1. Validation
(Data validation)
-Before an Order is created, UserId should be verified for certainty that it's present and is a positive number(integer)
-Verify for the presence of Items, an array and ensure the array is not empty
-Ensure each Item has a productId present as a positive number(integer)
-There should be no duplicate productID in same order
-all fields that shouldnt be present should be absent

(Business logic validation)
-If the UserId actually exists
-If the products requested are still for sale
-If the items required are enough
-If this account is still allowed to buy

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