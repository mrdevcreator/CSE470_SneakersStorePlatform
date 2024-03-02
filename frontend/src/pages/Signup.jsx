import { useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Heading, Input, Button } from "@chakra-ui/react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Email: ${email}, Password: ${password}`);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900">
      <Box>
        <Flex
          p={4}
          bg="blue.500"
          color="white"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading as="h1" size="lg">
            Sign Up
          </Heading>
          <Link to="/">
            <Button variant="ghost">Sign In</Button>
          </Link>
        </Flex>

        <Box p={8}>
          <form onSubmit={sendData}>
            <div className="mb-4">
              <label className="text-white mb-2 block">Username</label>
              <Input
                type="text"
                placeholder="Jsmith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text-white mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="something@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="text-white mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="########"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
            >
              Submit
            </Button>
          </form>
          <p className="mt-8 text-center text-white">
            Have Discord or Already have an account?
          </p>
          <Link to="/">
            <Button
              variant="link"
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Sign In
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default SignUp;
