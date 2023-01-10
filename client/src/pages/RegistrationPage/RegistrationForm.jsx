import { useState } from 'react';
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
import { useUser } from '../../hooks/useUser';

export const RegistrationForm = () => {
  const history = useHistory();
  const { registerMutation } = useUser();

  const [responseError, setResponseError] = useState(null);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    affiliation: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit = async (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          affiliation: values.affiliation,
          title: values.title,
          password: values.password,
        };
        try {
          registerMutation.mutate(data, {
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
          isInvalid={!!errors?.firstName}
          errortext={errors?.firstName?.message}
        >
          <FormLabel mb={1}>First Name</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
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
          isInvalid={!!errors?.email || responseError}
          errortext={errors?.email?.message || responseError}
        >
          <FormLabel mb={1}>Email</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="email"
            type="email"
            autoComplete="email"
            onChange={() => setResponseError(null)}
            {...register('email')}
          />
          <FormErrorMessage>
            {errors?.email?.message || responseError}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.affiliation || responseError}
          errortext={errors?.affiliation?.message || responseError}
        >
          <FormLabel mb={1}>Affiliation</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="affiliation"
            type="text"
            onChange={() => setResponseError(null)}
            {...register('affiliation')}
          />
          <FormErrorMessage>
            {errors?.affiliation?.message || responseError}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.title || responseError}
          errortext={errors?.title?.message || responseError}
        >
          <FormLabel mb={1}>Title</FormLabel>
          <Input
            borderColor={mode('gray.400', 'gray.600')}
            id="title"
            type="text"
            onChange={() => setResponseError(null)}
            {...register('title')}
          />
          <FormErrorMessage>
            {errors?.title?.message || responseError}
          </FormErrorMessage>
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
