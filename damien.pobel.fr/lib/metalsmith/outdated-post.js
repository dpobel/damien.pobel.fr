const outdatedLimitYear = 5;

export default function outdatedPostPlugin() {
  return (files, _metalsmith, done) => {
    Object.keys(files).forEach((fileKey) => {
      const file = files[fileKey];
      if (file.type !== "post") {
        return;
      }
      const latestChangeDate = file.updated || file.published;
      // evergreen means post I try to keep up to date.
      file.isOutdated = file.evergreen
        ? false
        : Math.abs(latestChangeDate.diff(new Date(), "years")) >=
          outdatedLimitYear;
    });
    done();
  };
}
