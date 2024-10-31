# Dialog Chat Application

A real-time chat application built with Next.js 14, Pusher, Uploadthing, ShadCN UI, Auth.js, Prisma, and PostgreSQL. This app allows users to create accounts, authenticate securely, send real-time messages, and upload media in chat.

## Features
- Real-time Messaging: Powered by Pusher for instant message updates.
- User Authentication: Secure user sign-in and sign-up using Auth.js.
- Image Uploads: Upload and share media files with Uploadthing.
- Responsive UI: Elegant and user-friendly interface with ShadCN UI.
- Data Persistence: Leveraging Prisma ORM with PostgreSQL for a reliable data layer.

## Tech Stack
- Frontend: [Next.js 14](https://nextjs.org/)
- Real-Time Communication: [Pusher](https://pusher.com/)
- Media Uploads: [Uploadthing](https://uploadthing.com/)
- UI Components: [ShadCN UI](https://ui.shadcn.com/)
- Authentication: [Auth.js](https://authjs.dev/)
- Database: [Prisma](https://www.prisma.io/) with [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### Prerequisites
- Node.js and npm installed
- PostgreSQL database
- Pusher account (you can use docker)
- Uploadthing account

### Installation

1. #### Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-chat-app.git
   cd your-chat-app
   
2. #### Install dependencies:
   ``` bash
   npm install

3. #### Set up environment variables:
   ```bash
   # Database Url
   DATABASE_URL=yourdatabaseurl

   #Github Auth Provider Crdentials
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=

   #Google Auth Provider Crdentials
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=

   #Next Auth Crdentials
   NEXTAUTH_SECRET=
   NEXTAUTH_URL=http://localhost:3000

   #Uploadthing Token
   UPLOADTHING_TOKEN=

   #Pusher Crdentials
   PUSHER_APP_ID= 
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   PUSHER_CLUSTER=
   
4. #### Set up Prisma:
   ```bash
   npx prisma generate
   
5. #### Start the development server:
   ```bash
   npm run dev
   
Your app should now be running at http://localhost:3000.