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



import { RequestPasswordSchema } from '../../validators/auth.validator';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';

const alertBox =() => {
    return (        
    <Alert status='success'>
        <AlertIcon />
        Email sent!
    </Alert>
)}


export const ResetForm = () => {
  const history = useHistory();
  const { requestPasswordMutation } = useUser();

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
    resolver: yupResolver(RequestPasswordSchema),
  });

  const onSubmit = async (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          email: values.email,
          url: window.location.href
        };

        try {
          requestPasswordMutation.mutate(data, {
            onSuccess: () => alert("Email sent."),
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
