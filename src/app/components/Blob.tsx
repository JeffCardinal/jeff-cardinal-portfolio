import { Sphere } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import { Depth, Displace, Fresnel, LayerMaterial } from 'lamina'
import { useMemo, useRef } from 'react'
import { MathUtils, Mesh, Vector3 } from 'three'
import { Displace as DisplaceType } from 'lamina/vanilla'

export default function Blob({
  ...props
}) {
  const rand = useMemo(() => Math.random(), [])
  const strength = useRef(0)
  const displaceRef = useRef<DisplaceType & { strength: number; offset: Vector3 }>(null!)
  const ref = useRef<Mesh>(null!)

  useFrame(({ clock }, dt) => {
    // ref.current.position.x = Math.cos(clock.elapsedTime + rand * 100) * -0.1 + 0.2
    ref.current.position.y = Math.sin(clock.elapsedTime + rand * 100) * 0.1 - 0.2
    // ref.current.position.z = Math.cos(clock.elapsedTime + rand * 100) * -0.1 + 0.2

    if (displaceRef.current.strength !== strength.current) {
      displaceRef.current.strength = MathUtils.lerp(
        displaceRef.current.strength,
        strength.current,
        0.1
      )
    }

    if (strength.current > 0) {
      displaceRef.current.offset.x += 0.3 * dt
    }
  })

  return (
    <group {...props}>
      <Sphere
        onPointerEnter={() => (strength.current = 0.2)}
        onPointerLeave={() => (strength.current = 0)}
        ref={ref}
        args={[0.4, 128, 128]}
        scale={props.scale}
      >
        <LayerMaterial
          color={'#ffffff'}
          lighting={'physical'}
          transmission={1}
          roughness={0}
          thickness={10}
        >
          <Depth
            near={0.5}
            far={0.8}
            origin={[-0.5, 0.5, 0]}
            colorA={'#fec5da'}
            colorB={'#00b8fe'}
          />
          <Displace ref={displaceRef} strength={0} scale={5} offset={[0.09189000000357626, 0, 0]} />
          <Fresnel
            color={'#fefefe'}
            bias={0.4}
            intensity={4}
            power={4}
            factor={0.1}
            mode={'screen'}
          />
        </LayerMaterial>
      </Sphere>
    </group>
  )
}
