
import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Ludo Board Game",
    url: "https://github.com/brittanyharrison/Ludi_Board_Game",
    image: "projects/jamaican_ludi_ludo_board.jpeg",
    description: "Jamaican inspired Ludo board game made with python",
  },
  {
    title: "3D Portfolio Website",
    url: "http://localhost:5173/",
    image: "projects/Portfolio.jpg",
    description: "3D Portfolio Website made with React Three Fiber",
  },
  {
    title: "Jobcentre++ Automation Pipeline",
    url: "https://github.com/engineering89-final-project/jcpp",
    image: "projects/roles.png",
    description: "End to End automation pipeline for the jobcentre++ web application",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[5, 4]} />
        <meshBasicMaterial color="teal" transparent opacity={0} />
      </mesh>
      <Image
        scale={[4.5, 2]}
        url={project.image}
        toneMapped={false}
        position-y={0.5}
      />
      <Text
        maxWidth={4}
        anchorX={"center"}
        anchorY={"top"}
        fontSize={0.3}
        position={[0, -0.6, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={4}
        anchorX="center"
        anchorY="top"
        fontSize={0.2}
        position={[0, -1.2, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 7,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
