This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup (.env)

Before running the app, create a `.env` file in the project root with the following variables. These power the database (Prisma), authentication (NextAuth), and Google OAuth.

Example `.env`:

```
# Database (PostgreSQL)
# Use your own Postgres connection string. Prisma Accelerate or direct connection both work.
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-string"

# Google OAuth (NextAuth provider)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
```

Notes:
- Generate `NEXTAUTH_SECRET` with: `openssl rand -base64 32` (or any strong random string).
- In Google Cloud Console → Credentials, create an OAuth 2.0 Client ID (Web application), and set Authorized redirect URI to:
  - `http://localhost:3000/api/auth/callback/google`
- If you use Prisma Accelerate, set `DATABASE_URL` per Accelerate’s provided URL. Otherwise, use a standard Postgres URL as shown above.

After adding `.env`, run Prisma migrations and generate the client if needed:

```
npx prisma migrate dev
npx prisma generate
```


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
