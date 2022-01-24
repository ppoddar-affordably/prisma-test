## Set-Up

### 0. Set up your database using the following SQL commands:

```
create table test.merchants
(
    id                    text                                   not null
        constraint "primary"
            primary key,
    name                  text                                   not null,
    created_at            timestamp with time zone default now() not null,
    client_id             text                                   not null
        constraint merchants_client_id_uindex
            unique,
    email                 text,
    auth0_organization_id text                                   not null
        constraint merchants_auth0_organization_id_uindex
            unique
)

insert into test.merchants (id, name, created_at, client_id, email, auth0_organization_id)
values ('merchant_01FB5QG5DXEWJ0N5WX81JPCJGZ', 'Coursera', '2021-07-21 23:48:02.638000 +00:00',
        'client_01FB5QG5DYB8E0SCPGY9YPWFXG', 't', 'org_tcC4ndh7QLScWTgy'),
       ('merchant_01FJWK616JW920VXJPJV9HZZKF', 'Calm', '2021-10-25 20:45:01.047000 +00:00',
        'client_01FJWK616KGJWVNDY42Y546SYE', 'piyush+calm@affordably.me', 'org_ktXrPSoG6tUJAbXf')

create type test.tiers_mode as enum ('GRADUATED', 'VOLUME')

create table test.product_costs
(
    id          text                                   not null
        constraint "primary"
            primary key,
    tiers       jsonb                                  not null,
    merchant_id text                                   not null
        constraint product_costs_merchants_id_fk
            references test.merchants
            on delete cascade,
    tiers_mode  test.tiers_mode                        not null,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now() not null
)

insert into test.product_costs (id, tiers, merchant_id, tiers_mode, created_at, updated_at)
values ('cost_01FBJ41K2RT53A0FPPZ3CRTWRW', '[
  {
    "up_to": 100,
    "usd": {
      "flat_amount": 0,
      "unit_amount": 0
    }
  }
]', 'merchant_01FB5QG5DXEWJ0N5WX81JPCJGZ', 'GRADUATED', '2021-09-09 00:07:32.579184 +00:00',
        '2021-09-09 00:07:32.628804 +00:00'),
       ('cost_01FBQ7SH142K9S03M3A9MZDEFJ', '[
         {
           "up_to": 100,
           "usd": {
             "flat_amount": 0,
             "unit_amount": 0
           }
         }
       ]', 'merchant_01FB5QG5DXEWJ0N5WX81JPCJGZ', 'GRADUATED', '2021-09-09 00:07:32.579184 +00:00',
        '2021-09-09 00:07:32.628804 +00:00'),
       ('cost_01FBQ7TSPW2GKDSPXCXVR3FAW7', '[
         {
           "up_to": 100,
           "usd": {
             "flat_amount": 0,
             "unit_amount": 0
           }
         }
       ]', 'merchant_01FB5QG5DXEWJ0N5WX81JPCJGZ', 'GRADUATED', '2021-09-09 00:07:32.579184 +00:00',
        '2021-09-09 00:07:32.628804 +00:00'),
       ('cost_01FF3V48E1VX4MZM2K4CJB2A29', '[
         {
           "up_to": 100,
           "usd": {
             "flat_amount": 0,
             "unit_amount": 0
           }
         }
       ]', 'merchant_01FB5QG5DXEWJ0N5WX81JPCJGZ', 'GRADUATED', '2021-09-09 00:07:32.579184 +00:00',
        '2021-09-09 00:07:32.628804 +00:00'),
       ('cost_01FHWZX6XMNX6P6T95S8C10KDZ', '[
         {
           "up_to": 100,
           "usd": {
             "flat_amount": 0,
             "unit_amount": 0
           }
         }
       ]', 'merchant_01FB5QG5DXEWJ0N5WX81JPCJGZ', 'GRADUATED', '2021-10-13 14:11:41.641000 +00:00',
        '2021-10-13 14:11:41.641000 +00:00'),
       ('cost_01FJWK7BSXHN2GRD6FXNRZNHGB', '[
         {
           "up_to": 100,
           "usd": {
             "flat_amount": 0,
             "unit_amount": 0
           }
         }
       ]', 'merchant_01FJWK616JW920VXJPJV9HZZKF', 'GRADUATED', '2021-10-25 20:45:44.649000 +00:00',
        '2021-10-25 20:45:44.649000 +00:00')
```

### 1. Get your Database CA SSL Cert and copy it into `prisma/cockroach-certs/prod`

### 2. Set your database connection URL in `.env`

### 3. Run `yarn start:dev`

### 4. Issue the following query: `SELECT * FROM test.product_costs` via cURL on the command line against `localhost:3000/sql/prisma` or `localhost:3000/sql/pg`:

```
curl --location --request POST 'http://localhost:3000/sql/prisma' \
--header 'Content-Type: application/json' \
--data-raw '{
    "query": "SELECT * FROM test.product_costs;"
}'
```

Observe the response times. You should see the first query against `/sql/prisma` take substantially longer than subsequent queries. This is in contrast to `sql/pg` where the response times should be consistently fast.
