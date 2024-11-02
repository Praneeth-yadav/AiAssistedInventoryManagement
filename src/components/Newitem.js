import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { getStorage } from "firebase/storage";
import { useCallback, useRef, useState, useEffect } from "react";
import Newitemstyle from "./Newitem.module.css";
import { Uploadimage } from "./Uploadimage";

export const Newitem = ({ setload }) => {
  const [itemname, setitemname] = useState(null);
  const desc = useRef(null);
  const price = useRef(null);
  const qty = useRef(null);
  const category = useRef(null);
  const imageurl = useRef(null);
  const storage = getStorage();
  const imgurl = useCallback(
    (murl) => {
      console.log("url is - ", murl);
      imageurl.current = murl;
    },
    [imageurl]
  );

  const additem = async () => {
    const data = { desc, price, qty, category, imageurl, storage };
    console.log("item to be added -  ", data);
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);
    const itemstoadd = {
      item: itemname,
      description: desc.current,
      price: price.current,
      quantity: qty.current,
      category: category.current.value,
      imagelocation: imageurl.current,
      createdDate: currentDate,
      updatedDate: currentDate,
      addedBy: "Admin",
    };

    try {
      axios
        .post("http://127.0.0.1:5000/additems", itemstoadd)
        .then((response) => {
          console.log(response.data);
          setload(true);
        });
    } catch (e) {
      console.log("New Item cannot be added ", e);
    }
  };

  return (
    <>
      <div className={Newitemstyle.iteminput}>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftAddon children="Item Name" />
            <Input
              type="text"
              placeholder="Add Name"
              onChange={(e) => {
                setitemname(e.target.value);
              }}
            />
          </InputGroup>
          <Select
            placeholder="Select Category"
            onChange={(e) => {
              console.log("category", e.target.value);
              category.current = e.target.value;
            }}
          >
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
            <option value="Vehicles">Vehicles</option>
            <option value="MedicalDevices">Medical Devices</option>
            <option value="FoodAndDrinks">Food & Drinks</option>
          </Select>
          <InputGroup>
            <InputLeftAddon children="Description" />
            <Input
              type="text"
              placeholder="Add description"
              onChange={(e) => {
                desc.current = e.target.value;
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Available Quantity" />
            <Input
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                qty.current = e.target.value;
              }}
            />
          </InputGroup>
          {itemname !== null && itemname !== "" ? (
            <Uploadimage name={itemname} imgurl={imgurl} />
          ) : (
            <></>
          )}
          <InputGroup size="sm">
            <InputLeftAddon children="$" />
            <Input
              type="number"
              placeholder="Price"
              onChange={(e) => {
                price.current = e.target.value;
              }}
            />
          </InputGroup>
          <Button disabled={true} colorScheme="teal" onClick={additem}>
            Add Item
          </Button>
        </Stack>
      </div>
    </>
  );
};
