# mumble_death_clock

env vars:
STRIPE_API_KEY - gotta make an api key with read permissions for Balance
PUBLIC_BILLING_DAY - what day of the month DO/whoever bills the account
PUBLIC_MONTHLY_CHARGE - how much per month it costs, think it might have to be a decimal
PUBLIC_STRIPE_DONATE_HREF - the stripe donate link url

all the PUBLIC prefix means is that it's exposed to the frontend
the balance api call is proxied to the backend so the key isn't exposed
