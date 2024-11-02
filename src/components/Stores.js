// import {
//   Button,
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   Stack,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useState } from "react";
// import StoresStyle from "./Stores.module.css";
// import { Navbar } from "./Navbar";
// import { useLocation } from "react-router-dom";

// export function Stores({ setload }) {
//   const location = useLocation();
//   const [locationName, setLocationName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [zipcode, setZipcode] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("authenticated");
//     console.log("loggedin", location.state.name);

//     if (loggedInUser) {
//       setauthenticated(loggedInUser);
//     } else {
//       navigate("/", { replace: true });
//     }
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:5000/getLocation");
//         console.log("result=", res);
//         setsearch(res.data);
//         response.current = res.data;
//         console.log("response=", res.data);
//       } catch (e) {
//         console.log(e);
//       }
//     };
//   const addLocation = async () => {
//     const date = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

//     const locationData = {
//       locationName,
//       address,
//       city,
//       zipcode,
//       createdDate: date,
//       addedBy: "Admin",
//     };

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://127.0.0.1:5000/addLocation",
//         locationData
//       );
//       console.log("Location added:", response.data);
//       setload(true);
//       setIsLoading(false);
//     } catch (e) {
//       console.log("New location cannot be added", e);
//       setIsLoading(false);
//       alert("Error: Location could not be added.");
//     }
//   };

//   return (
//     <>
//       <div className={StoresStyle.content}>
//         <Navbar name={location.state?.name || "Guest"} />
//         <div className={StoresStyle.locationinput}>
//           <Stack spacing={4}>
//             <InputGroup>
//               <InputLeftAddon children="Location Name" />
//               <Input
//                 type="text"
//                 placeholder="Enter location name"
//                 value={locationName}
//                 onChange={(e) => setLocationName(e.target.value)}
//               />
//             </InputGroup>

//             <InputGroup>
//               <InputLeftAddon children="Address" />
//               <Input
//                 type="text"
//                 placeholder="Enter address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </InputGroup>

//             <InputGroup>
//               <InputLeftAddon children="City" />
//               <Input
//                 type="text"
//                 placeholder="Enter city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//             </InputGroup>

//             <InputGroup>
//               <InputLeftAddon children="Zipcode" />
//               <Input
//                 type="text"
//                 placeholder="Enter zipcode"
//                 value={zipcode}
//                 onChange={(e) => setZipcode(e.target.value)}
//               />
//             </InputGroup>

//             <Button
//               colorScheme="teal"
//               onClick={addLocation}
//               isLoading={isLoading}
//               isDisabled={!locationName || !address || !city || !zipcode}
//             >
//               Add Location
//             </Button>
//           </Stack>
//         </div>
//         <div className={dashboardStyle.itemsmod}>
//         {search.map((data) => {
//           // console.log("data=", data.id);
//           // console.log("data=", data);
//           return (
//             <LocationDisplay
//               key={data.id}
//               className={dashboardStyle.item}
//               props={data}
//               name={location.state.name}
//               setload={setload}
//               load={load}
//             />
//           );
//         })}
//       </div>
//       </div>
//     </>
//   );
// }

// -----------------------
// import {
//   Button,
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   Stack,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import StoresStyle from "./Stores.module.css";
// import dashboardStyle from "./Dashboard.module.css";
// import { Navbar } from "./Navbar";
// import { useLocation, useNavigate } from "react-router-dom";
// import { LocationDisplay } from "./LocationDisplay";

// export function Stores({ setload }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [locationName, setLocationName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [zipcode, setZipcode] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [search, setSearch] = useState([]);
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("authenticated");

//     if (loggedInUser) {
//       setAuthenticated(true);
//     } else {
//       navigate("/", { replace: true });
//     }

//     // Fetch all locations
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:5000/getLocation");
//         console.log("Fetched locations:", res.data);
//         setSearch(res.data);
//       } catch (e) {
//         console.log("Error fetching locations:", e);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const addLocation = async () => {
//     const date = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

//     const locationData = {
//       locationName,
//       address,
//       city,
//       zipcode,
//       createdDate: date,
//       addedBy: "Admin",
//     };

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://127.0.0.1:5000/addLocation",
//         locationData
//       );
//       console.log("Location added:", response.data);

//       // Refresh locations after adding a new one
//       setSearch((prevLocations) => [...prevLocations, locationData]);
//       //   setload(true);

//       // Reset input fields
//       setLocationName("");
//       setAddress("");
//       setCity("");
//       setZipcode("");
//       setIsLoading(false);
//     } catch (e) {
//       console.log("New location cannot be added", e);
//       setIsLoading(false);
//       alert("Error: Location could not be added.");
//     }
//   };

//   return (
//     <>
//       <div className={StoresStyle.content}>
//         <Navbar name={location.state?.name || "Guest"} />
//         <div className={StoresStyle.locationinput}>
//           <Stack spacing={4}>
//             <InputGroup>
//               <InputLeftAddon children="Location Name" />
//               <Input
//                 type="text"
//                 placeholder="Enter location name"
//                 value={locationName}
//                 onChange={(e) => setLocationName(e.target.value)}
//               />
//             </InputGroup>

