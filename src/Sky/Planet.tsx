import { LayerMaterial, Depth, Fresnel } from "lamina";

const Planet = () => {
  return (
    <>
      <mesh castShadow scale={[2, 2, 2]} position={[100, 200, 0]}>
        <sphereGeometry args={[64, 128, 128]} />
        <LayerMaterial color={"white"} lighting="physical">
          <Depth
            near={0.4854}
            far={0.7661999999999932}
            origin={[-0.4920000000000004, 0.4250000000000003, 0]}
            colorA={"#8baafe"}
            colorB={"#0079f9"}
          />
          <Fresnel color={"#fe0000"} mode={"screen"} />
        </LayerMaterial>
      </mesh>
    </>
  );
};

export default Planet;
