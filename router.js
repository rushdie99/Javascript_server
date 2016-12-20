function route(handle, pathname,response,request) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response,request);
    
  } else {
     return "404 not found";
  }
}

exports.route = route;