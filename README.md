## Getting Started

First, install dependencies:

```bash
npm install
```
Second create a .env.local file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_MOCKAROO_KEY = 
NEXT_PUBLIC_BASE_URL = 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 
CLERK_SECRET_KEY =
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
SENTRY_AUTH_TOKEN =
```

Third, run the development server:

```bash
npm run dev
```

For Moceroo Create the following Schemas:

```bash
[ 
For aggregate statistics: BounceRate/NewUsers/Session/Visitors
{
  "value": number,
  "trend_value": number,
  "trend_is_positive": boolean
},
For Users
 {
  "id": GUID,
  "firstName": string,
  "lastName": string,",
  "email": email,
  "address": address,
  "city": city,
  "country": country,
  "postalCode": postalCode,
}
For Visits
{
  "visits": number
}  
]
```

```bash
For Clerk authentication, create a new application in Clerk and add select authentication with Google then add the clerk environment variables to the .env.local file
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also check it out on Vercel: [https://oasis-sigma-six.vercel.app/sign-in](https://oasis-sigma-six.vercel.app/sign-in)

