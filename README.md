# My Startup Progress
### TODOs
- [X] Design database schema.
- [ ] Right now the order of the phases is the order the phases were added to the BD. Improve this using by adding `prev` and `next` Phase attritbutes.
- [ ] Update task. Now you have to delete the task and add it again.
- [ ] !!! Update phase. Now you have to delete the phase and all the following phases, then you have to add all of them + all their tasks again.

## REQUIREMENTS
<img width="587" alt="image" src="https://user-images.githubusercontent.com/37870015/213943742-96325bcf-444c-4228-8f1c-0059a5dfdf4d.png">

* Every phase can have an unlimited amount of tasks
* If the startup accomplishes all tasks in the phase, it’s marked as done and unlocks the
next phase
* Tasks cannot be marked as completed unless all tasks in the previous phase were
completed
* Propose and implement a solution how to reopen (undo) a task

### REQUIREMENTS - FRONTEND
* Implement in React
* Store the progress in local storage
* When all phases are completed, display a random fact from https://uselessfacts.jsph.pl/random.json

### REQUIREMENTS - BACKEND
* Implement a GraphQL or REST API using Node.js
* Store the progress in memory (not the database)
* Design a database schema to store the data (no need to implement)

## HOW TO RUN THE PROJECT
Node and NPM versions:
```
node version - v16.10.0
npm version - v7.24.0

```
Frontend:
```
cd client
npm install
npm start
```
Backend:
```
cd server
npm install
npm run dev
```
