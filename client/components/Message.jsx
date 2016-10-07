const Message = ({ message, errored }) => {
  return (
    <div className={"alert alert-" + (errored ? "warning" : "success")}>
      {message}
    </div>
  );
};

export default Message;
