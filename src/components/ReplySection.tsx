import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { UserComment } from "../models/Account";
import SpaceEvent from "../models/SpaceEvent";
import {
  deleteReplyFromAccountComment,
  getAccountById,
} from "../services/accountApi";
import "./ReplySection.css";
import ReplySectionForm from "./ReplySectionForm";
import {
  deleteReplyFromSpaceEventComment,
  getSpaceEventById,
  toggleLikeOnReply,
} from "../services/theSpaceDevsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatTimeAgo } from "./CommentSection";

interface Props {
  replies: UserComment[];
  spaceEvent: SpaceEvent;
  setSpaceEvent: (s: SpaceEvent) => void;
  originalComment: UserComment;
  setSelectedReplyUUid: (s: string) => void;
}

const ReplySection = ({
  replies,
  spaceEvent,
  setSpaceEvent,
  originalComment,
  setSelectedReplyUUid,
}: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const handleDelete = async (reply: UserComment) => {
    if (account) {
      await deleteReplyFromSpaceEventComment(
        spaceEvent._id,
        originalComment.uuid,
        reply.uuid
      );
      await deleteReplyFromAccountComment(
        account._id!,
        originalComment.uuid,
        reply.uuid
      );

      getAccountById(account.uid).then((res) => {
        if (res) {
          setAccount(res);
        }
      });

      getSpaceEventById(spaceEvent._id).then((res) => {
        if (res) {
          setSpaceEvent(res);
        }
      });
    }
  };

  const handleLike = async (replyUuid: string) => {
    if (account) {
      await toggleLikeOnReply(spaceEvent._id, replyUuid, account.uid);
      getAccountById(account.uid).then((res) => {
        if (res) {
          setAccount(res);
        }
      });
      getSpaceEventById(spaceEvent._id).then((res) => {
        if (res) {
          setSpaceEvent(res);
        }
      });
    }
  };

  return (
    <div className="ReplySection">
      <h2>Reply</h2>
      <p>
        <strong>{originalComment.uniqueName}</strong>
      </p>
      <p>{originalComment.content}</p>
      <ul className="replies-list">
        {replies.map((reply) => (
          <li key={reply.uuid} className="reply-li">
            {reply.uid === account?.uid && (
              <button
                className="trash-icon"
                onClick={() => handleDelete(reply)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
            <div className="img-container">
              <img
                src={`https://robohash.org/${reply.uniqueName}?set=set1`}
                alt="robohash.org photo"
              />
            </div>
            <p className="time-ago-p">
              {formatTimeAgo(reply.createdAt.toString())}
            </p>

            <div className="reply-content-container">
              <strong>{reply.uniqueName}</strong>
              <p>{reply.content}</p>
            </div>

            <button
              className="comment-like"
              onClick={() => handleLike(reply.uuid)}
            >
              <span className="comment-like-span">{reply.likes.length}</span>
              Like{" "}
            </button>
          </li>
        ))}
      </ul>
      <ReplySectionForm
        originalComment={originalComment}
        spaceEvent={spaceEvent}
        setSpaceEvent={setSpaceEvent}
      />
      <div className="btn-container">
        <button onClick={() => setSelectedReplyUUid("")}>Close</button>
      </div>
    </div>
  );
};

export default ReplySection;
