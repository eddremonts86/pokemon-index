export const getParmFromUrl = (url, parm) => {
  var re = new RegExp(".*[?&]" + parm + "=([^&]+)(&|$)");
  var match = url.match(re);
  return match ? match[1] : "";
};
