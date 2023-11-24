import { CiClock1 } from "react-icons/ci";
import { FaFont, FaQuoteLeft, FaAt, FaHashtag } from "react-icons/fa";
export default function ModeSelect({ isFocused }) {
  return (
    <div className={isFocused ? "mode-select-focused" : "mode-select"}>
      <div className="mode-container">
        <div className="mode-options ">
          <div className="mode-item">
            <FaAt size={14} className="at" />
            <p>Punctuation</p>
          </div>
          <div className="mode-item">
            <FaHashtag size={14} />
            <p>Numbers</p>
          </div>
        </div>
        <div className="spacer"></div>

        <div className="mode-item">
          <CiClock1 size={14} />
          <p>Time</p>
        </div>
        <div className="mode-item">
          <FaFont size={14} />
          <p>Words</p>
        </div>
        <div className="mode-item">
          <FaQuoteLeft size={14} />
          <p>Quotes</p>
        </div>
        <div className="spacer"></div>
        <div className="mode-options ">
          <div className="mode-item">
            <p>10</p>
          </div>
          <div className="mode-item">
            <p>25</p>
          </div>
          <div className="mode-item">
            <p>50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
