import Image from "next/image";
import classes from "./profileHeader.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../lib/dbConnect";
import { FiUserPlus, FiEdit, FiCamera } from "react-icons/fi";
import { useRef, useState } from "react";
import { updateImage, updateProfile } from "../../lib/gettingandsetting";

const ProfileHeader = ({ user, session }) => {
  const name = useRef(user.authorName);
  const bio = useRef(user.authorBio);
  const [userDetails, setUserDetails] = useState({
    Header: user.authorHeader,
    Image: user.authorImage,
    Name: user.authorName,
    Bio: user.authorBio,
  });
  const [UserImageLoading, setUSerImageLoading] = useState(0);
  const [userHeaderLoading, setUserHeaderLoading] = useState(0);
  const [show, setShow] = useState(false);
  const [headerImage, setHeaderImage] = useState(
    user.authorHeader || "/gradients.png"
  );
  const [userImage, setUserImage] = useState(
    user.authorImage || "/default.png"
  );
  const [userImageData, setUserImageData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [updatedUserImage, setUpdatedUserImage] = useState(
    user.authorImage || "/default.png"
  );
  const [updatedHandlerImage, setUpdatedHandlerImage] = useState(
    user.authorHeader || "/gradients.png"
  );
  const handleClose = () => {
    setUserImageData(null);
    setHeaderData(null);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const SaveData = async () => {
    setShow(false);
    console.log(session.user.name);
    const userId = session.user.name;
    var metadata = {
      contentType: "image/jpeg",
    };
    if (userImageData != null) {
      if (user.authorImage != "/default.png") {
        const userImage = await storage.refFromURL(user.authorImage);
        const userImagPath = userImage._delegate._location.path_;
        await storage.ref(userImagPath).delete();
      }
      const imageName = uuidv4();
      setUSerImageLoading(1);
      await storage
        .ref(`profileImage/${imageName}${userImageData.name}`)
        .put(userImageData, metadata)
        .on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              ) - 1;
            if (progress > 0) {
              setUSerImageLoading(progress);
            }
          },
          (err) => {},
          () => {
            storage
              .ref("profileImage")
              .child(`${imageName}${userImageData.name}`)
              .getDownloadURL()
              .then(async (fireBaseUrl) => {
                const image = fireBaseUrl;
                setUpdatedUserImage(image);
                setUSerImageLoading(100);
                await updateImage({
                  imageLink: fireBaseUrl,
                  operation: "Profile",
                  userId: userId,
                });
              });
          }
        );
    }
    if (headerData != null) {
      if (user.authorHeader != "/gradients.png" && user.authorHeader) {
        const userImage = await storage.refFromURL(user.authorHeader);
        const userImagPath = userImage._delegate._location.path_;
        await storage.ref(userImagPath).delete();
      }
      setUserHeaderLoading(1);
      const imageName = uuidv4();
      await storage
        .ref(`profileImage/${imageName}${headerData.name}`)
        .put(headerData, metadata)
        .on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              ) - 1;
            if (progress > 0) {
              setUserHeaderLoading(progress);
            }
          },
          (err) => {},
          () => {
            storage
              .ref("profileImage")
              .child(`${imageName}${headerData.name}`)
              .getDownloadURL()
              .then(async (fireBaseUrl) => {
                const image = fireBaseUrl;
                setUpdatedHandlerImage(image);
                setUserHeaderLoading(100);
                const result = await updateImage({
                  imageLink: fireBaseUrl,
                  operation: "Header",
                  userId: userId,
                });
              });
          }
        );
    }
    if (
      name.current.value != user.authorName ||
      bio.current.value != user.authorBio
    ) {
      const result = await updateProfile({
        Name: name.current.value,
        Bio: bio.current.value,
        userId: session.user.name,
      });
      console.log(result);
    }
  };
  const headerHandler = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setHeaderImage(imageURL);
    setHeaderData(e.target.files[0]);
  };
  const userImageHandler = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setUserImageData(e.target.files[0]);
    setUserImage(imageURL);
  };
  return (
    <div className={classes.header}>
      <div className={classes.headerImage}>
        <Image
          src={updatedHandlerImage}
          height={300}
          width={900}
          // layout="responsive"
          objectFit="cover"
        />
        {userHeaderLoading != 0 && userHeaderLoading != 100 && (
          <div
            className={classes.loadingUploadedData}
          >{` ${userHeaderLoading} % `}</div>
        )}
      </div>
      <div className={classes.userDetails}>
        <div className={classes.userImage}>
          <Image
            src={updatedUserImage}
            height={300}
            width={300}
            // layout="responsive"
            objectFit="cover"
          />
          {UserImageLoading != 0 && UserImageLoading != 100 && (
            <div
              className={classes.loadingUploadedData}
            >{` ${UserImageLoading} % `}</div>
          )}
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

          <div className={classes.bio}>{userDetails.Bio || ""}</div>
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
          <Modal.Title>
            Edit your Profile
            <div className={classes.helper}>
              I will take some time to update your profile
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modelBody}>
          <label className={classes.headerImage} htmlFor="headerImage">
            <img src={headerImage} height={200} width="100%" />
            <div className={classes.camera}>
              <FiCamera />
            </div>
          </label>

          <input
            id="headerImage"
            type="file"
            accept="images/*"
            style={{ display: "none" }}
            onChange={headerHandler}
          />
          <label className={classes.userImage} htmlFor="userImage">
            <img src={userImage} alt="userImage" height={150} width={150} />
            <div className={classes.camera}>
              <FiCamera />
            </div>
          </label>
          <input
            id="userImage"
            type="file"
            accept="images/*"
            style={{ display: "none" }}
            onChange={userImageHandler}
          />
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            ref={name}
            defaultValue={userDetails.Name}
          />
          <label htmlFor="bio">Your Bio</label>
          <textarea
            id="bio"
            rows="3"
            maxLength="50"
            placeholder="Your Bio"
            ref={bio}
            defaultValue={userDetails.Bio}
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
