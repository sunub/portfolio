import { extend, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

extend({ OrbitControls });

const CameraControls: React.FC = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    controlsRef.current?.update();
  });

  return <OrbitControls ref={controlsRef} camera={camera} domElement={gl.domElement} enableDamping={true} />;
};

export default CameraControls;
