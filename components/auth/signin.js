import Link from "next/link";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { CgProfile } from "react-icons/cg";
import Indicator from "../indicator/indicator";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./auth.module.scss";
import { storage } from "../../lib/dbConnect";

const signUp = async (image, name, password, email) => {
  const response = { name, email, password, image };

  const res = await fetch("/api/auth/sigin", {
    method: "POST",
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return { status: "error", message: data.err };
  } else {
    return { status: "success", message: data.message };
  }
};
const SignIn = () => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState("/default.png");
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState();
  const [showBanner, setShowBanner] = useState(false);
  const [bannerData, setbannerData] = useState({
    status: "",
    message: "Loading.....",
  });
  const emailvalue = useRef();
  const namevalue = useRef();
  const passwordvalue = useRef();

  const SubmitForm = async (e) => {
    e.preventDefault();
    const name = namevalue.current.value;
    const email = emailvalue.current.value;
    const password = passwordvalue.current.value;
    setShowBanner(true);
    setbannerData({
      status: "",
      message: "Loading.....",
    });
    const imageName = uuidv4();

    if (currentImage != "/default.png") {
      var metadata = {
        contentType: "image/jpeg",
      };
      await storage
        .ref(`profileImage/${imageName}${imageData.name}`)
        .put(imageData, metadata)
        .on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            // console.log(progress);
          },
          (err) => {},
          () => {
            storage
              .ref("profileImage")
              .child(`${imageName}${imageData.name}`)
              .getDownloadURL()
              .then(async (fireBaseUrl) => {
                const image = fireBaseUrl;

                const result = await signUp(image, name, password, email);
                setbannerData(result);
                if (result.status === "success") {
                  router.push("/auth/login");
                  return;
                }

                const pictureRef = storage.ref(
                  `profileImage/${imageName}${imageData.name}`
                );

                pictureRef.delete();
              });
          }
        );
    } else {
      const image = "/default.png";
      const result = await signUp(image, name, password, email);
      setbannerData(result);
      if (result.status === "success") {
        router.push("/auth/login");
        return;
      }
    }
  };
  const uploadImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      var image = URL.createObjectURL(e.target.files[0]);
      setImageData(e.target.files[0]);
      setCurrentImage(image);
    }
  };
  return (
    <>
      <div className={classes.profileImage}>
        <img src={currentImage} height="125" width="125" />
      </div>
      <section className={classes.auth}>
        <h1>Sign In</h1>
        <div>
          <div className={classes.control}>
            <label htmlFor="name">
              Your Name
              <span className="imp">
                <FiStar />
              </span>
            </label>
            <input type="name" id="name" required ref={namevalue} />
          </div>

          <div className={classes.control}>
            <label htmlFor="email">
              Your Email
              <span className="imp">
                <FiStar />
              </span>
            </label>
            <input type="email" id="email" required ref={emailvalue} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">
              Your Password
              <span className="imp">
                <FiStar />
              </span>
            </label>
            <input type="password" id="password" required ref={passwordvalue} />
          </div>
          <div
            className={classes.actions}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button onClick={SubmitForm}>Sign In</button>
            <button className={classes.saveImage}>
              <label
                htmlFor="fileInput"
                className="images-upload-button"
                style={{ border: "none", cursor: "pointer" }}
              >
                {`Set Profile Image ${progress == 0 ? "" : progress}`}
              </label>
              <input
                id="fileInput"
                type="file"
                accept="images/*"
                style={{ display: "none" }}
                onChange={uploadImage}
              />
            </button>
          </div>
        </div>
        <Link href="/auth/login">Having account</Link>
        {showBanner && (
          <Indicator status={bannerData.status} message={bannerData.message} />
        )}
      </section>
    </>
  );
};

export default SignIn;
