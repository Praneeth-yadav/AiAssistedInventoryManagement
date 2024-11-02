import { Navbar } from "./Navbar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
} from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

const Cartpage = () => {
  const total = useRef(0);
  total.current = 0;
  let response = {
    data: [
      {
        id: "1",
        item: "expresso1",
        quantity: "2",
        price: "230",
      },
      {
        id: "2",
        item: "expresso2",
        quantity: "2",
        price: "230",
      },
      {
        id: "3",
        item: "expresso3",
        quantity: "2",
        price: "230",
      },
      {
        id: "4",
        item: "pastry4",
        quantity: "5",
        price: "230",
      },
      {
        id: "5",
        item: "pastry5",
        quantity: "6",
        price: "230",
      },
      {
        id: "6",
        item: "savoury2",
        quantity: "2",
        price: "230",
      },
    ],
  };
  // const [responsefull, setresponsefull] = useState([
  //   {
  //     data: [
  //       {
  //         id: 8,
  //         item: "expresso1",
  //         price: 200,
  //         quantity: 1,
  //       },
  //       {
  //         id: 9,
  //         item: "pastry4",
  //         price: 200,
  //         quantity: 1,
  //       },
  //       {
  //         id: 10,
  //         item: "expresso1",
  //         price: 200,
  //         quantity: 1,
  //       },
  //     ],
  //     username: "user",
  //   },
  //   {
  //     data: [
  //       {
  //         id: 11,
  //         item: "pastry4",
  //         price: 200,
  //         quantity: 1,
  //       },
  //       {
  //         id: 12,
  //         item: "expresso1",
  //         price: 200,
  //         quantity: 1,
  //       },
  //     ],
  //     username: "user1",
  //   },
  // ]);
  const [responsefull, setresponsefull] = useState([]);
  const [load, setload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`http://127.0.0.1:5000/cart`).then((res) => {
          console.log("result=", res.data);
          setresponsefull(res.data);
          console.log("response=", res.data);
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [load]);

  const deleteitem = (item) => {
    console.log("item=", item);
    const data = {
      item: item,
      username: location.state.name,
    };
    console.log("delete item    =   ", data);
    try {
      axios
        .delete("http://127.0.0.1:5000/cart", {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          data,
        })
        .then((response) => {
          console.log(response.data);
          setload(!load);
          console.log("before", load);
          // setresponsefull((responsefull) => {
          //   return responsefull.filter((cartItem) => cartItem.item !== item);
          // });
        });
    } catch (e) {
      console.log("Item cannot be deleted from cart", e);
    }
  };
  const location = useLocation();
  console.log("state in cart", location);

  // const [showtotal, setshowtotal] = useState(false);
  // const goToCheckoutPage =(responsefull)=>{

  // }

  const Cart = () => {
    const navigate = useNavigate();
    if (location.state.name !== "Admin") {
      console.log("respomefull cart", responsefull);
      response = responsefull.filter((data) => {
        return data.username === location.state.name;
      });
      console.log("response cart", response);
      return (
        <>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>
                <Button
                  colorScheme="blue"
                  // onClick={() => {
                  //   // setshowtotal(true);
                  //   goToCheckoutPage(responsefull);
                  // }}
                  onClick={() => {
                    navigate(
                      "/checkout",
                      {
                        state: {
                          cartItems: responsefull,
                          name: location.state.name,
                        },
                      },
                      { replace: true }
                    );
                  }}
                >
                  Proceed To Checkout
                </Button>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Quantity</Th>
                  <Th>Price/Unit</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {response?.map((item) => {
                  const { data } = item;
                  console.log("data", data);
                  total.current = 0;
                  data.map((data) => {
                    total.current += data.price * data.quantity;
                  });

                  return (
                    <>
                      {data.map((data) => (
                        <Tr>
                          <Td>{data.item}</Td>
                          <Td>{data.quantity}</Td>
                          <Td>${data.price}</Td>
                          <Td>${data.price * data.quantity}</Td>
                          <Td>
                            <Tooltip label="Delete Item">
                              <IconButton
                                onClick={() => deleteitem(data.item)}
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
                      ))}
                    </>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  {/* {showtotal && (
                    <h1>
                      <b>Total : {total.current}</b>
                    </h1>
                  )} */}
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </>
      );
    } else {
      return (
        <>
          {responsefull.map((resp) => {
            console.log("resp", resp);
            total.current = 0;
            return (
              <Card key={resp.username}>
                <CardHeader>
                  <Heading size="md">{resp.username} Order</Heading>
                </CardHeader>
                <CardBody>
                  <TableContainer>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Item</Th>
                          <Th>Quantity</Th>
                          <Th>Price/Unit</Th>
                          <Th>Total</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {resp.data.map((data) => {
                          total.current =
                            total.current + data.price * data.quantity;
                          return (
                            <>
                              <Tr>
                                <Td>{data.item}</Td>
                                <Td>{data.quantity}</Td>
                                <Td>${data.price}</Td>
                                <Td>${data.price * data.quantity}</Td>
                              </Tr>
                            </>
                          );
                        })}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th>
                            <h1>{/* <b>Total : {total.current}</b> */}</h1>
                          </Th>
                          <Th></Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </CardBody>
              </Card>
            );
          })}
        </>
      );
    }
  };
  return (
    <>
      <Navbar name={location.state.name} />
      <div>
        <Cart />
      </div>
    </>
  );
};
export default Cartpage;
