// 解析 GLB 檔案，列出所有 Mesh 和 Node 的名稱
import { readFileSync } from 'fs';
const FILE = process.argv[2] || 'models/skeleton.glb';

const buf = readFileSync(FILE);
console.log(`\nChecking: ${FILE}`);

// GLB Header
const magic = buf.toString('ascii', 0, 4);
if (magic !== 'glTF') { console.error('Not a valid GLB file!'); process.exit(1); }

const version = buf.readUInt32LE(4);
const totalLength = buf.readUInt32LE(8);
console.log(`GLB Version: ${version}, Total size: ${totalLength} bytes`);

// JSON Chunk (starts at byte 12)
const jsonChunkLength = buf.readUInt32LE(12);
const jsonData = buf.toString('utf8', 20, 20 + jsonChunkLength);
const gltf = JSON.parse(jsonData);

// 列出所有 Mesh 名稱
console.log('\n=== MESHES ===');
if (gltf.meshes) {
  gltf.meshes.forEach((m, i) => {
    console.log(`[${i}] ${m.name || '(unnamed)'}`);
  });
} else {
  console.log('No meshes found.');
}

// 列出所有 Node 名稱
console.log('\n=== NODES (ALL) ===');
if (gltf.nodes) {
  gltf.nodes.forEach((n, i) => {
    const meshIdx = n.mesh !== undefined ? ` -> mesh[${n.mesh}]` : '';
    console.log(`[${i}] ${n.name || '(unnamed)'}${meshIdx}`);
  });
}

console.log(`\nTotal: ${(gltf.meshes || []).length} meshes, ${(gltf.nodes || []).length} nodes`);
