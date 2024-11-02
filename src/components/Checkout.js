import { Navbar } from "./Navbar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  IconButton,
  Tooltip,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRef, useState, memo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const total = useRef(0);
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [load, setLoad] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const toast = useToast();

  const deleteItem = async (item) => {
    const data = {
      item: item,
      username: location.state.name,
    };
    try {
      await axios.delete("http://127.0.0.1:5000/cart", {
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
      setLoad((prevLoad) => !prevLoad); // Trigger re-render
      toast({
        title: "Item Deleted",
        description: "The item has been successfully removed from your cart.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Item cannot be deleted from cart", error);
      toast({
        title: "Error",
        description: "Failed to delete item from cart.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const calculateTotalAmount = (items) => {
    return items.reduce((acc, item) => {
      return (
        acc +
        item.data.reduce((itemAcc, product) => {
          return itemAcc + product.price * product.quantity;
        }, 0)
      );
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderDetails = {
        items: cartItems,
        billing: billingDetails,
        username: location.state.name,
        total_amount: calculateTotalAmount(cartItems), // Calculate total amount
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/orders",
        orderDetails
      );
      const orderId = response.data.order_id;
      toast({
        title: "Order Placed",
        description: `Your order has been successfully placed! Order ID: ${orderId}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "There was an issue placing your order.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const Billing = memo(
    ({
      cartItems,
      billingDetails,
      handleBillingChange,
      handleSubmit,
      deleteItem,
    }) => {
      const username = location.state.name;
      const userCartItems = cartItems.filter(
        (item) => item.username === username
      );

      // Calculate total
      total.current = calculateTotalAmount(userCartItems);

      return (
        <Box p={5} borderWidth={1} borderRadius="lg" boxShadow="md">
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Quantity</Th>
                  <Th>Price/Unit</Th>
                  <Th>Total</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userCartItems.map((item) =>
                  item.data.map((product) => (
                    <Tr key={product.id}>
                      <Td>{product.item}</Td>
                      <Td>{product.quantity}</Td>
                      <Td>${product.price.toFixed(2)}</Td>
                      <Td>${(product.price * product.quantity).toFixed(2)}</Td>
                      <Td>
                        <Tooltip label="Delete Item">
                          <IconButton
                            onClick={() => deleteItem(product.item)}
                            isRound={true}
                            variant="outline"
                            colorScheme="red"
                            aria-label="Delete"
                            fontSize="20px"
                            icon={<DeleteIcon />}
                          />
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan={3}></Th>
                  <Th>
                    <b>Total: ${total.current.toFixed(2)}</b>
                  </Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>

          {/* Billing Details Form */}
          <VStack as="form" spacing={4} onSubmit={handleSubmit} mt={4}>
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Address", name: "address", type: "textarea" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "ZIP Code", name: "zip", type: "text" },
              { label: "Country", name: "country", type: "text" },
              { label: "Card Number", name: "cardNumber", type: "text" },
              {
                label: "Expiration Date (MM/YY)",
                name: "expirationDate",
                type: "text",
              },
              { label: "CVV", name: "cvv", type: "text" },
            ].map(({ label, name, type }) => (
              <FormControl key={name} isRequired>
                <FormLabel>{label}</FormLabel>
                {type === "textarea" ? (
                  <Textarea
                    name={name}
                    value={billingDetails[name]}
                    onChange={handleBillingChange}
                    borderWidth={1}
                  />
                ) : (
                  <Input
                    type={type}
                    name={name}
                    value={billingDetails[name]}
                    onChange={handleBillingChange}
                    borderWidth={1}
                    onFocus={(e) => e.target.select()} // Optional: selects the text on focus
                  />
                )}
              </FormControl>
            ))}
            <Button type="submit" colorScheme="blue">
              Place Order
            </Button>
          </VStack>
        </Box>
      );
    }
  );

  return (
    <>
      <Navbar name={location.state.name} />
      <div>
        <Billing
          cartItems={cartItems}
          billingDetails={billingDetails}
          handleBillingChange={handleBillingChange}
          handleSubmit={handleSubmit}
          deleteItem={deleteItem}
        />
      </div>
    </>
  );
};

export default Checkout;
