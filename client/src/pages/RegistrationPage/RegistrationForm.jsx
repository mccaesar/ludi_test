import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { RegistrationSchema } from '../../validators/auth.validator';
import { registerUser } from '../../actions/auth.action';

export const RegistrationForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
        dispatch(registerUser(data));
        if (errorMessage) {
          alert(errorMessage);
        } else {
          history.push('/login');
        }
        resolve();
      }, 500);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl
          isInvalid={!!errors?.firstName}
          errortext={errors?.firstName?.message}
        >
          <FormLabel mb={1}>First Name</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            variant="filled"
            id="firstName"
            type="text"
            {...register('firstName')}
          />
          <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.lastName}
          errortext={errors?.lastName?.message}
        >
          <FormLabel mb={1}>Last Name</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="lastName"
            type="text"
            {...register('lastName')}
          />
          <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
        </FormControl>

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

        <FormControl
          isInvalid={!!errors?.passwordConfirmation}
          errortext={errors?.passwordConfirmation?.message}
        >
          <FormLabel mb={1}>Confirm your password</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="passwordConfirmation"
            type="password"
            {...register('passwordConfirmation')}
          />
          <FormErrorMessage>
            {errors?.passwordConfirmation?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          isLoading={isSubmitting}
          colorScheme="blue"
          size="lg"
          fontSize="md"
        >
          Create my account
        </Button>
      </Stack>
    </form>
  );
};
