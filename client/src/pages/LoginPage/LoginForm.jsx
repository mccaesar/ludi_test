import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { LoginSchema } from '../../validators/auth.validator';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';

export const LoginForm = () => {
  const history = useHistory();
  const { loginMutation } = useUser();

  const [responseError, setResponseError] = useState(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          email: values.email,
          password: values.password,
        };

        try {
          loginMutation.mutate(data, {
            onSuccess: () => history.push('/'),
            onError: (err) => {
                if (err.response) {
                  setResponseError(err.response.data.message);
                }
              },
          });
        } catch (err) {
          setError('email', {
            type: 'manual',
          });
          setError('password', {
            type: 'manual',
            message: err.response.data.message,
          });
        }

        resolve();
      }, 500);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl
          isInvalid={!!errors?.email || responseError}
          errortext={errors?.email?.message || responseError}
        >
          <FormLabel mb={1}>Email</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          <FormErrorMessage>{errors?.email?.message || responseError}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.password || responseError}
          errortext={errors?.password?.message || responseError}
        >
          <FormLabel mb={1}>Password</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="password"
            type="password"
            {...register('password')}
          />
          <FormErrorMessage>{errors?.password?.message || responseError}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          isLoading={isSubmitting}
          colorScheme="blue"
          size="lg"
          fontSize="md"
        >
          Log in
        </Button>
      </Stack>
    </form>
  );
};
