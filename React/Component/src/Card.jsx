function Card() {
  return (
    <>
      <h1 className="card-title">My Card</h1>
      <div className="card">
        <img
          src="https://i.ibb.co/6r5k0s3/male-profile.jpg"
          alt="Profile"
          className="card-img"
        />
        <h2 className="card-role">Software Developer</h2>
        <p className="card-text">
          Hii, I am <span>Shivam Kumar</span>, working as a Software Analyst passionate
          about building user-friendly web applications.
        </p>
        <button className="card-btn">Contact Me</button>
      </div>
    </>
  );
}

export default Card;
