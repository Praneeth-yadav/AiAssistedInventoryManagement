import { Button, ButtonGroup, useToast } from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";
// import { Uploadimage } from "./Uploadimage";
import { Navbar } from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";

export const CustomerService = () => {
  const [description, setDescription] = useState("");
  //   const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //   const [decision, setDecision] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  //   const navigate = useNavigate();
  const location = useLocation();

  //   const handleImageUpload = (file) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64data = reader.result;
  //       setImage(base64data); // Set the base64-encoded image in state
  //     };
  //     reader.readAsDataURL(file); // Convert the file to base64 format
  //   };

  //   const handleSubmit = async () => {
  //     setIsLoading(true);
  //     const requestData = {
  //       description,
  //       image, // Send the base64-encoded image data to the API
  //     };

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/getDecision",
  //         requestData
  //       );
  //     //   setDecision(response.data.decision);
  //       toast({
  //         title: "Success",
  //         description: "Your request has been processed.",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     } catch (error) {
  //       console.error("Error getting decision:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to process your request.",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <>
      <Navbar name={location.state.name} />
      {/* <Stack spacing={4} maxWidth="500px" margin="auto" padding="20px">
        <InputGroup>
          <InputLeftAddon children="Description" />
          <Textarea
            placeholder="Describe your issue here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>

        <Uploadimage onImageUpload={handleImageUpload} />

        <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
          Submit
        </Button>

        {decision && (
          <div style={{ marginTop: "20px" }}>
            <h3>Decision:</h3>
            <p>{decision}</p>
          </div>
        )}
      </Stack> */}
      <ButtonGroup spacing="2">
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => {
            navigate(
              "/orderIssue",
              {
                state: {
                  description: description,
                  //   base64Image: image,
                  name: location.state.name,
                },
              },
              { replace: true }
            );
          }}
        >
          Report Order Issue
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => {
            navigate(
              "/transactionIssue",
              {
                state: {
                  description: description,
                  //   base64Image: image,
                  name: location.state.name,
                },
              },
              { replace: true }
            );
          }}
        >
          Report Fradulent Transaction
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CustomerService;
