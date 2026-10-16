import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Education <span>&amp;</span>
          <br /> Milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in CS</h4>
                <h5>AKGEC Ghaziabad, UP</h5>
              </div>
              <h3>2023 - 27</h3>
            </div>
            <p>
              Bachelor of Technology in Computer Science (2023 – 2027) at Ajay Kumar Garg Engineering College, Ghaziabad, UP. Focus on Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), DBMS, Operating Systems, Computer Networks, and Full Stack Web Engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons &amp; DSA</h4>
                <h5>SIH &amp; LeetCode</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              • Qualified the Internal College Round of the Smart India Hackathon (SIH) collaborating on innovative software solutions.
              <br />
              • Solved 200+ problems on LeetCode, strengthening problem-solving and algorithmic skills.
              <br />
              • Represented the college in inter-college sports competitions, demonstrating teamwork and leadership.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certifications</h4>
                <h5>Udemy Certified</h5>
              </div>
              <h3>CERTS</h3>
            </div>
            <p>
              • The Complete MERN Stack Development Course — Udemy
              <br />
              • React – The Complete Guide — Udemy
              <br />
              Hands-on mastery in building scalable web architectures, REST APIs, state management, and real-time features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
