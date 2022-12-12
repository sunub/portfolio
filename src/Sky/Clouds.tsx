import { Suspense } from "react";
import { Cloud } from "@react-three/drei";

const Clouds = () => {
  const cloudsHeight: number = -300;

  return (
    <>
      <group position={[80, cloudsHeight, 50]} scale={[30, 30, 30]} >
        <Cloud position={[-10, -2, 10]} args={[3, 2]} />
        <Cloud position={[10, 2, 10]} args={[3, 2]} />
        <Cloud args={[5, 5]} />
        <Cloud position={[4, -2, 10]} args={[3, 2]} />
        <Cloud position={[4, 8, -10]} args={[3, 2]} />
      </group>
      <group position={[20, cloudsHeight, -100]} scale={[30, 30, 30]}>
        <Cloud position={[-10, 8, 0]} args={[3, 2]} opacity={0.5} speed={0.1} />
        <Cloud position={[10, 2, 0]} args={[3, 2]} opacity={0.2} speed={0.6} />
        <Cloud args={[5, 5]} />
        <Cloud position={[20, -3, 10]} args={[3, 2]} opacity={0.3} speed={0.1} segments={50} depth={2} />
        <Cloud position={[4, -2, -10]} args={[3, 2]} />
      </group>
      <group position={[-500, cloudsHeight, 50]} scale={[15, 15, 15]}>
        <Cloud position={[-10, 2, 0]} args={[3, 2]} opacity={0.3} speed={0.9} />
        <Cloud position={[10, 10, 0]} args={[3, 2]} />
        <Cloud args={[5, 5]} />
        <Cloud position={[7, -6, 2]} args={[3, 2]} />
        <Cloud position={[0, -10, -10]} args={[3, 2]} />
      </group>
      <group position={[-600, cloudsHeight, -130]} scale={[20, 20, 20]}>
        <Cloud position={[-10, -2, 0]} args={[3, 2]} opacity={0.8} speed={0.7} />
        <Cloud position={[10, 2, 0]} args={[3, 2]} opacity={0.8} speed={0.7} />
        <Cloud args={[5, 5]} />
        <Cloud position={[0, 0, 0]} args={[3, 2]} opacity={0.8} speed={0.7} />
        <Cloud position={[4, -2, -10]} args={[3, 2]} opacity={0.8} speed={0.7} />
      </group>
    </>
  );
};

export default Clouds;
