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

const Signup = () => {
  const [signupError, setSignupError] = useState(null);
  const toast = useToast()
  const router = useRouter();

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

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
            title: 'Signup failed',
            description: error.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top'
          });
      } else {
        setSignupError(null);
        toast({
            title: 'Signup successful',
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
        Sign Up
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="4">
          <FormControl isInvalid={formik.touched.email && formik.errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              outlineColor="blue.400"
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
              outlineColor="blue.400"
              {...formik.getFieldProps('password')}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          {signupError && (
            <Box color="red.500" textAlign="center">
              {signupError}
            </Box>
          )}

          <Button type="submit" colorScheme="blue" mt={6}>
            Sign Up
          </Button>
          <Text textAlign="center" mt="2" fontSize="sm">
            Signed in? <a href="/login" style={{color: 'blue'}}>Login</a>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default Signup;
