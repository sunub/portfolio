import * as THREE from "three";
import { Color, Points } from "three";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { PointMaterial } from "@react-three/drei";

const count = 50000;
const colorArray = new Float32Array(count * 3);
const positionArray = new Float32Array(count * 3);
const sizeArray = new Float32Array(count);
for (let i = 0; i < count; i++) {
  const iStride3 = i * 3;

  const theta = 2 * Math.PI * Math.random();
  const phi = Math.acos(2 * Math.random() - 1.0);

  const x = Math.cos(theta) * Math.sin(phi) * 400;
  const y = Math.sin(theta) * Math.sin(phi) * 400;
  const z = Math.cos(phi) * 400;

  sizeArray[i] = Math.random() * 1.5;

  positionArray[iStride3 + 0] = x;
  positionArray[iStride3 + 1] = y;
  positionArray[iStride3 + 2] = z;

  const color = new Color(`hsl(${Math.round(360 * Math.random())}, 100%, 80%)`);

  color.convertSRGBToLinear();

  colorArray[iStride3 + 0] = color.r;
  colorArray[iStride3 + 1] = color.b;
  colorArray[iStride3 + 2] = color.g;
}

const Universe = () => {
  const particle = useRef() as MutableRefObject<Points>;

  useFrame((state, delta) => {
    particle.current.rotation.y += delta / 100;
  });

  return (
    <>
      <points frustumCulled={false} scale={[3, 3, 3]} ref={particle}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={positionArray}
            itemSize={3}
            count={count}
          />
          <bufferAttribute
            attach={"attributes-color"}
            array={colorArray}
            itemSize={3}
            count={count}
          />
          <bufferAttribute
            attach={"attributes-size"}
            array={sizeArray}
            itemSize={0.6}
            count={count}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
          size={1}
          sizeAttenuation={false}
          depthWrite={false}
        />
      </points>
    </>
  );
};

export default Universe;
