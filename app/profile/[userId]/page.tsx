"use client"; // Client-side component

import { useSession } from 'next-auth/react'; // NextAuth.js session
import { useRouter, useParams } from 'next/navigation'; // Updated import for router and params
import ProfilePage from '../page';

const UserProfileDynamicPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();

  // Extract userId from URL params
  const userId = params?.userId;

  // Check if session is still loading
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If there is no session, redirect to login
  if (!session) {
    router.push('/login');
    return null;
  }

  // Ensure userId is defined and matches session.user.id after converting types
  if (!userId || userId !== session.user.id.toString()) {
    return <div>You are not authorized to view this page</div>;
  }

  // If the user is authorized, render the ProfilePage
  return <ProfilePage userId={session.user.id} />;
};

export default UserProfileDynamicPage;
