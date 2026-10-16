import "./styles/Work.css";
import WorkImage from "./WorkImage";

const projects = [
  {
    name: "Learnova AI",
    category: "AI Learning Platform",
    tools: "MongoDB, Express.js, React.js, Node.js, JWT, Generative AI",
    description:
      "AI-powered learning platform with generative study assistance, automated quizzes, JWT auth, user profiles, and responsive dashboards.",
    image: "/images/learnova.jpg",
    link: "https://github.com/Vanshh19",
  },
  {
    name: "Khana-Khazana",
    category: "Food Delivery Platform",
    tools: "MongoDB, Express.js, React.js, Node.js, Razorpay",
    description:
      "Full-stack food ordering platform with secure authentication, Razorpay payments, shopping cart, live order tracking, and admin dashboard.",
    image: "/images/khana_khazana.jpg",
    link: "https://github.com/Vanshh19",
  },
  {
    name: "Baat-Chit",
    category: "Real-Time Chat App",
    tools: "MongoDB, Express.js, React.js, Node.js, Socket.io, JWT",
    description:
      "Real-time chat platform with Socket.io instant messaging, JWT authentication, active online status indicators, and media sharing support.",
    image: "/images/baat_chit.jpg",
    link: "https://github.com/Vanshh19",
  }
];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Overview</h4>
                <p>{project.description}</p>
                <h4 style={{ marginTop: "12px" }}>Tools &amp; Stack</h4>
                <p style={{ color: "#c2a4ff" }}>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
