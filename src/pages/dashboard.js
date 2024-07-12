import { Heading, Text, Card, CardBody, SimpleGrid, Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CustomCard from '@/components/CustomCards';
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { SiOxygen } from "react-icons/si";
import { TiWeatherCloudy, TiWeatherWindyCloudy } from "react-icons/ti";
import { AspectRatio } from '@chakra-ui/react'
import Layout from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import RoundedIframe from '@/components/RoundedIframe';
import withAuth from '@/hoc/withAuth';
import Clock from '@/components/Clock';
import UserLocation from '@/components/Location';
import Weather from '@/components/Weather';
const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const weatherData = Weather();
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <>
    <Layout>
    <Card bg='white' color='black' boxShadow="2xl">
      <CardBody>
        <Heading>Dashboard</Heading>
        <Text fontSize="20px">Welcome {user.email}</Text>
      </CardBody>
    </Card>
    <br></br>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
    <Card bg='white' color='black' boxShadow="2xl">
      <CardBody>
        <Heading>Local Time</Heading>
        <Clock></Clock>
      </CardBody>
    </Card>
    <Card bg='white' color='black' boxShadow="2xl">
      <CardBody>
        <Heading>Location</Heading>
        <UserLocation></UserLocation>
      </CardBody>
    </Card>
    </SimpleGrid>
    <br></br>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      <CustomCard
        title="Temperature"
        icon={FaTemperatureHigh}
        buttonText="View here"
        statProps={{ label: "Stats", number: "35°C", helpText: "6%", arrowType: "increase" }}
      />
      <CustomCard
        title="Humidity"
        icon={WiHumidity}
        buttonText="View here"
        statProps={{ label: "Stats", number: "90%", helpText: "1%", arrowType: "decrease" }}
      />
      <CustomCard
        title="Air Quality"
        icon={SiOxygen}
        buttonText="View here"
        statProps={{ label: "Stats", number: "35", helpText: "23.36%", arrowType: "increase" }}
      />
      <CustomCard
        title="Weather"
        icon={TiWeatherCloudy}
        buttonText="View here"
        statProps={{showArrow: false}}
        CustomSize="20px"
        bodyText={weatherData && weatherData.split(',')[1]}
      />
      <CustomCard
        title="Weather Temp"
        icon={TiWeatherWindyCloudy}
        buttonText="View here"
        statProps={{ label: "Stats", number: `${weatherData && weatherData.split(',')[0]}`, showArrow:false}}
      />
      
    </SimpleGrid>
    <br></br>
    <RoundedIframe youtubeUrl={"https://www.youtube.com/watch?v=xvFZjo5PgG0"} borderRadius="10px">
      </RoundedIframe>
    </Layout>
    </>
  );
};

export default withAuth(Dashboard);