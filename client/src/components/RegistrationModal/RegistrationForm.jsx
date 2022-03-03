import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

export const RegistrationForm = ({ initialRef }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // your submit logic here
      }}
    >
      <Stack spacing={4}>
        <FormControl id="name">
          <FormLabel mb={1}>First Name</FormLabel>
          <Input autoComplete="name" ref={initialRef} />
        </FormControl>
        <FormControl id="name">
          <FormLabel mb={1}>Last Name</FormLabel>
          <Input autoComplete="name" />
        </FormControl>
        <FormControl id="email">
          <FormLabel mb={1}>Email</FormLabel>
          <Input type="email" autoComplete="email" />
        </FormControl>
        <FormControl id="affiliation">
          <FormLabel mb={1}>affiliation</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel mb={1}>Password</FormLabel>
          <Input type="password" autoComplete="current-password" />
        </FormControl>

        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Create my account
        </Button>
      </Stack>
    </form>
  );
};
