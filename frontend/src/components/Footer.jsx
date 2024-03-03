import { Link } from "react-router-dom";
import { Flex, Box, Heading, Button, Icon } from "@chakra-ui/react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <Flex
      p={4}
      bg="blue.500"
      color="white"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box mb={4}>
        <Heading as="h3" size="md" mb={2} textAlign="center">
          Connect with us
        </Heading>
        <Flex>
          <Button
            as="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            mr={2}
          >
            <Icon as={FiFacebook} w={6} h={6} />
          </Button>
          <Button
            as="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            mr={2}
          >
            <Icon as={FiTwitter} w={6} h={6} />
          </Button>
          <Button
            as="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            mr={2}
          >
            <Icon as={FiInstagram} w={6} h={6} />
          </Button>
        </Flex>
      </Box>
      <Box mb={4} justifyContent="center" justifyItems="center">
        <Heading as="h3" size="md" mb={2} textAlign="center">
          Quick Links
        </Heading>
        <Flex flexWrap="wrap">
          <Link
            to="/"
            className="mx-4 text-black hover:text-white border-b-2 border-transparent hover:border-white"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/"
            className="mx-4 text-black hover:text-white border-b-2 border-transparent hover:border-white"
          >
            Privacy Policy
          </Link>
        </Flex>
      </Box>
      <Box textAlign="center">
        <p className="mb-2">
          Sneakers Store brings you the latest and greatest in footwear fashion.
          Browse our collection and step into style!
        </p>
        <p>&copy; 2024 Sneakers Store G5_470</p>
      </Box>
    </Flex>
  );
};

export default Footer;
