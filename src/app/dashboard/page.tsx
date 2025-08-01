'use client'
import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return redirect('./auth/login');

  return (
    <div>
      <p>Welcome {/*session.user?.email*/ session.user?.username}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}