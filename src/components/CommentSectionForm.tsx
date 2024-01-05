import { FormEvent, useContext, useState } from "react";
import "./CommentSectionForm.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import { UserComment } from "../models/Account";
import SpaceEvent from "../models/SpaceEvent";
import { v4 as uuidv4 } from "uuid";
import { addCommentToAccount, getAccountById } from "../services/accountApi";
import {
  addCommentToSpaceEvent,
  getSpaceEventById,
} from "../services/theSpaceDevsApi";

interface Props {
  spaceEvent: SpaceEvent;
  setSpaceEvent: (s: SpaceEvent) => void;
}

const CommentSectionForm = ({ spaceEvent, setSpaceEvent }: Props) => {
  const { user, account, setAccount } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    console.log(comment);

    if (account) {
      const newComment: UserComment = {
        uid: account.uid,
        eventId: spaceEvent.id.toString(),
        content: comment,
        displayName: account.displayName,
        photoURL: account.photoURL,
        createdAt: new Date(),
        likes: 0,
        replies: [],
        uuid: uuidv4(),
      };

      try {
        await Promise.all([
          addCommentToAccount(account._id!, newComment),
          addCommentToSpaceEvent(spaceEvent._id, newComment),
        ]);
      } catch (err) {
        console.error("Error processing comments:", err);
      }

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

    setComment("");
  };

  return (
    <form className="CommentSectionForm" onSubmit={submitHandler}>
      <textarea
        className="text-area"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
      />
      {user ? (
        <button className="submit-btn" type="submit">
          Post Comment
        </button>
      ) : (
        <div
          className="submit-btn"
          style={{ textAlign: "center" }}
          onClick={signInWithGoogle}
        >
          Log In
        </div>
      )}
    </form>
  );
};

export default CommentSectionForm;
