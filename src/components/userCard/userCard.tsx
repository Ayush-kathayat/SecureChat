import "./userCard.css";
// necessary component imports

import Image from "../../../utils/image";
import Button from "../button/button";

interface AccountDetails {
  name: string;
  accountAddress: string;
}

interface UserCardProps {
  element: AccountDetails; // replaced Element with AccountDetails
  index: number;
  addFriends: (accountDetails: AccountDetails) => Promise<void>;
  // other props...
}

const UserCard: React.FC<UserCardProps> = ({ element, index, addFriends }) => {
  // component implementation...
  return (
    <>
      <div className="user-card-wrapper">
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            width: 200,
            height: 200,
          }}
        >
          <Image
            src={`pic-${index + 1}.svg`}
            alt="profile-pic"
            width={200}
            height={200}
          />
        </div>
        <div className="user-card-details">
          <h3>{element.name}</h3>
          <p>{element.accountAddress}</p>
        </div>

        <Button
          text="Add Friend"
          onClick={() =>
            addFriends({
              name: element.name,
              accountAddress: element.accountAddress,
            })
          }
        />
      </div>
    </>
  );
};

export default UserCard;
