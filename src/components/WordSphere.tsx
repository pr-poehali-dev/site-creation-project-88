import { useEffect, useRef } from "react";

const WORDS = [
  "SEO", "CRM", "SMM", "content-market", "QA Engineer",
  "Data Analyst", "Unity-разработчик", "Designer",
  "IT Support Engineer", "Digital-PR", "producer",
  "Mobile Production", "Media Production",
];

const CYAN = "#00F5FF";

interface Point {
  x: number; y: number; z: number;
  word: string;
  phi: number; theta: number;
  vPhi: number; vTheta: number;
}

export default function WordSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef(0);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    /* distribute words on sphere surface (Fibonacci lattice) */
    const n = WORDS.length;
    pointsRef.current = WORDS.map((word, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        word, phi, theta,
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        vPhi: (Math.random() - 0.5) * 0.0003,
        vTheta: (Math.random() - 0.5) * 0.0003,
      };
    });

    const SPEED = 0.0035;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.36;

      ctx.clearRect(0, 0, w, h);

      /* auto-rotate */
      if (!mouseRef.current.active) {
        rotRef.current.y += SPEED;
        rotRef.current.x += SPEED * 0.35;
      }

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;

      /* rotation matrices */
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      type Projected = { x: number; y: number; z: number; word: string; scale: number };
      const projected: Projected[] = pointsRef.current.map((p) => {
        /* rotate around Y */
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        /* rotate around X */
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const perspective = 2.2 / (2.2 - z2 * 0.6);
        const scale = (z2 + 1) / 2; /* 0 (back) → 1 (front) */

        return {
          x: cx + x1 * radius * perspective,
          y: cy + y2 * radius * perspective,
          z: z2,
          word: p.word,
          scale,
        };
      });

      /* sort back-to-front */
      projected.sort((a, b) => a.z - b.z);

      /* draw connecting lines (subtle) */
      projected.forEach((a, i) => {
        projected.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < radius * 0.72) {
            const avgZ = (a.scale + b.scale) / 2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,245,255,${avgZ * 0.055})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      /* draw sphere wireframe circles */
      const drawCircle = (opacity: number, tilt: number) => {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.04) {
          const sx = Math.cos(a) * radius * 0.98;
          const sy = Math.sin(a) * Math.cos(tilt) * radius * 0.98;
          const sz = Math.sin(a) * Math.sin(tilt);
          const x1 = sx * cosY - sz * sinY;
          const z1 = sx * sinY + sz * cosY;
          const y2 = sy * cosX - z1 * sinX;
          const perspective = 2.2 / (2.2 - (sy * sinX + z1 * cosX) * 0.6);
          const px = cx + x1 * perspective;
          const py = cy + y2 * perspective;
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(0,245,255,${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      };

      drawCircle(0.04, 0);
      drawCircle(0.04, Math.PI / 2);
      drawCircle(0.03, Math.PI / 4);
      drawCircle(0.03, -Math.PI / 4);

      /* draw words */
      projected.forEach(({ x, y, scale, word }) => {
        const alpha = Math.max(0.08, scale);
        const fontSize = Math.round(10 + scale * 7);
        const isFront = scale > 0.7;

        ctx.font = `${isFront ? 600 : 400} ${fontSize}px 'Space Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (isFront) {
          ctx.shadowColor = CYAN;
          ctx.shadowBlur = 12 * scale;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = isFront
          ? `rgba(0,245,255,${alpha})`
          : `rgba(176,232,236,${alpha * 0.6})`;
        ctx.fillText(word, x, y);
        ctx.shadowBlur = 0;
      });

      /* center glow */
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.45);
      grad.addColorStop(0, "rgba(0,245,255,0.04)");
      grad.addColorStop(1, "rgba(0,245,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    /* mouse drag */
    const onMove = (e: MouseEvent) => {
      if (!mouseRef.current.active) return;
      rotRef.current.y += e.movementX * 0.005;
      rotRef.current.x += e.movementY * 0.005;
    };
    const onDown = () => { mouseRef.current.active = true; };
    const onUp = () => { mouseRef.current.active = false; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        display: "block",
      }}
    />
  );
}