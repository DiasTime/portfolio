"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Pre-tokenized source so syntax color survives progressive typing.
const TOKENS: { text: string; cls?: string }[] = [
  { text: "async function ", cls: "tk-kw" },
  { text: "grade", cls: "tk-fn" },
  { text: "(submission) {\n  " },
  { text: "const ", cls: "tk-kw" },
  { text: "tests = " },
  { text: "loadTests", cls: "tk-fn" },
  { text: "(submission.task);\n  " },
  { text: "const ", cls: "tk-kw" },
  { text: "result = " },
  { text: "await run", cls: "tk-fn" },
  { text: "(submission.code, tests);\n  " },
  { text: "return ", cls: "tk-kw" },
  { text: "feedback", cls: "tk-fn" },
  { text: "(result); " },
  { text: "// instant, no instructor", cls: "tk-cmt" },
  { text: "\n}" },
];
const FULL_LEN = TOKENS.reduce((n, t) => n + t.text.length, 0);

const TESTS = [
  "✓ scores passing submissions",
  "✓ flags failing edge cases",
  "✓ feedback returned in 380ms",
];

export default function CodeSim() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [typed, setTyped] = useState(0);
  const [tests, setTests] = useState(0);
  const [cert, setCert] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let typedN = 0;
    let testsN = 0;
    let timer: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>;

    const type = () => {
      timer = setInterval(() => {
        typedN += 3;
        setTyped(typedN);
        if (typedN >= FULL_LEN) {
          clearInterval(timer as ReturnType<typeof setInterval>);
          timer = setTimeout(runTests, 500);
        }
      }, 30);
    };
    const runTests = () => {
      timer = setInterval(() => {
        testsN++;
        setTests(testsN);
        if (testsN >= TESTS.length) {
          clearInterval(timer as ReturnType<typeof setInterval>);
          timer = setTimeout(() => {
            setCert(true);
            timer = setTimeout(reset, 2600);
          }, 450);
        }
      }, 480);
    };
    const reset = () => {
      typedN = 0;
      testsN = 0;
      setTyped(0);
      setTests(0);
      setCert(false);
      type();
    };

    type();
    return () => { clearInterval(timer as ReturnType<typeof setInterval>); clearTimeout(timer as ReturnType<typeof setTimeout>); };
  }, [inView]);

  // Render tokens up to the typed character budget.
  let budget = typed;
  const visible = TOKENS.map((t, i) => {
    if (budget <= 0) return null;
    const take = Math.min(budget, t.text.length);
    budget -= take;
    return (
      <span key={i} className={t.cls}>
        {t.text.slice(0, take)}
      </span>
    );
  });

  return (
    <div className="win sim" ref={ref}>
      <div className="win-head">
        <span className="win-dots" aria-hidden><i /><i /><i /></span>
        <span className="win-title">learnloop — grade.ts · auto-assessment</span>
        <span className="win-tag">SIMULATION</span>
      </div>
      <div className="win-body sim-code">
        <pre className="code-pre">
          {visible}
          <span className="code-caret">▌</span>
        </pre>
        <div className="test-pane">
          <div className="test-head">{typed >= FULL_LEN ? "$ run tests" : "$ waiting for code…"}</div>
          {TESTS.slice(0, tests).map((t) => (
            <motion.div
              className="testline"
              key={t}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {t}
            </motion.div>
          ))}
          {cert && (
            <motion.div
              className="cert-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ◆ CERTIFICATE ISSUED — MODULE 04 · zero instructor hours
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
