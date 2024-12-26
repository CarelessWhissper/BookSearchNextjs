
const Navbar = () => {
  return (
    <div style={{ backgroundColor: "#704d37", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ color: "#dfc776", margin: 0, fontSize: "24px" }}>Book Finder</h1>
      <div>
        <a href="/" style={{ color: "#dfc776", marginRight: "15px", textDecoration: "none" }}>Home</a>
        <a href="/about" style={{ color: "#dfc776", textDecoration: "none" }}>About</a>
      </div>
    </div>
  );
};

export default Navbar;
