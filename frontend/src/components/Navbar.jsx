import { Link } from "react-router-dom";
import { Flex, Heading, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      p={4}
      bg="blue.500"
      color="white"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading as="h1" size="lg">
        Sneakers Store
      </Heading>
      <Flex>
        <Button variant="ghost" mr={4}>
          Home
        </Button>
        <Button variant="ghost" mr={4}>
          Shop
        </Button>
        <Button variant="ghost" mr={4}>
          About
        </Button>
        <Link to="/signup">
          <Button variant="ghost" mr={4}>
            SignUp
          </Button>
        </Link>
        <Button variant="ghost">Contact</Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
