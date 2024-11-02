import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { Inc_dec } from "./Inc_dec";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import itemstyle from "./Items.module.css";

export const Items = ({ props, name, setload, load }) => {
  //console.log("Card props", props);
  // console.log("Card props item", props.item);
  // console.log("user logged", name);
  const navigate = useNavigate();
  const order = useRef(0);
  const desc = useRef(props.description);
  const price = useRef(props.price);
  const qty = useRef(props.quantity);
  const order_qty = useCallback(
    (oqty) => {
      console.log("order quantity", oqty);
      order.current = oqty;
    },
    [order]
  );
  function handledesc(e) {
    console.log("set desc ", e.target.value);
    desc.current = e.target.value;
  }
  function handleprice(e) {
    console.log("set price ", e.target.value);
    price.current = e.target.value;
  }
  function handleqty(e) {
    console.log("set qty ", e.target.value);
    qty.current = e.target.value;
  }

  function deleteItem() {
    console.log("Delete item   =   ", props);
    console.log("item=", props.item);
    const data = {
      item: props.item,
    };
    console.log("delete item    =   ", data);
    try {
      axios
        .delete("http://127.0.0.1:5000/items", {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          data,
        })
        .then((response) => {
          console.log(response.data);
          setload(!load);
        });
    } catch (e) {
      console.log("Item cannot be deleted from cart", e);
    }
  }
  function updateItem() {
    console.log("Update item  previous  =   ", props);
    console.log("item=", props.item);
    console.log("price", price.current, "props price", props.quantity);
    const data = {
      item: props.item,
      description: desc.current === "" ? props.description : desc.current,
      quantity: qty.current === null ? props.quantity : qty.current, // Set the quantity to a valid value (you can change this as needed)
      price: price.current === null ? props.price : price.current,
    };
    console.log("update item    =   ", data);
    try {
      axios.put("http://127.0.0.1:5000/items", data).then((response) => {
        console.log(response.data);
        setload(!load);
      });
    } catch (e) {
      console.log("Item cannot be Updated ", e);
    }
  }
  function buyItem() {
    const data = {
      item: props.item, // Make sure 'props.item' contains the correct item name
      quantity: order.current > 0 ? order.current : 1, // Set the quantity to a valid value (you can change this as needed)
      price: props.price,
      username: name, // Make sure 'props.price' contains the correct price
    };
    console.log("buy item    =   ", data);
    try {
      axios.post("http://127.0.0.1:5000/cart", data).then((response) => {
        console.log(response.data);
      });
    } catch (e) {
      console.log("Item cannot be added to cart", e);
    }
    navigate("/cartpage", { state: { id: 1, name: name } }, { replace: true });
  }
  function addItem() {
    console.log("add item    =   ", props);
    const data = {
      item: props.item, // Make sure 'props.item' contains the correct item name
      quantity: order.current > 0 ? order.current : 1, // Set the quantity to a valid value (you can change this as needed)
      price: props.price,
      username: name, // Make sure 'props.price' contains the correct price
    };
    console.log("add item    =   ", data);
    try {
      axios.post("http://127.0.0.1:5000/cart", data).then((response) => {
        console.log(response.data);
      });
    } catch (e) {
      console.log("Item cannot be added to cart", e);
    }
  }
  function Bodytype({ user }) {
    if (user) {
      return (
        <>
          <Text>{props.description}</Text>
          <Text color="green.500" fontSize="l">
            Available quanity {props.quantity}
          </Text>
          <Text color="blue.600" fontSize="2xl">
            ${props.price}
          </Text>
          <Inc_dec
            maxqty={props.quantity}
            order_qty={order_qty}
            qty_value={order.current}
            value={qty.current}
          />
        </>
      );
    } else {
      return (
        <>
          <Input
            focusBorderColor="lime"
            variant="outline"
            name="description"
            defaultValue={props.description}
            onChange={handledesc}
          />

          <InputGroup>
            <InputLeftAddon children="Available Quantity" />
            <Input
              focusBorderColor="lime"
              type="tel"
              name="quantity"
              defaultValue={props.quantity}
              onChange={handleqty}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="$" />
            <Input
              focusBorderColor="lime"
              name="price"
              type="tel"
              defaultValue={props.price}
              onChange={handleprice}
            />
          </InputGroup>
        </>
      );
    }
  }
  function Buttontype({ user }) {
    //console.log("inside user function", user);
    if (user) {
      return (
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" onClick={() => buyItem()}>
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={() => addItem()}>
            Add to cart
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => updateItem()}
          >
            Update
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => deleteItem()}
          >
            Delete Item
          </Button>
        </ButtonGroup>
      );
    }
  }

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          //src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          // src=" https://firebasestorage.googleapis.com/v0/b/coffeeshop-imagestore.appspot.com/o/images%2Faddcoffee?alt=media&token=889e03bb-2048-46a5-83e0-ca03963a27a2"
          src={props.imglocation}
          alt="Loading..."
          borderRadius="lg"
          className={itemstyle.image}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.item}</Heading>
          <Bodytype user={name != "Admin"} />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Buttontype user={name != "Admin"} />
      </CardFooter>
    </Card>
  );
};
