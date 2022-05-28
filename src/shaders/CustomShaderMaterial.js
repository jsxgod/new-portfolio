import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import * as THREE from "three";

const CustomShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
    uSlowDownFactor: 1.0,
  },

  //Vertex Shader
  glsl`
    varying vec2 vUv;
    precision mediump float;
    uniform float uTime;
    uniform float uSlowDownFactor;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

    void main () {
      vUv = uv;
      vec3 pos = position;
      float noiseFreq = 1.5;
      float noiseAmp = 0.25;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime / uSlowDownFactor, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  //Fragment Shader
  glsl`
    precision mediump float;
    uniform vec3 uColor;
    varying vec2 vUv;
    uniform float uTime;
    uniform sampler2D uTexture;

    void main () {
      vec4 texture = texture2D(uTexture, vUv);
      float gray = 0.21 * texture.r + 0.71 * texture.g + 0.07 * texture.b;
      // gradient: sin(vUv.x + uTime) + uColor
      gl_FragColor = vec4(texture.rgb * 0.0 + gray, texture.a);
    }
  `
);

export default CustomShaderMaterial;
