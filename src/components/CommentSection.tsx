import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import SpaceEvent from "../models/SpaceEvent";
import { deleteCommentFromAccount } from "../services/accountApi";
import { deleteCommentFromSpaceEvent } from "../services/theSpaceDevsApi";
import "./CommentSection.css";
import CommentSectionForm from "./CommentSectionForm";

interface Props {
  spaceEvent: SpaceEvent;
  setSpaceEvent: (s: SpaceEvent) => void;
}

const CommentSection = ({ spaceEvent, setSpaceEvent }: Props) => {
  const { account } = useContext(AuthContext);

  const handleDelete = async (commentUuid: string) => {
    if (account) {
      await deleteCommentFromAccount(account._id!, commentUuid);
      await deleteCommentFromSpaceEvent(spaceEvent._id, commentUuid);
    }
  };
  return (
    <div className="CommentSection">
      <CommentSectionForm
        spaceEvent={spaceEvent}
        setSpaceEvent={setSpaceEvent}
      />
      <ul className="space-event-ul">
        {spaceEvent.comments.map((commentObj) => (
          <li key={commentObj.uuid} className="space-event-li">
            <div className="comment-info">
              <button onClick={() => handleDelete(commentObj.uuid)}>X</button>
              <p className="comment-content">{commentObj.content}</p>
              <p className="comment-author">By: {commentObj.displayName}</p>
              {commentObj.photoURL && (
                <img
                  src={commentObj.photoURL}
                  alt={commentObj.displayName}
                  className="comment-author-photo"
                />
              )}
              <p className="comment-likes">Likes: {commentObj.likes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
