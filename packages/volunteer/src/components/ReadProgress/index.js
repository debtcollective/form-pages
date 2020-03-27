import React, { useEffect, useState } from "react";
import ScrollProgress from "scrollprogress";
import styles from "./styles.module.scss";

const ReadProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressObserver = new ScrollProgress((x, y) => setProgress(y * 100));

    return () => {
      progressObserver.destroy();
    };
  }, []);

  return (
    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
  );
};

export default ReadProgress;
