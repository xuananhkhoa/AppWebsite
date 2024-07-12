import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navbar() {
  return (
    <Box bg="white" p={4}>
      <Flex justify="space-between">
        <NextLink href="/" passHref>
          <ChakraLink color="blue.300">Home</ChakraLink>
        </NextLink>
        <NextLink href="/login" passHref>
          <ChakraLink color="white">Login</ChakraLink>
        </NextLink>
        <NextLink href="/dashboard" passHref>
          <ChakraLink color="white">Dashboard</ChakraLink>
        </NextLink>
      </Flex>
    </Box>
  );
}
