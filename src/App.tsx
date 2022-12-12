import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import CameraControls from "./Component/CameraContorls";
import { Environment } from "@react-three/drei";
import { useState } from "react";

const env = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 200ms ease-in-out",
      }}
    >
      <Experience setLoaded={setLoaded} />

      <ambientLight intensity={0.1} />
      <CameraControls />
    </Canvas>
  );
};

export default App;
