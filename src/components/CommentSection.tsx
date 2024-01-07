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

interface Props {
  spaceEvent: SpaceEvent;
  setSpaceEvent: (s: SpaceEvent) => void;
}

const CommentSection = ({ spaceEvent, setSpaceEvent }: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const [visibleCount, setVisibleCount] = useState(4);
  const [filterMostLiked, setFilterMostLiked] = useState(false);
  const [filterNewest, setFilterNewest] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const loadMoreComments = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const filterComments = (allComments: UserComment[]): UserComment[] => {
    let filteredComments = allComments;

    if (filterMostLiked) {
      filteredComments = filteredComments.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
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
        {spaceEvent.comments[0] && (
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
                setFilterNewest(false);
                setFilterMostLiked((prev) => !prev);
              }}
            >
              Most Liked {filterMostLiked ? "☑" : "🔲"}
            </div>
            <div
              className="filter-btn"
              onClick={() => {
                setFilterMostLiked(false);
                setFilterNewest((prev) => !prev);
              }}
            >
              Newest {filterNewest ? "☑" : "🔲"}
            </div>
          </>
        )}
      </div>
      <ul className="space-event-ul">
        {filterComments(spaceEvent.comments)
          .slice(0, visibleCount)
          .map((commentObj) => (
            <li key={commentObj.uuid} className="space-event-li">
              <button
                className="delete-comment-btn"
                onClick={() => handleDelete(commentObj.uuid)}
              >
                X
              </button>
              {commentObj.photoURL && (
                <img
                  src={`https://robohash.org/${commentObj.uniqueName}?set=set1`}
                  alt="robohash.org photo"
                />
              )}

              <div className="comment-info">
                <p className="comment-author">{commentObj.uniqueName}</p>
                <p className="comment-content">{commentObj.content}</p>

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
              {commentObj.replies && commentObj.replies.length > 0 && (
                <ul className="replies-list">
                  {commentObj.replies.map((reply) => (
                    <li key={reply.uuid} className="reply-li">
                      <p>{reply.content}</p>
                    </li>
                  ))}
                </ul>
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
