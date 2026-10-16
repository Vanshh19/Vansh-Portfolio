import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/TechStack.css";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/javascript.webp",
  "/images/typescript.webp",
  "/images/mysql.webp",
  "/images/next2.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// Generate 22 well-distributed larger spheres
const spheres = [...Array(22)].map((_, i) => ({
  scale: [1.3, 1.2, 1.45, 1.3][i % 4],
  initialPos: [
    (Math.random() - 0.5) * 16,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 4,
  ] as [number, number, number],
}));

type SphereProps = {
  scale: number;
  initialPos: [number, number, number];
  material: THREE.Material;
  isActive: boolean;
};

function SphereGeo({ scale, initialPos, material, isActive }: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    const cur = api.current.translation();
    const dist = Math.hypot(cur.x, cur.y, cur.z);

    // Smooth inward attraction force toward center
    if (dist > 0.2) {
      const clampedDelta = Math.min(delta, 0.05);
      const strength = Math.min(dist * 7, 28) * clampedDelta * scale;
      api.current.applyImpulse(
        {
          x: (-cur.x / dist) * strength,
          y: (-cur.y / dist) * strength,
          z: (-cur.z / dist) * strength * 1.5,
        },
        true
      );
    }
  });

  return (
    <RigidBody
      linearDamping={1.5}
      angularDamping={1.0}
      friction={0.2}
      restitution={0.65}
      position={initialPos}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
  );
}

function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    ref.current.setNextKinematicTranslation({ x, y, z: 0 });
  });

  return (
    <RigidBody
      position={[50, 50, 50]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1.8]} />
    </RigidBody>
  );
}

// Invisible boundary walls to keep spheres within viewport
// function Boundaries() {
//   return (
//     <>
//       {/* Top & Bottom */}
//       <CuboidCollider position={[0, 8.5, 0]} args={[22, 0.5, 8]} />
//       <CuboidCollider position={[0, -8.5, 0]} args={[22, 0.5, 8]} />
//       {/* Left & Right */}
//       <CuboidCollider position={[-17, 0, 0]} args={[0.5, 12, 8]} />
//       <CuboidCollider position={[17, 0, 0]} args={[0.5, 12, 8]} />
//       {/* Front & Back */}
//       <CuboidCollider position={[0, 0, -5]} args={[22, 12, 0.5]} />
//       <CuboidCollider position={[0, 0, 5]} args={[22, 12, 0.5]} />
//     </>
//   );
// }

function Boundaries() {
  return (
    <>
      {/* Wider top and bottom boundaries */}
      <CuboidCollider
        position={[0, 12, 0]}
        args={[30, 0.5, 8]}
      />
      <CuboidCollider
        position={[0, -12, 0]}
        args={[30, 0.5, 8]}
      />

      {/* Wider left and right boundaries */}
      <CuboidCollider
        position={[-24, 0, 0]}
        args={[0.5, 16, 8]}
      />
      <CuboidCollider
        position={[24, 0, 0]}
        args={[0.5, 16, 8]}
      />

      {/* Front and back */}
      <CuboidCollider
        position={[0, 0, -7]}
        args={[30, 16, 0.5]}
      />
      <CuboidCollider
        position={[0, 0, 7]}
        args={[30, 16, 0.5]}
      />
    </>
  );
}

const skillCategories = [
  {
    title: "Languages",
    skills: ["C/C++", "Python", "SQL", "Java", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Tailwind CSS", "React Router DOM", "Responsive UI", "Modern CSS"],
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.io", "JWT", "Bcrypt.js"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "Mongoose", "SQL", "DBMS", "Data Modeling"],
  },
  {
    title: "Libraries & Tools",
    skills: ["Razorpay SDK", "Socket.io", "Git", "GitHub", "VS Code", "Postman"],
  },
  {
    title: "Core CS Concepts",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
];

const TechStack = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".techstack",
      start: "top 95%",
      end: "bottom 5%",
      onToggle: (self) => setIsActive(self.isActive),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.25,
          roughness: 0.35,
        })
    );
  }, []);

  return (
    <div className="techstack" id="techstack">
      <div className="techstack-title-box">
        <h2>
          Tech <span>Stack</span>
        </h2>
        <div className="techstack-subtitle">
          Technologies, frameworks, and tools I use to build scalable web software
        </div>
      </div>

      <div className="tech-canvas-container">
        <Canvas
          shadows
          gl={{ alpha: true, depth: true, antialias: true }}
          camera={{ position: [0, 0, 19], fov: 36, near: 0.1, far: 50 }}
          className="tech-canvas"
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.8} />
          <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#c77dff" />
          <pointLight position={[0, 0, 8]} intensity={1} color="#ffffff" />

          <Physics gravity={[0, 0, 0]}>
            <Boundaries />
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                scale={props.scale}
                initialPos={props.initialPos}
                material={materials[i % materials.length]}
                isActive={isActive}
              />
            ))}
          </Physics>

          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="tech-hint">⚡ Hover &amp; drag over the canvas to interact with physics spheres</div>

      {/* Categorized Skills Grid */}
      <div className="tech-skills-matrix">
        {skillCategories.map((cat, idx) => (
          <div className="tech-category-card" key={idx}>
            <h3>
              <span className="cat-dot"></span>
              {cat.title}
            </h3>
            <div className="tech-tags-list">
              {cat.skills.map((skill, sIdx) => (
                <span className="tech-tag-pill" key={sIdx}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
