import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState } from "react";
import { useMutation, gql } from "urql";
import TextField from "../TextField";
import Button from "../Button";
import toast from "react-hot-toast";
import { FormattedMessage, useIntl } from "react-intl";
import validateUsername from "utils/validateUsername";
import validatePhoneNumber from "utils/validatePhoneNumber";

const EDIT_PROFILE_MUTATION = gql`
  mutation updateProfile($username: String, $name: String, $phoneNumber: String) {
    updateProfile(username: $username, name: $name, phoneNumber: $phoneNumber) {
      id
      username
      name
      phoneNumber
    }
  }
`;

export default function EditProfile({ currentUser, isOpen, handleClose }) {
  const [{ error }, updateProfile] = useMutation(EDIT_PROFILE_MUTATION);
  const [username, setUsername] = useState(currentUser.username ?? "");
  const [name, setName] = useState(currentUser.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber ?? "");
  const intl = useIntl();

  const errorMessage = useMemo(() => {
    const errorTokens = error?.message?.split(" ");
    errorTokens?.shift();
    return errorTokens ? errorTokens.join(" ") : undefined;
  }, [error]);

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        {/* <Dialog.Panel> */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="z-50 inline-block w-full max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <FormattedMessage defaultMessage={"Edit profile"} />
                </Dialog.Title>

                <div className="space-y-4 mt-2">
                  <TextField
                    label={intl.formatMessage({ defaultMessage: "Name" })}
                    inputProps={{
                      value: name,
                      onChange: (e) => setName(e.target.value),
                    }}
                  />
                  <TextField
                    label={intl.formatMessage({ defaultMessage: "Username" })}
                    error={!validateUsername(username)}
                    helperText={intl.formatMessage({
                      defaultMessage:
                        "Usernames can only contain A-Z, 0-9 and be between 2 and 20 characters long",
                    })}
                    inputProps={{
                      value: username,
                      onChange: (e) => setUsername(e.target.value),
                    }}
                  />
                   <TextField
                    label={intl.formatMessage({ defaultMessage: "Phone Number", id: "phonenumber" })}
                    error={!validatePhoneNumber(phoneNumber)}
                    helperText={intl.formatMessage({
                      defaultMessage:
                        "Phone number can start with a + and should contain only numbers",
                      id: "phonenumberhelper"
                    })}
                    inputProps={{
                      value: phoneNumber,
                      onChange: (e) => setPhoneNumber(e.target.value),
                    }}
                  />
                </div>
                {errorMessage && (
                  <div className="mt-4 text-red text-s font-medium">
                    {errorMessage}
                  </div>
                )}
                <div className="mt-4 space-x-2 flex justify-end">
                  <Button variant="secondary" onClick={handleClose}>
                    <FormattedMessage defaultMessage="Cancel" />
                  </Button>
                  <Button
                    type="submit"
                    disabled={!validateUsername(username) || !name}
                    onClick={() =>
                      updateProfile({ username, name, phoneNumber }).then(
                        ({ data, error }) => {
                          if (!error) {
                            toast.success(
                              intl.formatMessage({
                                defaultMessage: `Profile updated`,
                              })
                            );
                            handleClose();
                          }
                        }
                      )
                    }
                  >
                    <FormattedMessage defaultMessage="Save" />
                  </Button>
                </div>
                {/* </Dialog.Panel> */}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
