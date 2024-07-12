import { Box, Heading } from '@chakra-ui/react';
import Layout from '@/components/layouts/Layout';
import withAuth from '@/hoc/withAuth';
const Setting = () => {
  return (
    <>
    <Layout>
    <Box>
      <Heading>Settings</Heading>
      {/* Add settings content here */}
    </Box>
    </Layout>
    </>
  );
};

export default withAuth(Setting);
