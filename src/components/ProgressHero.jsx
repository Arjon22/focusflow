function ProgressHero({ completed, total }) {

  const percent =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (

    <div className="progress-hero">

      <div className="hero-circle">

        <h1>{percent}%</h1>

      </div>

      <h2>Today's Progress</h2>

      <p>
        {completed} of {total} tasks completed
      </p>

    </div>

  );

}

export default ProgressHero;