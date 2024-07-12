import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../lib/supabaseClient';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';

const Login = () => {
  const toast = useToast()
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login failed',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
      } else {
        setLoginError(null);
        toast({
          title: 'Login successful',
          description: 'Redirecting to dashboard...',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000); // 2000 milliseconds (2 seconds) delay
      }
    },
  });

  return (
    <Box
      maxWidth="md"
      mx="auto"
      mt="10"
      p="6"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading as="h1" mb="6" textAlign="center">
        Login
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="4">
          <FormControl isInvalid={formik.touched.email && formik.errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          {loginError && (
            <Box color="red.500" textAlign="center">
              {loginError}
            </Box>
          )}

          <Button type="submit" colorScheme="blue">
            Login
          </Button>
          <Text textAlign="center" mt="2" fontSize="sm">
            Not signed in? <a href="/signup" style={{color: 'blue'}}>Sign up</a>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
