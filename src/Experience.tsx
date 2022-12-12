import Universe from "./Sky/Universe";
import Clouds from "./Sky/Clouds";
import { Stage, useTexture } from "@react-three/drei";
import { useLayoutEffect } from "react";
import Title from "./Sky/Text";
import Planet from "./Sky/Planet";
import Lighting from "./Component/Lighting";
import Blob from "./Sky/Blob";
import Light from "./Ground/Light";
import Crystar from "./Ground/Crystar";
import Character from "./Ground/Character";
import Ground from "./Ground/Ground";

declare module Character {}

const Experience = ({ setLoaded }: { setLoaded: any }) => {
  useLayoutEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Stage environment="sunset" preset="portrait" intensity={2} adjustCamera={0.8}>
        <group position={[0, -1000, 0]} scale={[5, 5, 5]}>
          <Light />
          <Ground />
          <Crystar />
        </group>
        <Character position={[0, -800, 0]} scale={[3, 3, 3]} />
        <Clouds />
        <Blob position={[-2, 1.5, 0]} />
      </Stage>
      <Lighting />
      <Universe />
      <Title />
      <Planet />
    </>
  );
};

export default Experience;
