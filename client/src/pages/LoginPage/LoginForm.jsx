import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
} from '@chakra-ui/react';
import { LoginSchema } from '../../validators/auth.validator';
import { postLogin } from '../../services';

export const LoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          email: values.email,
          password: values.password,
        };
        postLogin(data);
        resolve();
      }, 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl
          isInvalid={!!errors?.email}
          errortext={errors?.email?.message}
        >
          <FormLabel mb={1}>Email</FormLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.password}
          errortext={errors?.password?.message}
        >
          <FormLabel mb={1}>Password</FormLabel>
          <Input id="password" type="password" {...register('password')} />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
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
