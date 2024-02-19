import { useEffect, useState } from 'react';
import {
  SketchPicker,
  SketchPickerProps,
} from 'react-color';

export type ColorPickerProps = {
  onChange?: (value: string) => void;
  color?: string;
  placement?:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
};

export const ColorPicker = ({
  color,
  onChange,
  placement = 'topLeft',
}: ColorPickerProps) => {
  const [visible, setVisible] = useState(false);
  const [pickerColor, setPickerColor] = useState(color);
  const [boxColor, setBoxColor] = useState(color);

  useEffect(() => {
    setBoxColor(color);
    setPickerColor(color);
  }, [color]);

  const onPickerDropdown = () => {
    setVisible(!visible);
  };

  const onColorChange: SketchPickerProps['onChange'] = (
    value
  ) => {
    const { rgb, hex } = value;
    const rgba = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    setBoxColor(rgba);
    setPickerColor(hex);
    onChange?.(hex);
  };

  const getPlacement = () => {
    switch (placement) {
      case 'topLeft':
        return {
          left: -150,
          top: -315,
        };
      case 'topRight':
        return {
          right: -150,
          top: -315,
        };
      case 'bottomLeft':
        return {
          left: -150,
          bottom: -315,
        };
      case 'bottomRight':
        return {
          right: -150,
          bottom: -315,
        };
      default:
        return {
          left: -150,
          top: -315,
        };
    }
  };

  return (
    <div className="color-picker">
      <div className="color-picker-dropdown">
        <div
          className="color"
          style={{
            backgroundColor: boxColor
              ? boxColor
              : '#ffffff',
          }}
          onClick={onPickerDropdown}
        />
      </div>
      {visible && (
        <>
          <div
            className="color-picker-backdrop"
            onClick={onPickerDropdown}
          />
          <SketchPicker
            color={pickerColor}
            onChange={onColorChange}
            styles={{
              default: {
                picker: getPlacement(),
              },
            }}
          />
        </>
      )}
    </div>
  );
};
