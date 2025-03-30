# Task Manager

Task Manager is a tool built using the T3 stack. It leverages Next.js, TypeScript, tRPC, Prisma, Supabase, and SST (Serverless Stack) on AWS.


## Installation

1. Clone the repository:
```bash
git clone https://github.com/racky7/task-manager/
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables

```bash
cp .env.example .env
```
You need to set up the following environment variables:

DATABASE_URL – PostgreSQL connection string

DIRECT_URL – PostgreSQL connection string

AUTH_SECRET – Secret key for authentication


4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment Instructions

Follow these steps to deploy the Next.js app:

1. **Configure AWS Credentials:**  
   Update your `~/.aws/credentials` file with your AWS access details:

   ```ini
   [default]
   aws_access_key_id = <YOUR_ACCESS_KEY_ID>
   aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
   ```

2. **Deploy the Application:**  
   Run the following command to deploy the app:  
   ```sh
   npm run deploy:prod
   ```

3. **Copy the Deployed URL:**  
   After deployment, copy the deployed URL provided in the terminal.

4. **Update Environment Variables:**  
   Modify the `.env` file and update the `NEXTAUTH_URL` with the deployed URL:  
   ```ini
   NEXTAUTH_URL=<DEPLOYED_URL>
   ```

5. **Redeploy the Application:**  
   Run the deployment command again to apply the changes:  
   ```sh
   npm run deploy:prod
   ```

Your application should now be successfully deployed with the correct authentication URL.