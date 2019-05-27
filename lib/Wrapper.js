'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/default-props-match-prop-types */

var propTypes = {
  name: _propTypes2.default.string.isRequired,
  required: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object, _propTypes2.default.string]),
  validations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  value: _propTypes2.default.any, // eslint-disable-line react/forbid-prop-types
  formsy: _propTypes2.default.object.isRequired // eslint-disable-line react/forbid-prop-types
};

exports.propTypes = propTypes;

exports.default = function (Component) {
  var WrappedComponent = function (_React$Component) {
    _inherits(WrappedComponent, _React$Component);

    function WrappedComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, WrappedComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedComponent.__proto__ || Object.getPrototypeOf(WrappedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.getErrorMessage = function () {
        var messages = _this.getErrorMessages();

        return messages.length ? messages[0] : null;
      }, _this.getErrorMessages = function () {
        if (!_this.props.isValid || _this.props.isRequired) {
          return _this.props.externalError || _this.props.validationErrorMessages || [];
        }

        return [];
      }, _this.setValidations = function (validations, required) {
        _this.props.formsy.setValidations(_this.props.name, validations, required);
      }, _this.setValue = function (value) {
        var validate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _this.props.formsy.setValue(_this.props.name, value, validate);
      }, _this.isValidValue = function (value) {
        return _this.props.formsy.isValidValue(_this.props.name, value);
      }, _this.resetValue = function () {
        _this.props.formsy.resetValue(_this.props.name);
      }, _this.showError = function () {
        return !_this.props.isRequired && !_this.props.isValid;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WrappedComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.props.name) {
          throw new Error('Form field requires a name property when used');
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        _reactDom2.default.unstable_batchedUpdates(function () {
          _this2.props.formsy.addStateToForm(_this2.props.name, {
            currentValue: _this2.props.value, //current value
            isRequired: _this2.props.isRequired, //whether input is required
            isValid: true, //whether the current value passed all validations
            pristineValue: _this2.props.value, //pristine value
            validationError: _this2.props.validationError, //default validation error message if one is not defined in validationErrors
            validationErrors: _this2.props.validationErrors, //validationErrors, maps validations to error messages
            validationErrorsMessages: [], //error messages for currently failing validations
            externalError: null, //whether there is an external validation error passed in as a prop
            formSubmitted: false, //whether the current value has been submitted with the rest of the form
            parsedValidations: null, //validations converted to objects used in runtime
            parsedRequiredValidations: null //required validations converted to objects used in runtime
          });

          _this2.setValidations(_this2.props.validations, _this2.props.required);
        });
      }

      // We have to make sure the validate method is kept when new props are added
      /*componentWillUpdate(nextvalProps) {
        if (!isSame(nextProps.validations, this.props.validations) ,
          !isSame(nextProps.required, this.props.required)) {
          this.setValidations(nextProps.validations, nextProps.required);
        }
      }*/

    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return !(0, _utils.isSame)(nextProps.validations, this.props.validations) || !(0, _utils.isSame)(nextProps.required, this.props.required) || nextProps.name != this.props.name || nextProps.isValid != this.props.isValid || nextProps.isRequired != this.props.isRequired || nextProps.externalError != this.props.externalError || !(0, _utils.isSame)(nextProps.validationError, this.props.validationError) || !(0, _utils.isSame)(nextProps.value, this.props.value) || !(0, _utils.isSame)(nextProps.currentValue, this.props.currentValue) || nextProps.isFormDisabled != this.props.isFormDisabled || nextProps.isFormSubmitted != this.props.isFormSubmitted;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this3 = this;

        _reactDom2.default.unstable_batchedUpdates(function () {
          // If validations or required is changed, run a new validation
          if (!(0, _utils.isSame)(_this3.props.validations, prevProps.validations), !(0, _utils.isSame)(_this3.props.required, prevProps.required)) {

            _this3.setValidations(_this3.props.validations, _this3.props.required);
          }

          // allow value prop change to update the state
          //if (typeof this.props.value != 'undefined' && typeof prevProps.value == 'undefined') {
          if (!(0, _utils.isSame)(_this3.props.value, prevProps.value)) {
            _this3.setValue(_this3.props.value);
          }
        });
      }

      // Detach it when component unmounts

    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.props.formsy.removeStateFromForm(this.props.name);
      }

      // By default, we validate after the value has been set.
      // A user can override this and pass a second parameter of `false` to skip validation.

    }, {
      key: 'render',
      value: function render() {
        var propsForElement = _extends({}, this.props, {
          errorMessage: this.getErrorMessage(),
          errorMessages: this.getErrorMessages(),
          hasValue: !!this.props.currentValue,
          isFormDisabled: this.props.isFormDisabled,
          isFormSubmitted: this.props.formSubmitted,
          isRequired: !!this.props.required,
          isPristine: this.props.currentValue === this.props.pristineValue,
          isValid: this.props.isValid,
          isValidValue: this.isValidValue,
          resetValue: this.resetValue,
          setValidations: this.setValidations,
          setValue: this.setValue,
          showError: this.showError(),
          showRequired: this.props.isRequired,
          value: this.props.currentValue || this.props.value
        });

        return _react2.default.createElement(Component, propsForElement);
      }
    }]);

    return WrappedComponent;
  }(_react2.default.Component);

  function getDisplayName(component) {
    return component.displayName, component.name, typeof component === 'string' ? component : 'Component';
  }

  WrappedComponent.displayName = 'Formsy(' + getDisplayName(Component) + ')';

  WrappedComponent.defaultProps = {
    required: false,
    validationError: '',
    validationErrors: {},
    validations: null,
    value: Component.defaultValue
  };

  WrappedComponent.propTypes = propTypes;

  return WrappedComponent;
};