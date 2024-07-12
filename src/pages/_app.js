import { ChakraProvider, Box } from '@chakra-ui/react';
import Fonts from '@/components/fonts';
import theme from '@/lib/theme';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(router.pathname === '/dashboard' || router.pathname === '/settings' || router.pathname === '/profile');
  }, [router.pathname]);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Fonts />
          {showSidebar && <Sidebar />}
          <Box ml={showSidebar ? "200px" : "0"} p={4}>
            <Component {...pageProps} />
          </Box>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
