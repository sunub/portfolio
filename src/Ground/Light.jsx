import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Light(props) {
  const { nodes, materials } = useGLTF("../public/Scene/light.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.portalLight.geometry}
        material={materials["Material.004"]}
        position={[4.81, 32.88, 68.92]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh castShadow receiveShadow geometry={nodes.lampLIghtL.geometry} material={materials.lighting} position={[8.4, 27.78, 7.61]} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lampLightR.geometry}
        material={materials.lighting}
        position={[0.81, 27.78, 7.61]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh castShadow receiveShadow geometry={nodes.gateBallLIght.geometry} material={materials["Material.003"]} position={[4.77, 32.88, 36.24]} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.treeLight01.geometry}
        material={materials.Tree}
        position={[-11.04, 21.24, 37.75]}
        rotation={[Math.PI / 2, 0, -0.1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.treeLight02.geometry}
        material={materials["Tree.001"]}
        position={[14.25, 19.68, 22.79]}
        rotation={[Math.PI / 2, 0, -0.34]}
        scale={1.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.crystarLight02.geometry}
        material={materials.crystal}
        position={[17.77, 20.54, 1.54]}
        rotation={[0, 1.1, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.crystarLight.geometry}
        material={materials.crystal}
        position={[4.76, 22.97, -7.98]}
        rotation={[Math.PI, -0.81, Math.PI]}
        scale={[-0.79, -1.64, -0.67]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.crystarLight05.geometry}
        material={materials.crystal}
        position={[-19.54, 20.99, 14.57]}
        rotation={[0, 1.1, 0]}
        scale={[0.69, 1.47, 0.69]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.crystarLight03.geometry}
        material={materials.crystal}
        position={[16.47, 20.54, 0.29]}
        rotation={[0, 1.1, 0]}
        scale={[0.39, 0.84, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.crystarLight04.geometry}
        material={materials.crystal}
        position={[-5.02, 21.63, 17.39]}
        rotation={[-Math.PI, 0.77, -Math.PI]}
        scale={[0.61, 1.29, 0.61]}
      />
    </group>
  );
}

export default Light;

useGLTF.preload("../public/Scene/light.gltf");
