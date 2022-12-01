import { DoubleSide, BufferGeometry } from "three";
import { MutableRefObject, useMemo, useRef, useEffect } from "react";

const CustomObject = () => {
  const verticesCount = 10 * 3;
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  const geometryRef = useRef() as MutableRefObject<BufferGeometry>;

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, [positions]);

  return (
    <>
      <mesh>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" count={verticesCount} itemSize={3} array={positions} />
        </bufferGeometry>
        <meshStandardMaterial color={"red"} side={DoubleSide} />
      </mesh>
    </>
  );
};

export default CustomObject;
