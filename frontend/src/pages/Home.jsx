import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Flex, Box, Heading, Input, Button, Image } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Sneakers = [
  {
    id: 1,
    name: "Nike Air Max 90",
    brand: "Nike",
    price: "$120",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2023/05/running-shoes-2048px-9718.jpg",
  },
  {
    id: 2,
    name: "Adidas UltraBoost",
    brand: "Adidas",
    price: "$150",
    image:
      "https://zeros.world/cdn/shop/products/nikedunklowargon2022-1.jpg?v=1668294915",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    brand: "Nike",
    price: "$120",
    image:
      "https://img.etimg.com/thumb/width-1600,height-900,imgsize-143804,resizemode-75,msid-103243198/top-trending-products/lifestyle/12-best-selling-sneakers-for-men-under-1000-to-step-up-your-style.jpg",
  },
  {
    id: 4,
    name: "Adidas UltraBoost",
    brand: "Adidas",
    price: "$150",
    image:
      "https://nb.scene7.com/is/image/NB/mfcxlq4_nb_05_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&",
  },
  {
    id: 5,
    name: "Nike Air Max 90",
    brand: "Nike",
    price: "$120",
    image:
      "https://nb.scene7.com/is/image/NB/m880g14_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
  },
  {
    id: 6,
    name: "Adidas UltraBoost",
    brand: "Adidas",
    price: "$150",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2023/05/running-shoes-2048px-9718.jpg",
  },
  {
    id: 7,
    name: "Nike Air Max 90",
    brand: "Nike",
    price: "$120",
    image:
      "https://nb.scene7.com/is/image/NB/m880g14_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
  },
  {
    id: 8,
    name: "Adidas UltraBoost",
    brand: "Adidas",
    price: "$150",
    image:
      "https://zeros.world/cdn/shop/products/nikedunklowargon2022-1.jpg?v=1668294915",
  },
];

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-gray-900">
      <Navbar />
      <Box p={8}>
        <Heading as="h2" size="xl" mb={4} color="white">
          Welcome to Sneakers Store
        </Heading>
        <Flex bg="gray.100" p={4} borderRadius="md" alignItems="center">
          <Input
            variant="unstyled"
            placeholder="Search for sneakers..."
            flex="1"
            mr={2}
            _focus={{ outline: "none" }}
          />
          <Button colorScheme="blue">
            <FaSearch />
          </Button>
        </Flex>
      </Box>
      <Flex flexWrap="wrap" justifyContent="center">
        {Sneakers.map((sneaker) => (
          <Box
            key={sneaker.id}
            maxW="300px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            m={4}
            bg="white"
          >
            <Image
              src={sneaker.image}
              alt={sneaker.name}
              width={600}
              height={250}
            />
            <Box p={4}>
              <Heading as="h3" size="md" mb={2}>
                {sneaker.name}
              </Heading>
              <Box mb={2}>{sneaker.brand}</Box>
              <Box fontWeight="bold" mb={2}>
                {sneaker.price}
              </Box>
              <Flex justifyContent="space-between">
                <Button variant="outline">
                  <FaHeart /> Add to Wishlist
                </Button>
                <Button colorScheme="blue">
                  <FaShoppingCart /> Add to Cart
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>
      <Footer />
    </div>
  );
};

export default HomePage;
