import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export function Ground(props) {
  const { nodes, materials } = useGLTF("../public/Scene/scene.gltf");
  const texture = useTexture("../public/Scene/scene.png");
  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.ground.geometry} position={[-69.16, 19.49, 3.83]} rotation={[0, 1.57, 0]}>
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}

export default Ground;

useGLTF.preload("../public/Scene/scene.gltf");

// "../public/Scene/scene.gltf"
