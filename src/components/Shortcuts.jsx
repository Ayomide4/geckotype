import React, { useState } from "react";

export const Shortcuts = ({ isFocused }) => {
  return (
    <div className={isFocused ? "shortcuts-unfocused" : "shortcuts"}>
      <div className="restart-shortcut">
        <p>
          <span>Shift</span> + <span>Enter</span> - Restart
        </p>
      </div>
    </div>
  );
};
