import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

import { getNASAImagesById } from "../services/nasaApi";
import { downloadImage } from "../services/downloadApi";
import {
  getAccountById,
  toggleSpaceImageInterest,
} from "../services/accountApi";
import AuthContext from "../context/AuthContext";

import NASAImage from "../models/NASAImage";
import "./SpaceImageDetails.css";
import RelatedArticlesAndImages from "./RelatedArticlesAndImages";

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

  const formatDate = (str: string) => str.slice(0, 10);

  const handleDownload = () => {
    const imageUrl = image?.links[0].href;
    const title = image?.data[0].title;
    if (imageUrl && title) {
      downloadImage(imageUrl).then((blob) => {
        if (blob) {
          saveAs(blob, `${title.split(" ").join("_")}.jpg`);
        }
      });
    }
  };

  const isSaved = () =>
    account &&
    image &&
    account.savedImages.some(
      (x) => x.data[0].nasa_id === image.data[0].nasa_id
    );

  const handleSaveImageBtn = async () => {
    if (account && account.uid && image) {
      await toggleSpaceImageInterest(image, account._id!);
      const temp = await getAccountById(account.uid);
      if (temp) {
        setAccount(temp);
      }
    }
  };

  const imageUrl = image?.links[0].href;
  const title = image?.data[0].title;
  const description = image?.data[0].description;
  const dateCreated = image?.data[0].date_created;

  return (
    <div className="SpaceImageDetails">
      {account && (
        <button
          className={`save-img-btn ${isSaved() ? "saved" : ""}`}
          onClick={handleSaveImageBtn}
        >
          {isSaved() ? "Saved" : "Save"}
        </button>
      )}

      <h3 className="img-title">{title}</h3>
      <p className="img-description">{description}</p>
      <p className="img-date">
        {dateCreated && `Date Created: ${formatDate(dateCreated)}`}
      </p>

      <img
        className="img"
        src={imageUrl}
        alt={
          image?.data[0].description_508
            ? image?.data[0].description_508
            : title
        }
      />
      {/* Display the NASA center if available */}
      {image?.data[0].center && (
        <p className="img-center">NASA Center: {image.data[0].center}</p>
      )}

      {/* Display the secondary creator if available */}
      {image?.data[0].secondary_creator && (
        <p className="img-secondary-creator">
          Secondary Creator: {image.data[0].secondary_creator}
        </p>
      )}
      <button className="download-btn" onClick={handleDownload}>
        Download Image
      </button>
      {image?.data[0].keywords && (
        <RelatedArticlesAndImages keywords={image?.data[0].keywords} />
      )}
    </div>
  );
};

export default SpaceImageDetails;
