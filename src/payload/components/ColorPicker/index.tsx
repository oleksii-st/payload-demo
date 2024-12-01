'use client';

import { useField, TextInput } from '@payloadcms/ui';

const ColorPicker = ({ field: { label }, path }: { field: { label: string }; path: string }) => {
  const { value, setValue } = useField<string>({ path });

  return (
    <div>
      <label>
        {label} <span className="required">*</span>
      </label>
      <div>
        <TextInput
          label=""
          path={path}
          onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
