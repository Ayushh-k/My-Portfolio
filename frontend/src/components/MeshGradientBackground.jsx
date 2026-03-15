import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const MeshGradientBackground = ({ isDark }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ripplesRef = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Track mouse position and create ripples
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      mouseRef.current = { x, y };
      setMousePos({ x, y });

      // Create ripple at mouse position (less frequently to avoid too many)
      if (Math.random() > 0.7) {
        ripplesRef.current.push({
          x: (x - 0.5) * 100,
          y: (y - 0.5) * 100,
          startTime: timeRef.current,
          amplitude: 3,
        });
      }

      // Limit ripples array
      if (ripplesRef.current.length > 10) {
        ripplesRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(isDark ? 0x111827 : 0xffffff, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Mesh Gradient
    const geometry = new THREE.IcosahedronGeometry(50, 6);

    const colors = isDark
      ? [
          new THREE.Color(0x7c3aed), // Purple
          new THREE.Color(0x06b6d4), // Cyan
          new THREE.Color(0x3b82f6), // Blue
          new THREE.Color(0xec4899), // Pink
          new THREE.Color(0x8b5cf6), // Violet
        ]
      : [
          new THREE.Color(0xa855f7), // Purple
          new THREE.Color(0x06b6d4), // Cyan
          new THREE.Color(0x0ea5e9), // Blue
          new THREE.Color(0xec4899), // Pink
          new THREE.Color(0xc084fc), // Light purple
        ];

    const positionAttribute = geometry.getAttribute("position");
    const vertexCount = positionAttribute.count;
    const colors_array = new Float32Array(vertexCount * 3);

    for (let i = 0; i < vertexCount; i++) {
      const color = colors[i % colors.length];
      colors_array[i * 3] = color.r;
      colors_array[i * 3 + 1] = color.g;
      colors_array[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors_array, 3));

    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      flatShading: false,
      wireframe: false,
      emissive: 0x000000,
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Add Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.4);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Store initial positions for animation
    const positionArray = positionAttribute.array;
    const initialPositions = new Float32Array(positionArray);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      timeRef.current += 0.0005;

      // Remove old ripples
      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => timeRef.current - ripple.startTime < 1.5
      );

      // Animate vertices
      for (let i = 0; i < vertexCount; i++) {
        const x = initialPositions[i * 3];
        const y = initialPositions[i * 3 + 1];
        const z = initialPositions[i * 3 + 2];

        let vertexX =
          x +
          Math.sin(timeRef.current + i * 0.1) * 5 +
          Math.cos(timeRef.current * 0.5 + i * 0.05) * 3;
        let vertexY =
          y +
          Math.cos(timeRef.current + i * 0.15) * 5 +
          Math.sin(timeRef.current * 0.3 + i * 0.08) * 3;
        let vertexZ =
          z +
          Math.sin(timeRef.current * 0.7 + i * 0.1) * 3 +
          Math.cos(timeRef.current * 0.4 + i * 0.12) * 2;

        // Apply ripple effect
        for (let ripple of ripplesRef.current) {
          const dist = Math.sqrt(
            Math.pow(x - ripple.x, 2) + Math.pow(y - ripple.y, 2)
          );
          const elapsed = timeRef.current - ripple.startTime;
          const rippleRadius = elapsed * 50;
          const waveWidth = 10;

          if (
            dist < rippleRadius + waveWidth &&
            dist > rippleRadius - waveWidth
          ) {
            const waveAmount = Math.sin(
              (dist - rippleRadius) * 0.5
            ) * ripple.amplitude * (1 - elapsed * 0.8);
            vertexZ += waveAmount;
          }
        }

        positionAttribute.array[i * 3] = vertexX;
        positionAttribute.array[i * 3 + 1] = vertexY;
        positionAttribute.array[i * 3 + 2] = vertexZ;
      }
      positionAttribute.needsUpdate = true;

      // Rotate mesh
      mesh.rotation.x += 0.0002;
      mesh.rotation.y += 0.0003;
      mesh.rotation.z += 0.0001;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        background: isDark ? "#111827" : "#ffffff",
      }}
    />
  );
};

export default MeshGradientBackground;
