import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { getNASAImagesById } from "../services/nasaApi";
import NASAImage from "../models/NASAImage";
import "./SpaceImageDetails.css";
import { downloadImage } from "../services/downloadApi";
import AuthContext from "../context/AuthContext";
import {
  getAccountById,
  toggleSpaceImageInterest,
} from "../services/accountApi";

const SpaceImageDetails = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [image, setImage] = useState<NASAImage | null>(null);
  const { nasa_id } = useParams();

  useEffect(() => {
    if (nasa_id) {
      getNASAImagesById(nasa_id).then((res) => {
        setImage(res);
      });
    }
  }, [nasa_id]);

  const imageUrl = image?.links[0].href;
  const title = image?.data[0].title;
  const description = image?.data[0].description;
  const dateCreated = image?.data[0].date_created;

  const formatDate = (str: string) => {
    return str.slice(0, 10);
  };

  const handleDownload = () => {
    if (imageUrl && title) {
      downloadImage(imageUrl).then((blob) => {
        if (blob) {
          saveAs(blob, `${title.split(" ").join("_")}.jpg`);
        }
      });
    }
  };

  const isSaved = (): boolean => {
    if (account && image) {
      return account.savedImages.some(
        (x) => x.data[0].nasa_id === image.data[0].nasa_id
      );
    } else return false;
  };

  const handleSaveImageBtn = async () => {
    if (account && account.uid && image) {
      await toggleSpaceImageInterest(image, account._id!);
      let temp = await getAccountById(account.uid);
      if (temp) {
        setAccount(temp);
      }
    }
  };

  return (
    <div className="SpaceImageDetails">
      {account && (
        <button
          className={`save-btn ${isSaved() ? "saved" : ""}`}
          onClick={() => handleSaveImageBtn()}
        >
          {isSaved() ? "Saved" : "Save"}
        </button>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{dateCreated && `Date Created: ${formatDate(dateCreated)}`}</p>
      <img src={imageUrl} alt={title} />
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default SpaceImageDetails;
