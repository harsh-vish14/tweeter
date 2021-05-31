import { BsCardImage } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "./input.module.scss";
import ImageLabel from "../../ImageLable";
import { useRef, useState } from "react";
import { useSession } from "next-auth/client";
const InputBox = ({ submitTweetHandler }) => {
  const [show, setShow] = useState(false);
  const [session, loading] = useSession();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imageurl, setImageUrl] = useState("");
  const tweetMessage = useRef();
  const tweetHandler = async () => {
    const currentTweetMessage = tweetMessage.current.value;
    const currentTweetImage = imageurl;
    if (!currentTweetMessage) {
      if (!currentTweetImage.includes("https://images.unsplash.com")) {
        if (
          !currentTweetImage.includes("https://firebasestorage.googleapis.com")
        ) {
          handleShow();
          return;
        }
      }
    }
    const result = await submitTweetHandler({
      Message: currentTweetMessage,
      Image: currentTweetImage,
    });
    if (result === "ok") {
      setImageUrl("");
      tweetMessage.current.value = "";
    }
  };
  return (
    <div className={classes.inputBox}>
      <div className={classes.title}>Tweet Something</div>
      <div className={classes.input}>
        <ImageLabel
          url={session ? session.user.image : "/logos/tweeter-small.svg"}
        />
        <div style={{ width: "90%" }}>
          <textarea
            rows="3"
            maxLength="100"
            placeholder="What’s happening?"
            ref={tweetMessage}
          />
          <div className={classes.inputFooter}>
            <div className={classes.footericon} onClick={handleShow}>
              <BsCardImage />
            </div>
            <div className={classes.tweetsBtn} onClick={tweetHandler}>
              Tweet
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
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
        <div>
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
      </Modal>
    </div>
  );
};

export default InputBox;
