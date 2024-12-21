
import "./Request.scss";
import RequestForm from "./RequestForm";
const Request = () => {
  const onSubmit = (credentials: any) => {
    console.log(credentials);

  };
  return (
    <section className="request">
      <div className="container">
        <RequestForm onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default Request;
