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
  Alert,
  AlertIcon
} from '@chakra-ui/react';


import { ResetPasswordSchema } from '../../validators/auth.validator';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';

export const ResetForm = (id) => {



  const history = useHistory();
  const { resetPasswordMutation } = useUser();

  const [responseError, setResponseError] = useState(null);

  const initialValues = {
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
    resolver: yupResolver(ResetPasswordSchema),
  });


  const onSubmit = async (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          password: values.password,
          userId: id
        };

        try {
            resetPasswordMutation.mutate(data, {
            onSuccess: () => history.push('/login'),
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
          Submit
        </Button>

      </Stack>
    </form>
  );
};
