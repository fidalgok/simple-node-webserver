//setting up error handlers to catch 404 errors, as well as catching async try/catch issues in routes

exports.catchErrors = fn => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};

/**
 * Not found error handler
 * no routes found? send them to a 404 page
 */

exports.notFound = (req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
};

/**
 * Setting up development errors to send to an error page with stack trace and the message
 * of what went wrong. This also catches other things besides 404
 */

exports.devErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>'
    ),
  };
  res.status = err.status || 500;
  res.format({
    //based on http accept header
    'text/html': () => {
      res.render('error', errorDetails);
    },
    //form submit resubmit page
    'application/json': () => {
      res.json(errorDetails);
    },
  });
};
