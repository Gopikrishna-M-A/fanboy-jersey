import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../lib/mongodb"
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    theme: {
        colorScheme: "light", 
        brandColor: "#2F2E2E", 
        logo: "", 
        buttonText: "" 
    },
    callbacks: {
        // async signIn({ user, account, profile }) {
        //     const newUser = {
        //         name: user.name,
        //         email: user.email,
        //         image: user.image,
        //         oAuthId: user.id,
        //       };
        //       await fetch(`${baseURL}/api/user`, {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(newUser),
        //       });

        //       return true;
        // },
        async session({ session }) {
              const response = await fetch(`${baseURL}/api/user/email/${session.user.email}`, { method: 'GET' });
              const data = await response.json();
          
                session.user._id = data[0]._id;
                session.user.phone = data[0].phone;
                session.user.address = data[0].address;
                return session;
              
        }
    }
} 