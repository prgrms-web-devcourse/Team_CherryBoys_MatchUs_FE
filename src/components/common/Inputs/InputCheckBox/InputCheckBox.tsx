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
  unCheckedBoxContainerWidth?: string;
  unCheckedBoxWidth?: string;
  unCheckedBoxHeight?: string;
  unCheckedBoxMargin?: string;
  unCheckedBoxFontColor?: string;
  unCheckedBoxBackgroundColor?: string;
  unCheckedBoxBorderRadius?: string;
  unCheckedBoxBorder?: string;
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
  unCheckedBoxContainerWidth: '100%',
  unCheckedBoxWidth: '100%',
  unCheckedBoxHeight: '100%',
  cunCheckedBoxMargin: '0',
  unCheckedBoxFontColor: '#000',
  unCheckedBoxBackgroundColor: '#fff',
  unCheckedBoxBorderRadius: '0',
  unCheckedBoxBorder: 'none',
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
    unCheckedBoxContainerWidth,
    unCheckedBoxWidth,
    unCheckedBoxHeight,
    unCheckedBoxMargin,
    unCheckedBoxFontColor,
    unCheckedBoxBackgroundColor,
    unCheckedBoxBorderRadius,
    unCheckedBoxBorder,
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
      <div className={classNames(inputContent)} style={{ width: unCheckedBoxContainerWidth }}>
        {Object.keys(options).map((option, index) => (
          <div
            className={classNames(inputCheckBox)}
            key={`dropBoxOption${index}`}
            style={{
              width: unCheckedBoxWidth,
              height: unCheckedBoxHeight,
              margin: unCheckedBoxMargin,
              color: options[option] ? checkedBoxFontColor : unCheckedBoxFontColor,
              background: options[option] ? checkedBoxBackgroundColor : unCheckedBoxBackgroundColor,
              borderRadius: unCheckedBoxBorderRadius,
              border: options[option] ? checkedBoxBorder : unCheckedBoxBorder,
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
                  color: options[option] ? checkedBoxFontColor : unCheckedBoxFontColor,
                  background: options[option]
                    ? checkedBoxBackgroundColor
                    : unCheckedBoxBackgroundColor,
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
