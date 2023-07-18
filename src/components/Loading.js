import Header from "./Header";

function Loading() {
  return (
    <>
    <Header/>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
export default Loading;
