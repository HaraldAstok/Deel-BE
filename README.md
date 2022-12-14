# DEEL BACKEND TASK


## Data Models

> **All models are defined in src/model.js**

### Profile
A profile can be either a `client` or a `contractor`.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract
A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job
contractor get paid for jobs by clients under a certain contract.

## Requirements

-   Node 16 (follow `.nvmrc`, just run `nvm use`)
-   NPM 8+

## Development

-   Install dependencies `npm i`
-   Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.
-   To run service in dev environment, use `npm start`




## Technical Notes



- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.



## API

### Endpoints

-   ### `GET /contracts/:id`
    Returns the contract only if it belongs to the profile calling.

-   ### `GET /contracts/`
    Returns a list of contracts belonging to a user (client or contractor), the list contains only non terminated contracts.

-   ### `GET /jobs/unpaid`
    Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.

-   ### `POST /jobs/:job_id/pay`
    Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

-   ### `POST /balances/deposit/:userId`
    Deposits money into the balance of a contractor, a client can't deposit more than 25% his total of job to pay. (at the deposit moment)

-   ### `GET /admin/best-profession?start=<date>&end=<date>`
    Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

-   ### `GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>`
    returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
