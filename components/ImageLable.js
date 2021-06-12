import Image from "next/image";
import classes from "./imageLable.module.scss";
const ImageLabel = ({ url }) => {
  if (!url) {
    return <h1></h1>;
  }
  return (
    <div className={classes.imageLabel}>
      <Image src={url} alt="Logo" height={50} width={50} layout="fixed" />
    </div>
  );
};

export default ImageLabel;
