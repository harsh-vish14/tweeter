import { BsCardImage } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "./input.module.scss";
import ImageLabel from "../../ImageLable";
import { useState } from "react";
const InputBox = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={classes.inputBox}>
      <div className={classes.title}>Tweet Something</div>
      <div className={classes.input}>
        <ImageLabel url="/logos/tweeter-small.svg" />
        <div style={{ width: "90%" }}>
          <textarea rows="3" maxLength="100" placeholder="What’s happening?" />
          <div className={classes.inputFooter}>
            <div className={classes.footericon} onClick={handleShow}>
              <BsCardImage />
            </div>
            <div className={classes.tweetsBtn}>Tweet</div>
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
        />
        <div>
          Not have url use this 👉🏻
          <a href="https://drop-images-to-link.netlify.app/" target="_blank">
            image to url converter
          </a>
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
