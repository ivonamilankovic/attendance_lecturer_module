import Header from "./Header";

function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found">
        <h1>Oops....</h1>
        <h3>Sorry, this page is not found!</h3>
      </div>
    </>
  );
}

export default NotFound;
