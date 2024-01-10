import { useState, FormEvent, useContext } from "react";
import "./ReplySectionForm.css";
import AuthContext from "../context/AuthContext";
import { UserComment } from "../models/Account";
import SpaceEvent from "../models/SpaceEvent";
import { v4 as uuidv4 } from "uuid";
import {
  addReplyToAccountComment,
  getAccountById,
} from "../services/accountApi";
import {
  addReplyToSpaceEventComment,
  getSpaceEventById,
} from "../services/theSpaceDevsApi";

interface Props {
  spaceEvent: SpaceEvent;
  setSpaceEvent: (s: SpaceEvent) => void;
  originalComment: UserComment;
}

const ReplySectionForm = ({
  spaceEvent,
  setSpaceEvent,
  originalComment,
}: Props) => {
  const [reply, setReply] = useState<string>("");

  const { account, setAccount } = useContext(AuthContext);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(reply);
    if (account) {
      const newReply: UserComment = {
        uid: account.uid,
        eventId: spaceEvent._id,
        eventDate: spaceEvent.date,
        content: reply,
        uniqueName: account.uniqueName,
        photoURL: account.photoURL,
        createdAt: new Date(),
        likes: [],
        replies: [],
        uuid: uuidv4(),
      };

      try {
        await Promise.all([
          addReplyToAccountComment(
            account._id!,
            originalComment.uuid,
            newReply
          ),
          addReplyToSpaceEventComment(
            spaceEvent._id,
            originalComment.uuid,
            newReply
          ),
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

    setReply("");
  };

  return (
    <form className="ReplySectionForm" onSubmit={submitHandler}>
      <textarea
        className="reply-input"
        placeholder="Write a reply..."
        id="reply-input"
        required
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button type="submit" className="reply-submit-btn">
        Submit Reply
      </button>
    </form>
  );
};

export default ReplySectionForm;
