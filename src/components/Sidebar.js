import { Box, Flex, VStack, Text, Button, Link as ChakraLink } from '@chakra-ui/react';
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import NextLink from 'next/link';
import withAuth from '@/hoc/withAuth';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      top="0"
      w="200px"
      h="100vh"
      bg="white"
      color="black"
      boxShadow="2xl"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack spacing={5} align="stretch">
        <Flex align="center">
          <MdDashboard size={"24"} color="black" />
          <Text ml={2} fontSize="xl" color="black">
            Dashboard
          </Text>
        </Flex>
        <NextLink href="/dashboard" passHref>
          <Button
            leftIcon={<BsFillMenuButtonWideFill />}
            variant="ghost"
            width="100%"
            boxShadow="2xl"
            isActive={router.pathname === '/dashboard'} 
          >
            Home
          </Button>
        </NextLink>
        <NextLink href="/profile" passHref>
          <Button
            leftIcon={<FiUser />}
            variant="ghost"
            width="100%"
            boxShadow="2xl"
            isActive={router.pathname === '/profile'}
          >
            Profile
          </Button>
        </NextLink>
        <NextLink href="/settings" passHref>
          <Button
            leftIcon={<FiSettings />}
            variant="ghost"
            width="100%"
            boxShadow="2xl"
            isActive={router.pathname === '/settings'}
          >
            Settings
          </Button>
        </NextLink>
      </VStack>
      <Button
        leftIcon={<FiLogOut />}
        colorScheme="red"
        variant="ghost"
        boxShadow="2xl"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default withAuth(Sidebar);
