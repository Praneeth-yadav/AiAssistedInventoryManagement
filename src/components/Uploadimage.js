import { Button, Input, InputGroup } from "@chakra-ui/react";
import { storage } from "./Firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useRef, useState } from "react";
import { color } from "framer-motion";

export const Uploadimage = ({ name, imgurl }) => {
  const [image, setimage] = useState(null);

  console.log("name in image", name);

  // Create a storage reference from our storage service
  // const storageRef = ref(storage, `images/${name}`);
  const storageRef = ref(storage, `${name}`);

  function upload() {
    console.log("Upload image started!");
    if (image == null) {
      return;
    }
    uploadBytes(storageRef, image).then(
      (snapshot) => {
        console.log("Uploaded image!");
        console.log("snapshot", snapshot);
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          imgurl(downloadURL);
        });
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("error", error);
      }
    );
  }

  return (
    <InputGroup>
      <Input
        type="file"
        onChange={(e) => {
          setimage(e.target.files[0]);
          //uploadImage();
        }}
      />
      <Button colorScheme="teal" onClick={upload}>
        upload
      </Button>
    </InputGroup>
  );
};
