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
import { authApis } from '../../services';
import { useQueryClient } from 'react-query';

export const LoginForm = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

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
    // return new Promise((resolve) => {
      // setTimeout(() => {
        const data = {
          email: values.email,
          password: values.password,
        };

        try  {
          await authApis.loginUser(data);
          queryClient.refetchQueries(['user'], { active: true });
          history.push('/');
        } catch (err) {
          setError("email", {
            type: "manual",
          });
          setError("password", {
            type: "manual",
            message: err.response.data.message,
          });
        }

        // resolve();
      // }, 500);
    // });
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
            borderColor={mode('gray.400', 'gray.600')}
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
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="password"
            type="password"
            {...register('password')}
          />
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