//             <InputGroup>
//               <InputLeftAddon children="Address" />
//               <Input
//                 type="text"
//                 placeholder="Enter address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </InputGroup>

//             <InputGroup>
//               <InputLeftAddon children="City" />
//               <Input
//                 type="text"
//                 placeholder="Enter city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//             </InputGroup>

//             <InputGroup>
//               <InputLeftAddon children="Zipcode" />
//               <Input
//                 type="text"
//                 placeholder="Enter zipcode"
//                 value={zipcode}
//                 onChange={(e) => setZipcode(e.target.value)}
//               />
//             </InputGroup>

//             <Button
//               colorScheme="teal"
//               onClick={addLocation}
//               isLoading={isLoading}
//               isDisabled={!locationName || !address || !city || !zipcode}
//             >
//               Add Location
//             </Button>
//           </Stack>
//         </div>

//         {/* Display list of locations */}
//         <div className={dashboardStyle.itemsmod}>
//           {search.map((data, index) => (
//             <LocationDisplay
//               key={index}
//               className={dashboardStyle.item}
//               props={data}
//               name={location.state?.name}
//               //   setload={setload}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
//-----------------
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import StoresStyle from "./Stores.module.css";
import dashboardStyle from "./Dashboard.module.css";
import { Navbar } from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationDisplay } from "./LocationDisplay";

const MAX_LENGTHS = {
  locationName: 50, // Adjust max length as needed
  address: 200, // Adjust max length as needed
  city: 50, // Adjust max length as needed
  zipcode: 10, // Adjust max length as needed
};

export function Stores({}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");

    if (loggedInUser) {
      setAuthenticated(true);
    } else {
      navigate("/", { replace: true });
    }

    // Fetch all locations
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/getLocation");
        console.log("Fetched locations:", res.data);
        setSearch(res.data);
      } catch (e) {
        console.log("Error fetching locations:", e);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/getLocation");
      console.log("Fetched locations after delete:", res.data);
      setSearch(res.data);
    } catch (e) {
      console.log("Error fetching locations:", e);
    }
  };

  const addLocation = async () => {
    const date = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

    const locationData = {
      locationName,
      address,
      city,
      zipcode,
      createdDate: date,
      addedBy: "Admin",
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/addLocation",
        locationData
      );
      console.log("Location added:", response.data);
      fetchLocations(); // Refresh locations after adding a new one

      // Reset input fields
      setLocationName("");
      setAddress("");
      setCity("");
      setZipcode("");
      setIsLoading(false);
    } catch (e) {
      console.log("New location cannot be added", e);
      setIsLoading(false);
      alert("Error: Location could not be added.");
    }
  };

  return (
    <>
      <div className={StoresStyle.content}>
        <Navbar name={location.state?.name || "Guest"} />
        <div className={StoresStyle.locationinput}>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="Location Name" />
              <Input
                type="text"
                placeholder="Enter location name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                maxLength={MAX_LENGTHS.locationName} // Limit max length
              />
              {locationName.length >= MAX_LENGTHS.locationName && (
                <Text color="red.500" fontSize="sm">
                  Maximum length is {MAX_LENGTHS.locationName} characters.
                </Text>
              )}
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Address" />
              <Input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={MAX_LENGTHS.address} // Limit max length
              />
              {address.length >= MAX_LENGTHS.address && (
                <Text color="red.500" fontSize="sm">
                  Maximum length is {MAX_LENGTHS.address} characters.
                </Text>
              )}
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="City" />
              <Input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={MAX_LENGTHS.city} // Limit max length
              />
              {city.length >= MAX_LENGTHS.city && (
                <Text color="red.500" fontSize="sm">
                  Maximum length is {MAX_LENGTHS.city} characters.
                </Text>
              )}
              {console.log(
                "city.length : " +
                  city.length +
                  " MAX_LENGTHS.city :" +
                  MAX_LENGTHS.city
              )}
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Zipcode" />
              <Input
                type="text"
                placeholder="Enter zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                maxLength={MAX_LENGTHS.zipcode} // Limit max length
              />
              {zipcode.length >= MAX_LENGTHS.zipcode && (
                <Text color="red.500" fontSize="sm">
                  Maximum length is {MAX_LENGTHS.zipcode} characters.
                </Text>
              )}
            </InputGroup>

            <Button
              colorScheme="teal"
              onClick={addLocation}
              isLoading={isLoading}
              isDisabled={!locationName || !address || !city || !zipcode}
            >
              Add Location
            </Button>
          </Stack>
        </div>

        {/* Display list of locations */}
        <div className={dashboardStyle.itemsmod}>
          {search.map((data, index) => (
            <LocationDisplay
              key={index}
              className={dashboardStyle.item}
              props={data}
              name={location.state?.name}
              fetchLocations={fetchLocations} // Pass the fetch function
            />
          ))}
        </div>
      </div>
    </>
  );
}
