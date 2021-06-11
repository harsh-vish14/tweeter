import { BsCardImage } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "./input.module.scss";
import { v4 as uuidv4 } from "uuid";
import ImageLabel from "../../ImageLable";
import { useRef, useState } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { storage } from "../../../lib/dbConnect";
const InputBox = ({ submitTweetHandler }) => {
  // const [show, setShow] = useState(false);
  const [session, loading] = useSession();
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [inputImage, setInputImage] = useState(null);
  const [imageurl, setImageUrl] = useState("");
  const tweetMessage = useRef();
  const tweetHandler = async () => {
    const currentTweetMessage = tweetMessage.current.value;
    // const currentTweetImage = imageurl;
    // if (!currentTweetMessage) {
    //   if (!currentTweetImage.includes("https://images.unsplash.com")) {
    //     if (
    //       !currentTweetImage.includes("https://firebasestorage.googleapis.com")
    //     ) {
    //       // handleShow();
    //       return;
    //     }
    //     return;
    //   }
    // }
    if (inputImage) {
      const imageName = uuidv4();
      var metadata = {
        contentType: "image/jpeg",
      };
      setUploadProgress(1);
      await storage
        .ref(`tweetImage/${imageName}${inputImage.name}`)
        .put(inputImage, metadata)
        .on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress);
            if (progress > 0) {
              //  / setUserHeaderLoading(progress);
              setUploadProgress(progress);
            }
          },
          (err) => {},
          () => {
            storage
              .ref("tweetImage")
              .child(`${imageName}${inputImage.name}`)
              .getDownloadURL()
              .then(async (fireBaseUrl) => {
                // const image = fireBaseUrl;
                // setUpdatedHandlerImage(image);
                // setUserHeaderLoading(100);
                // const result = await updateImage({
                //   imageLink: fireBaseUrl,
                //   operation: "Header",
                //   userId: userId,
                // });
                setInputImage(null);
                const result = await submitTweetHandler({
                  Message: currentTweetMessage,
                  Image: fireBaseUrl,
                });
              });
            setUploadProgress(0);
          }
        );
    } else {
      const result = await submitTweetHandler({
        Message: currentTweetMessage,
        Image: "",
      });
    }

    // setImageUrl("");
    tweetMessage.current.value = "";
  };
  const changeImageHandler = (e) => {
    setInputImage(e.target.files[0]);
  };
  return (
    !loading && (
      <div className={classes.inputBox}>
        <div className={classes.title}>Tweet Something</div>
        <div className={classes.input}>
          <Link href={`/profile/${session.user.name}`}>
            <a>
              <ImageLabel
                url={
                  session
                    ? session.user.image.userImage
                    : "/logos/tweeter-small.svg"
                }
              />
            </a>
          </Link>
          <div style={{ width: "90%" }}>
            <textarea
              rows="3"
              maxLength="277"
              placeholder="What’s happening?"
              ref={tweetMessage}
            />
            {inputImage && (
              <>
                <img
                  src={URL.createObjectURL(inputImage)}
                  height="100px"
                  width="100px"
                  style={{ borderRadius: "10px", cursor: "pointer" }}
                  onClick={() => {
                    setInputImage(null);
                  }}
                />
                {uploadProgress != 0 && (
                  <span>{` Uploaded ${uploadProgress} %`}</span>
                )}
              </>
            )}
            <div className={classes.inputFooter}>
              <label className={classes.footericon} htmlFor="inputImage">
                <BsCardImage />
              </label>
              <input
                id="inputImage"
                type="file"
                accept="images/*"
                style={{ display: "none" }}
                onChange={changeImageHandler}
              />

              <div className={classes.tweetsBtn} onClick={tweetHandler}>
                Tweet
              </div>
            </div>
          </div>
        </div>
        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Image</Modal.Title>
          </Modal.Header>
          <input
            type="text"
            placeholder="Image url"
            className={classes.modelInput}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            value={imageurl}
          />
          <div className={classes.helper}>
            Not have url use this 👉🏻
            <a href="https://drop-images-to-link.netlify.app/" target="_blank">
              [image to url converter]
            </a>{" "}
            or unsplash Images are only allowed
          </div>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Add image
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    )
  );
};

export default InputBox;
