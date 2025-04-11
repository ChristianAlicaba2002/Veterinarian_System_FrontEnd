import React from "react";

const UserMessage = (props: any) => {
  return (
    <>
      <p className="welcome-text">
        Welcome, {props.first_name} {props.last_name}
      </p>
    </>
  );
};

export default UserMessage;
