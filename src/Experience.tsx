import { extend, useThree, useFrame, ReactThreeFiber } from "@react-three/fiber";
import { useRef, MutableRefObject } from "react";
import { Mesh, Group } from "three";
import { OrbitControls } from "three-stdlib";
import CustomObject from "./CustomObject";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
    }
  }
}

const Experience = () => {
  const cubeRef = useRef() as MutableRefObject<Mesh>;
  const groupRef = useRef() as MutableRefObject<Group>;
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    groupRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>
        <mesh position-x={1} rotation-y={Math.PI * 0.25} ref={cubeRef}>
          <boxGeometry />
          <meshStandardMaterial color={"mediumpurple"} />
        </mesh>
      </group>
      <mesh position={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={"greenyellow"} />
      </mesh>
      <CustomObject />
    </>
  );
};

export default Experience;
