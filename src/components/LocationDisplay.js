// import {
//   Button,
//   ButtonGroup,
//   Card,
//   CardBody,
//   CardFooter,
//   Divider,
//   Heading,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import locationStyle from "./LocationDisplay.module.css";

// export const LocationDisplay = ({ props, name, load }) => {
//   //   const navigate = useNavigate();

//   const deleteLocation = async () => {
//     try {
//       const response = await axios.delete(
//         "http://127.0.0.1:5000/deleteLocation",
//         {
//           headers: { "Content-Type": "application/json" },
//           data: {
//             locationName: props.locationName,
//             city: props.city,
//             zipcode: props.zipcode,
//           },
//         }
//       );

//       console.log("Location deleted:", response.data);
//       //   setload(!load); // Trigger reload of locations
//     } catch (error) {
//       console.error("Location could not be deleted:", error);
//     }
//   };

//   return (
//     <Card maxW="sm" className={locationStyle.locationCard}>
//       <CardBody>
//         <Stack mt="6" spacing="3">
//           <Heading size="md">{props.locationName}</Heading>
//           <Text>{props.address}</Text>
//           <Text>{props.city}</Text>
//           <Text>{props.zipcode}</Text>
//         </Stack>
//       </CardBody>
//       <Divider />
//       <CardFooter>
//         <ButtonGroup spacing="2">
//           <Button variant="ghost" colorScheme="red" onClick={deleteLocation}>
//             Delete Location
//           </Button>
//         </ButtonGroup>
//       </CardFooter>
//     </Card>
//   );
// };
//-----------

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import locationStyle from "./LocationDisplay.module.css";

export const LocationDisplay = ({ props, fetchLocations }) => {
  const deleteLocation = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:5000/deleteLocation",
        {
          headers: { "Content-Type": "application/json" },
          data: {
            locationName: props.locationName,
            city: props.city,
            zipcode: props.zipcode,
          },
        }
      );

      console.log("Location deleted:", response.data);
      fetchLocations(); // Refresh the locations list after deletion
    } catch (error) {
      console.error("Location could not be deleted:", error);
    }
  };

  return (
    <Card maxW="sm" className={locationStyle.locationCard}>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Text fontWeight="bold" fontSize="lg">
            <strong>Location Name:</strong> {props.locationName}
          </Text>
          <Text>
            <strong>Address:</strong> {props.address}
          </Text>
          <Text>
            <strong>City:</strong> {props.city}
          </Text>
          <Text>
            <strong>Zipcode:</strong> {props.zipcode}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="ghost" colorScheme="red" onClick={deleteLocation}>
            Delete Location
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
