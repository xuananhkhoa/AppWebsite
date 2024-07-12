import { Box, Heading, Input, Button } from '@chakra-ui/react';

const LoginForm = () => {
  return (
    <Box maxW="md" mx="auto" mt="10">
      <Box p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading as="h2" size="lg" mb="6" textAlign="center">
          Login
        </Heading>
        <Input placeholder="Username" mb="4" />
        <Input type="password" placeholder="Password" mb="6" />
        <Button colorScheme="blue" size="lg" w="full">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
