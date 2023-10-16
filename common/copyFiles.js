module.exports = (yo, destination, templates, files) => {
  const copy = (path, method) => {
    method(
      yo.templatePath(path),
      yo.destinationPath(destination ? `${destination}/${path}` : path),
      yo.props
    );
  };

  templates.forEach(template =>
    copy(template, yo.fs.copyTpl.bind(yo.fs))
  );
  files.forEach(file => copy(file, yo.fs.copy.bind(yo.fs)));
}