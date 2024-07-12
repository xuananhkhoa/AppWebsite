import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/');
        } else {
          setLoading(false);
        }
      };

      checkUser();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;