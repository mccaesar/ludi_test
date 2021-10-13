import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';

import { Text, Center } from '@chakra-ui/react';

export const UploadPage = () => {
  return (
    <WithFooter>
      <Navbar />
      <>
        {/* <Center py={10}> */}
        <Text fontSize="lg" textAlign="center">
          We welcome feedback and suggestions for content to be included on this
          site.
          Please email us at ludi@illinois.edu.
          Additional resources can be submitted through the form below.
        </Text>
        {/* </Center> */}
        <Center py={2}>
          <iframe
            title="Upload Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLScDnl0EqT7Kb_tsGRcqGHFEVZjN8DqKSpwql7CUwsmw_Qs9Iw/viewform?embedded=true"
            width="700"
            height="700"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        </Center>
      </>
    </WithFooter>
  );
};
