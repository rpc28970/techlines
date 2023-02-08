import React from "react";
import {
  Tr,
  Td,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../redux/actions/adminActions";

const AddNewProduct = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const createNewProduct = () => {
    dispatch(
      uploadProduct({
        brand,
        name,
        category,
        stock,
        price,
        productIsNew,
        description,
        image,
      })
    );
  };

  return (
    <Tr>
      <Td>
        <Text fontSize="sm">Image File Name</Text>
        <Tooltip
          label={"Set the name of your Image e.g., Iphone.jpg"}
          fontSize="sm"
        >
          <Input
            size="sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="e.g., Iphone.jpg"
          />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize="sm">Description</Text>
        <Textarea
          value={description}
          w="270px"
          h="120px"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          size="sm"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Brand</Text>
        <Input
          size="sm"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Apple or Samsung etc..."
        />
        <Text fontSize="sm">Name</Text>
        <Input
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Category</Text>
        <Input
          size="sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Electronics"
        />
        <Text fontSize="sm">Price</Text>
        <Input
          size="sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="$299.99"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Stock</Text>
        <Input
          size="sm"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="0"
        />
        <FormControl mt="2" display="flex" alignItems="center">
          <FormLabel htmlFor="productIsNewFlag" mb="0" fontSize="sm">
            <Badge
              rounded="full"
              px="1"
              mx="1"
              fontSize="0.8em"
              colorScheme="green"
            >
              New
            </Badge>
          </FormLabel>
          <Switch
            id="productIsNewFlag"
            onChange={() => setProductIsNew(!productIsNew)}
            isChecked={productIsNew}
          />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button
            variant="outline"
            w="160px"
            colorScheme="orange"
            onClick={() => createNewProduct()}
          >
            <MdDriveFolderUpload />
            <Text ml="2">Save Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
