import React from 'react';
import classNames from 'classnames';
import styles from './InputCheckBox.module.scss';

interface Options {
  [key: string]: boolean;
}

interface StyleProps {
  [inputBoxWidth: string]: string | undefined;
  inputNameWidth?: string;
  inputNameFontColor?: string;
  checkBoxContainerWidth?: string;
  checkBoxWidth?: string;
  checkBoxHeight?: string;
  checkBoxMargin?: string;
  checkBoxFontColor?: string;
  checkBoxBackgroundColor?: string;
  checkBoxBorderRadius?: string;
  checkBoxBorder?: string;
  checkedBoxFontColor?: string;
  checkedBoxBackgroundColor?: string;
  checkedBoxBorder?: string;
}

interface Props {
  labelName?: string;
  options: Options;
  icon?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  styleProps?: StyleProps;
}

const { inputBox, inputName, inputContent, inputCheckBox, label, checkBox, checkBoxIcon } = styles;

const styleFormat: StyleProps = {
  inputBoxWidth: '100%',
  inputNameWidth: '100%',
  inputNameFontColor: '#000',
  checkBoxContainerWidth: '100%',
  checkBoxWidth: '100%',
  checkBoxHeight: '100%',
  checkBoxMargin: '0',
  checkBoxFontColor: '#000',
  checkBoxBackgroundColor: '#fff',
  checkBoxBorderRadius: '0',
  checkBoxBorder: 'none',
  checkedBoxFontColor: '#fff',
  checkedBoxBackgroundColor: '#56ad79',
  checkedBoxBorder: 'none',
};

const InputCheckBox = ({ labelName, options, icon, onChange, styleProps }: Props) => {
  const defaultStyle = { ...styleFormat };

  if (styleProps) {
    Object.keys(styleProps).forEach((key) => {
      defaultStyle[key] = styleProps[key];
    });
  }

  const {
    inputBoxWidth,
    inputNameWidth,
    inputNameFontColor,
    checkBoxContainerWidth,
    checkBoxWidth,
    checkBoxHeight,
    checkBoxMargin,
    checkBoxFontColor,
    checkBoxBackgroundColor,
    checkBoxBorderRadius,
    checkBoxBorder,
    checkedBoxFontColor,
    checkedBoxBackgroundColor,
    checkedBoxBorder,
  } = defaultStyle;

  return (
    <div className={classNames(inputBox)} style={{ width: inputBoxWidth }}>
      {labelName && (
        <div
          className={classNames(inputName)}
          style={{ width: inputNameWidth, color: inputNameFontColor }}
        >
          <h3>{labelName}</h3>
        </div>
      )}
      <div className={classNames(inputContent)} style={{ width: checkBoxContainerWidth }}>
        {Object.keys(options).map((option, index) => (
          <div
            className={classNames(inputCheckBox)}
            key={`dropBoxOption${index}`}
            style={{
              width: checkBoxWidth,
              height: checkBoxHeight,
              margin: checkBoxMargin,
              color: options[option] ? checkedBoxFontColor : checkBoxFontColor,
              background: options[option] ? checkedBoxBackgroundColor : checkBoxBackgroundColor,
              borderRadius: checkBoxBorderRadius,
              border: options[option] ? checkedBoxBorder : checkBoxBorder,
            }}
          >
            <label className={classNames(label)} htmlFor={`checkBox${option}`}>
              {option}
            </label>
            <input
              className={classNames(checkBox)}
              type="checkbox"
              value={option}
              id={`checkBox${option}`}
              onChange={onChange}
            />
            {icon && (
              <i
                className={classNames(icon, checkBoxIcon)}
                style={{
                  color: options[option] ? checkedBoxFontColor : checkBoxFontColor,
                  background: options[option] ? checkedBoxBackgroundColor : checkBoxBackgroundColor,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputCheckBox;
