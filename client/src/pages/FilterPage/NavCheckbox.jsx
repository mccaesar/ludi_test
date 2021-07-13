import { Box, HStack, Checkbox } from '@chakra-ui/react'
import { BsCaretRightFill } from 'react-icons/bs'

export const NavCheckbox = (props) => {
  const { active, subtle, children, label, endElement } = props
  return (
    <HStack
      w="full"
      px="3"
      py="2"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      _hover={{ bg: 'gray.700' }}
      _active={{ bg: 'gray.600' }}
    >
      <Checkbox flex="1" fontWeight="inherit" color={subtle ? 'gray.400' : undefined}>
        {label}
      </Checkbox>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}
