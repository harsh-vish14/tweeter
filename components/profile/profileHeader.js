import Image from "next/image";
import classes from "./profileHeader.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FiUserPlus, FiEdit } from "react-icons/fi";
import { useRef, useState } from "react";
const ProfileHeader = ({ user, session }) => {
  const header = useRef(user.authorHeader);
  const image = useRef(user.authorImage);
  const name = useRef(user.authorName);
  const bio = useRef(user.authorBio);
  // const [changedData, setChangedData] = useState({
  //   Header: "",
  //   Image: "",
  //   Name: "",
  //   Bio: "",
  // });
  const [userDetails, setUserDetails] = useState({
    Header: user.authorHeader,
    Image: user.authorImage,
    Name: user.authorName,
    Bio: user.authorBio,
  });
  console.log(header);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const SaveData = () => {
    setShow(false);
  };

  return (
    <div className={classes.header}>
      <div className={classes.headerImage}>
        <Image
          src={userDetails.Header || "/gradients.png"}
          height={300}
          width={900}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className={classes.userDetails}>
        <div className={classes.userImage}>
          <Image
            src={userDetails.Image || "/default.png"}
            height={300}
            width={300}
            objectFit="fill"
          />
        </div>
        <div className={classes.detail}>
          <div className={classes.name}>
            {userDetails.Name}
            <div className={classes.followers}>
              {`Followers: ${user.followers || 0} Following: ${
                user.following || 0
              }`}
            </div>
          </div>

          <div className={classes.bio}>
            {userDetails.Bio || "This is sample bio"}
          </div>
        </div>
        <div className={classes.btns}>
          {session.user.name == user._id ? (
            <div onClick={handleShow}>
              <span style={{ marginRight: "10px" }}>
                <FiEdit />
              </span>{" "}
              EDIT
            </div>
          ) : (
            <div>
              <span style={{ marginRight: "10px" }}>
                <FiUserPlus />
              </span>
              FOLLOW
            </div>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modelBody}>
          <label htmlFor="header">Your Header Image URL</label>
          <input
            id="header"
            type="text"
            placeholder="Header Image URL"
            value={userDetails.Header}
          />
          <label htmlFor="image">Your Profile Image URL</label>
          <input
            id="image"
            type="text"
            placeholder="Your Image URL"
            value={userDetails.Image}
          />
          <div className={classes.helper}>
            Not have url use this 👉🏻
            <a href="https://drop-images-to-link.netlify.app/" target="_blank">
              [image to url converter]
            </a>{" "}
            or unsplash Images are only allowed
          </div>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={userDetails.Name}
          />
          <label htmlFor="bio">Your Bio</label>
          <textarea
            id="bio"
            rows="3"
            maxLength="50"
            placeholder="Your Bio"
            value={userDetails.Bio}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={SaveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileHeader;
