"use client"

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
 
export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
 
  const login = async () => {
    await gitHubSignIn();
  }

  const logout = async () => {
    await firebaseSignOut();
  }
  
  return ( 
    <main>
      {user ? (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-10">
          <p className="text-5xl">Welcome, {user.displayName} ({user.email})</p>
          <div className="my-8 text-4xl">
            <Link href="/form" className="underline text-blue-900 hover:text-blue-600">Continue to Booking Page</Link>
          </div>
          <button onClick={logout} className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
        ) : (
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-10">
                <p className="text-5xl">Please Log In!</p>
                <button onClick={login} className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login with GitHub</button>
            </div>
        )
      }
    </main>
  )
}


