import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Box, Heading, Input, Button } from "@chakra-ui/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-600 to-gray-900">
      <Box>
        <Flex
          p={4}
          bg="blue.500"
          color="white"
          alignItems="center"
          justifyContent="space-between"
          rounded={"lg"}
        >
          <Heading as="h1" size="lg">
            SignIn
          </Heading>
          <Link to="/signup">
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </Flex>

        <Box p={8}>
          <form onSubmit={sendData}>
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
            Don&apos;t have an account yet?{" "}
            <Link to="/signup" className="underline decoration-1.5 text-2xl">
              Sign Up
            </Link>
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default SignIn;
