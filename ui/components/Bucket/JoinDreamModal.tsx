import React, {useContext, useState} from "react";
import { Modal } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import Context from '../../contexts/comment';
import Button from "../Button";
import toast from "react-hot-toast";

const JoinDreamModal = ({
  open,
  handleClose,
  bucket,
}) => {
  const [commentText, setCommentText] = useState("");
  const { addComment } = useContext<any>(Context);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-start justify-center p-4 md:pt-16 overflow-y-scroll max-h-screen"
    >
      <div className="bg-white rounded shadow p-6 grid grid-cols-1 gap-4 focus:outline-none" dir={"rtl"}>
        <div>
          <h2 className="font-medium mb-2">
            <FormattedMessage
                defaultMessage="Share about yourself. What gift can you give to the dream?"
                id={"joindreamdescription"}/>
            <br/>
            <FormattedMessage
                defaultMessage="Share about yourself. What gift can you give to the dream?"
                id={"joindreamdescription2"}/>
          </h2>
          <textarea
              className={`px-4 py-3 rounded-md bg-gray-100 focus:bg-white focus:outline-none border-3
                transition-colors ease-in-out duration-200 border-gray-300 w-full`}
              placeholder={"I know kung fu"}
              rows={4}
              autoFocus={true}
              maxLength={4000}
              required={true}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
          />
          <h4 className="font-medium mb-2 text-gray-500">
            <FormattedMessage
                id={"joindreamfooter"}/>
            <br/>
            <FormattedMessage
                id={"joindreamfooter2"}/>
          </h4>
          <div className={"mt-4 mb-4"}>
            <Button
                onClick={() => {
                  addComment({
                    bucketId: bucket.id,
                    content: commentText === "" ? 'I would like to join! - אשמח להצטרף לחלום': commentText,
                  }).then(({ error }) => {
                    handleClose(null, null, true);
                    if (error) {
                      return toast.error(error.message);
                    } else {
                      return toast.success(
                          'Joined Dream Successfully 😎 - Dreamer got an email - הצטרפת בהצלחה - החולם קיבל מייל',
                          { duration: 10000 }
                      );
                    }
                  });
                }}
                variant="secondary"
                color={bucket.round.color}
                className="mr-2"
            >
              <FormattedMessage id={"sendemailtocreator"}/>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JoinDreamModal;
