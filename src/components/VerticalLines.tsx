import React from "react";

const VerticalLines = () => {
    return (
        <div className="vertical-lines vertical-lines--white absolute inset-0 z-[10] pointer-events-none">
            {/* 
          Positioned based on the reference:
          Likely 3 lines distributing the screen or marking sections.
          Using the percentages from the original Grid lines in Hero.tsx as a baseline, 
          but the user mentioned "VerticalLines" specifically.
          The user prompt mentions 3 ".vertical-lines__line" elements.
       */}
            <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/20" />
            <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/20" />
            <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-white/20" />
        </div>
    );
};

export default VerticalLines;
