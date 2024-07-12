import { Heading,
    Box,
    Text,
    Switch,
    Card as ChakraCard, 
    CardBody, 
    SimpleGrid,  
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Flex, } from '@chakra-ui/react';
import { MdGraphicEq } from "react-icons/md";
import Layout from '@/components/layouts/Layout';
import withAuth from '@/hoc/withAuth';

const Profile= () => {
  return (
    <>
    <Layout>
    <ChakraCard bg='white' color='black'>
      <CardBody>
          <Heading>Settings</Heading>
        <Text>Display user profile</Text>
      </CardBody>
    </ChakraCard>
    <br></br>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(500px, 1fr))'>
    <ChakraCard bg='white' color='black'>
      <CardBody>
        <Heading>Setting 1</Heading>
        <br></br>
        <Slider aria-label='slider-ex-4' defaultValue={0} width="50%">
            <SliderTrack bg="red.100">
                <SliderFilledTrack bg="tomato"/>
            </SliderTrack>
            <SliderThumb boxSize={6}>
                <Box color='tomato' as={MdGraphicEq} />
            </SliderThumb>
        </Slider>
      </CardBody>
    </ChakraCard>
    <ChakraCard bg='white' color='black'>
      <CardBody>
        <Heading>Setting 2</Heading>
        <Text>Display user profile</Text>
        <Flex direction="column" mt={5} transition="all 0.2s">
        <Flex align="center">
          <Switch size="lg"/>
          <Text ml={2}>Switch 1</Text>
        </Flex>
        <Flex align="center" mt={2}>
          <Switch size="lg"/>
          <Text ml={2}>Switch 2</Text>
        </Flex>
        {/* Add more switches as needed */}
      </Flex>
      </CardBody>
    </ChakraCard>
    </SimpleGrid>
    </Layout>
    </>
  );
};

export default withAuth(Profile);
