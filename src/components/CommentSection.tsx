import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import SpaceEvent from "../models/SpaceEvent";
import {
  deleteCommentFromAccount,
  getAccountById,
} from "../services/accountApi";
import {
  deleteCommentFromSpaceEvent,
  getSpaceEventById,
  toggleLikeOnComment,
} from "../services/theSpaceDevsApi";
import "./CommentSection.css";
import CommentSectionForm from "./CommentSectionForm";
import { UserComment } from "../models/Account";
import ReplySection from "./ReplySection";

interface Props {
  spaceEvent: SpaceEvent;
  setSpaceEvent: (s: SpaceEvent) => void;
}

export const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const commentDate = new Date(dateString);
  const diffInSeconds = Math.floor(
    (now.getTime() - commentDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
};

const CommentSection = ({ spaceEvent, setSpaceEvent }: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const [selectedReplyUuid, setSelectedReplyUUid] = useState("");

  const [visibleCount, setVisibleCount] = useState(4);
  const [filterMostLiked, setFilterMostLiked] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const loadMoreComments = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const filterComments = (allComments: UserComment[]): UserComment[] => {
    let filteredComments = allComments;
    filteredComments = filteredComments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (filterMostLiked) {
      filteredComments = filteredComments.sort(
        (a, b) => b.likes.length - a.likes.length
      );
    }

    return filteredComments;
  };

  const handleDelete = async (commentUuid: string) => {
    if (account) {
      await deleteCommentFromSpaceEvent(spaceEvent._id, commentUuid);
      await deleteCommentFromAccount(account._id!, commentUuid);

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

  const handleLike = async (commentUuid: string) => {
    if (account) {
      await toggleLikeOnComment(spaceEvent._id, account.uid, commentUuid);
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
    <div className="CommentSection">
      <h2>Event Comments</h2>
      <CommentSectionForm
        spaceEvent={spaceEvent}
        setSpaceEvent={setSpaceEvent}
      />
      <div className="filter-container">
        {spaceEvent.comments[0] && spaceEvent.comments[1] && (
          <button onClick={() => setShowFilterOptions((prev) => !prev)}>
            Filter Comments{" "}
            <span className={showFilterOptions ? "flipUpsideDown" : ""}>▼</span>
          </button>
        )}
        {showFilterOptions && (
          <>
            <div
              className="filter-btn"
              onClick={() => {
                setFilterMostLiked((prev) => !prev);
              }}
            >
              Most Liked {filterMostLiked ? "☑" : "🔲"}
            </div>
          </>
        )}
      </div>
      <ul className="space-event-ul">
        {filterComments(spaceEvent.comments)
          .slice(0, visibleCount)
          .map((commentObj) => (
            <li key={commentObj.uuid} className="space-event-li">
              {commentObj.uid === account?.uid && (
                <button
                  className="delete-comment-btn"
                  onClick={() => handleDelete(commentObj.uuid)}
                >
                  X
                </button>
              )}
              {commentObj.photoURL && (
                <img
                  src={`https://robohash.org/${commentObj.uniqueName}?set=set1`}
                  alt="robohash.org photo"
                />
              )}
              <p className="comment-date">
                {formatTimeAgo(commentObj.createdAt.toString())}
              </p>

              <div className="comment-info">
                <p className="comment-author">{commentObj.uniqueName}</p>
                <p className="comment-content">{commentObj.content}</p>

                <button
                  className="comment-reply"
                  onClick={() => setSelectedReplyUUid(commentObj.uuid)}
                >
                  <span className="comment-reply-span">
                    {commentObj.replies.length}
                  </span>
                  Reply{" "}
                </button>
                <button
                  className="comment-like"
                  onClick={() => handleLike(commentObj.uuid)}
                >
                  <span className="comment-like-span">
                    {commentObj.likes.length}
                  </span>
                  Like{" "}
                </button>
              </div>
              {selectedReplyUuid === commentObj.uuid && (
                <ReplySection
                  replies={commentObj.replies}
                  originalComment={commentObj}
                  spaceEvent={spaceEvent}
                  setSpaceEvent={setSpaceEvent}
                  setSelectedReplyUUid={setSelectedReplyUUid}
                />
              )}
            </li>
          ))}
      </ul>
      {spaceEvent.comments[1] && (
        <div>
          {spaceEvent &&
          visibleCount < filterComments(spaceEvent.comments).length ? (
            <button className="load-more-btn" onClick={loadMoreComments}>
              More Comments
            </button>
          ) : (
            <button
              className="load-more-btn"
              onClick={() => setVisibleCount(1)}
            >
              Hide
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
