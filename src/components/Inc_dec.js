import { Button, Input, useNumberInput, HStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
export function Inc_dec({ maxqty, order_qty,qty_value }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: qty_value,
      min: 0,
      max: maxqty,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  function handlechange(e) {
    console.log("order ", e.target.value);
    console.log(input.value);
    order_qty(e.target.value);
  }
  function handleclick() {
    order_qty(input.value);
  }

  return (
    <HStack maxW="320px">
      <Button {...dec} onClick={handleclick}>
        -
      </Button>
      <Input {...input} readOnly />
      <Button {...inc} onClick={handleclick}>
        +
      </Button>
    </HStack>
  );
}
