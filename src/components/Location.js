import { useState, useEffect } from 'react';
import { Text, Center, Spinner, Box } from '@chakra-ui/react';

const UserLocation = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserLocation = () => {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation is not supported by your browser'));
                } else {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            resolve({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            });
                        },
                        error => {
                            reject(error);
                        }
                    );
                }
            });
        };

        const getLocationDetails = async (latitude, longitude) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                setLocation(data);
            } catch (error) {
                console.error('Error fetching location details:', error.message);
                setLocation(null);
            } finally {
                setLoading(false);
            }
        };

        getUserLocation()
            .then(location => {
                getLocationDetails(location.latitude, location.longitude);
            })
            .catch(error => {
                console.error('Error getting user location:', error.message);
                setLoading(false);
            });
    }, []);

    return (
        <Box>
            {loading ? (
                <Spinner size="lg" color="teal" />
            ) : location ? (
                <>
                    <Text fontSize="20px">{`City: ${location.address.city || 'Unknown'}`}</Text>
                    <Text fontSize="20px">{`Region: ${location.address.state || 'Unknown'}`}</Text>
                </>
            ) : (
                <Text color="red.500">Failed to retrieve location</Text>
            )}
        </Box>
    );
};

export default UserLocation;
