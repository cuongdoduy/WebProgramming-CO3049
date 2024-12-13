import React from "react";

const PriceSlider = () => {
  const [min, setMin] = React.useState(100);
  const [max, setMax] = React.useState(1500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(Number((e.target as HTMLInputElement).value));
  };

  const handleChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMax(Number(e.target.value));
  };

  return (
    <div className="relative mb-6">
      <label htmlFor="labels-range-input" className="sr-only">
        Labels range
      </label>
      <input
        id="labels-range-input"
        type="range"
        value={min}
        min="100"
        max="1500"
        onChange={(e) => handleChange(e)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
        $100
      </span>
      <span className="text-sm text-primary absolute start-[40%] -bottom-6 font-bold">
        ${(max-min)/2}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
        $1500
      </span>
    </div>
  );
};

export default PriceSlider;
