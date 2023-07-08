function Header({ loggedIn }) {
    //TODO fix routes
  return (
    <header>
      <div className="header-left">
        <span>
          <img
            src="./title-icon.png"
            alt="icon"
            width="25px"
          />
          <span className="page-name">Attendance Lecturer Module</span>
        </span>
        {loggedIn && (
          <>
            <a href="#">Dashboard</a>
            <a href="#">Statistics</a>
          </>
        )}
      </div>
      <div className="header-right">
        {loggedIn ? (
          <>
            <a href="#">My profile</a>
            <a href="#">Log out</a>
          </>
        ) : (
          <a href="#">Log in</a>
        )}
      </div>
    </header>
  );
}

export default Header;
