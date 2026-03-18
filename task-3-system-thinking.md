1.  SCALING
IF THIS TASK API STARTS RECEIVING THOUSANDS OF REQUESTS PER MINUTE, THESE PROBLEMS SHOULD OCCUR
-Data  might dissapear when server restarts or crashes
-Memory will be quickly used up.
-Node.js is by default single threaded, so one slow request can block the entire server

2.  Techniques for improvement
-Switch to a proper database like SQL in order to achieve handling numerous taks
-Add Caching, meaning to use in-memory cache like node-cache for GET/tasks
-Add gzip compression(use compression middleware in Express) thuse causing responses to become smaller and consequentially faster over internet

3. PRODUCTION MONITORING
METRICS FOR MONITORING API HEALTH
-error rate
-cpu usage
-event loop lag/delay