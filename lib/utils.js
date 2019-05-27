'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.arraysDiffer = arraysDiffer;
exports.objectsDiffer = objectsDiffer;
exports.isSame = isSame;
exports.find = find;
exports.runRules = runRules;
exports.convertValidationsToObject = convertValidationsToObject;
function arraysDiffer(a, b) {
  var isDifferent = false;
  if (a.length == 0 && b.length == 0) {
    isDifferent = true;
  } else if (a.length !== b.length) {
    isDifferent = true;
  } else {
    a.forEach(function (item, index) {
      if (!isSame(item, b[index])) {
        isDifferent = true;
      }
    });
  }
  return isDifferent;
}

function objectsDiffer(a, b) {
  var isDifferent = false;
  if (Object.keys(a).length !== Object.keys(b).length) {
    isDifferent = true;
  } else {
    Object.keys(a).forEach(function (key) {
      if (isSame(a[key], b[key])) {
        isDifferent = true;
      }
    });
  }
  return isDifferent;
}

function isSame(a, b) {
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
    return false;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return arraysDiffer(a, b);
  } else if (typeof a === 'function') {
    return a.toString() === b.toString();
  } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null && b !== null) {
    return objectsDiffer(a, b);
  }

  return a === b;
}

function find(collection, fn) {
  for (var i = 0, l = collection.length; i < l; i += 1) {
    var item = collection[i];
    if (fn(item)) {
      return item;
    }
  }
  return null;
}

function runRules(value, currentValues, validations, validationRules) {
  var results = {
    errors: [],
    failed: [],
    success: []
  };

  if (Object.keys(validations).length) {
    Object.keys(validations).forEach(function (validationMethod) {
      if (validationRules[validationMethod] && typeof validations[validationMethod] === 'function') {
        throw new Error('Formsy does not allow you to override default validations: ' + validationMethod);
      }

      if (!validationRules[validationMethod] && typeof validations[validationMethod] !== 'function') {
        throw new Error('Formsy does not have the validation rule: ' + validationMethod);
      }

      if (typeof validations[validationMethod] === 'function') {
        var validation = validations[validationMethod](currentValues, value);
        if (typeof validation === 'string') {
          results.errors.push(validation);
          results.failed.push(validationMethod);
        } else if (!validation) {
          results.failed.push(validationMethod);
        }
        return;
      } else if (typeof validations[validationMethod] !== 'function') {
        var _validation = validationRules[validationMethod](currentValues, value, validations[validationMethod]);

        if (typeof _validation === 'string') {
          results.errors.push(_validation);
          results.failed.push(validationMethod);
        } else if (!_validation) {
          results.failed.push(validationMethod);
        } else {
          results.success.push(validationMethod);
        }
        return;
      }

      results.success.push(validationMethod);
    });
  }

  return results;
}

function convertValidationsToObject(validations) {
  if (typeof validations === 'string') {
    return validations.split(/,(?![^{[]*[}\]])/g).reduce(function (validationsAccumulator, validation) {
      var args = validation.split(':');
      var validateMethod = args.shift();

      args = args.map(function (arg) {
        try {
          return JSON.parse(arg);
        } catch (e) {
          return arg; // It is a string if it can not parse it
        }
      });

      if (args.length > 1) {
        throw new Error('Formsy does not support multiple args on string validations. Use object format of validations instead.');
      }

      // Avoid parameter reassignment
      var validationsAccumulatorCopy = Object.assign({}, validationsAccumulator);
      validationsAccumulatorCopy[validateMethod] = args.length ? args[0] : true;
      return validationsAccumulatorCopy;
    }, {});
  }

  return validations || {};
}