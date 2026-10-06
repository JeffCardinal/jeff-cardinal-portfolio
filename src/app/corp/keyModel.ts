import { BufferAttribute, BufferGeometry, Group, Mesh, Vector3 } from "three";

type BiteEdge = {
  geometry: BufferGeometry;
  vertices: { index: number; station: number; restY: number }[];
  stations: number[];
  step: number;
};

export function prepareKeyModel(source: Group) {
  const model = source.clone(true);
  const edges: BiteEdge[] = [];
  const geometries: BufferGeometry[] = [];

  model.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const geometry = object.geometry.clone();
    geometries.push(geometry);
    object.geometry = geometry;
    const positions = geometry.getAttribute("position") as BufferAttribute;
    // This GLB's blade runs along Z, its bite height along X, and thickness along Y.
    geometry.computeBoundingBox();
    const thicknessCenter = geometry.boundingBox!.getCenter(new Vector3()).y;
    geometry.rotateX(Math.PI / 2);
    geometry.rotateZ(Math.PI / 2);
    geometry.translate(0, 0, -thicknessCenter);
    geometry.computeBoundingBox();
    // Group duplicated vertices (UV/normal seams and front/back faces) by blade station.
    const indices = Array.from({ length: positions.count }, (_, index) => index);
    const heights = [...new Set(indices.map((index) => Number(positions.getY(index).toFixed(5))))]
      .filter((height) => height > 0.0001);
    let upperVertices: number[] = [];
    let stations: number[] = [];
    heights.forEach((height) => {
      const candidates = indices.filter((index) => Math.abs(positions.getY(index) - height) < 0.0001);
      const allStations = [...new Set(candidates.map((index) => Number(positions.getX(index).toFixed(5))))]
        .sort((a, b) => a - b);
      for (let start = 0; start < allStations.length - 2; start++) {
        const step = allStations[start + 1] - allStations[start];
        let end = start + 2;
        while (end < allStations.length && Math.abs(allStations[end] - allStations[end - 1] - step) < 0.0001) end++;
        if (end - start > stations.length) {
          stations = allStations.slice(start, end);
          upperVertices = candidates;
        }
      }
    });
    if (stations.length < 3) return;
    const biteTop = positions.getY(upperVertices[0]);
    const step = (stations.at(-1)! - stations[0]) / (stations.length - 1);
    // Include the bevel's lower rim, not just the top row. Both rims must move
    // together or the bevel becomes a strip spanning the undeformed blade.
    const vertices = indices.flatMap((index) => {
      const restY = positions.getY(index);
      if (Math.abs(restY - biteTop) > step * 0.25) return [];
      const station = stations.findIndex((x) => Math.abs(positions.getX(index) - x) < 0.0001);
      return station < 0 ? [] : [{ index, station, restY }];
    });
    edges.push({ geometry, vertices, stations, step });
  });

  return { model, edges, geometries };
}

export function applyKeyProfile(edge: BiteEdge, levels: number[]) {
  const positions = edge.geometry.getAttribute("position") as BufferAttribute;
  edge.vertices.forEach(({ index, station, restY }) => {
    positions.setY(index, restY - (2 - levels[station]) * edge.step);
  });
  positions.needsUpdate = true;
  edge.geometry.computeVertexNormals();
  edge.geometry.computeBoundingBox();
  edge.geometry.computeBoundingSphere();
}
