module.exports = (yo, destination, templates, files) => {
  const copy = (path, method) => {
    let src = Array.isArray(path) ? path[0] : path;
    let dest = Array.isArray(path) ? path[0] : path;

    if (Array.isArray(path)) {
      src = path[0];
      dest = path[1]; 
    } else {
      src = path;
      dest = destination ? `${destination}/${path}` : path
    }

    method(
      yo.templatePath(src),
      yo.destinationPath(dest),
      yo.props
    );
  };

  templates.forEach(template =>
    copy(template, yo.fs.copyTpl.bind(yo.fs))
  );
  files.forEach(file => copy(file, yo.fs.copy.bind(yo.fs)));
}