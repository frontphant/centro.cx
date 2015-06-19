jQuery.noConflict();

/* Alias for console functions */
function cl(param) {
  try {
    if (arguments.length > 1) {
      console.log(arguments);
    } else {
      console.log(param);
    }
  } catch (e) {}
}

function cd() {
  try {
    console.dir(arguments);
  } catch (e) {}
}

function cg() {
  try {
    console.group();

    for (var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }

    console.groupEnd();
  }
  catch (e) {}
}


/**
 * No conflict namespace
 * FPH - Frontphant
 * FPH.component - component classes
 * FPH.core - core classes
 * FPH.global - global parameters
 * FPH.i - instances
 */
var FPH = {
  component: {},
  core: {},
  templates: {},
  config: {},
  global: {},
  paths: {},
  i: {}
};