import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Box p={4} textAlign="center">
      <VStack spacing={4}>
        <Heading>Welcome to My Next.js App</Heading>
        <Text>Amongus</Text>
        <Button colorScheme="teal" onClick={() => router.push('/login')}>
          Go to Login
        </Button>
      </VStack>
    </Box>
  );
}
