import React, { useState } from "react";
import "./SneakerSizeCalculator.scss";

const SneakerSizeCalculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("bata");
  const [output, setOutput] = useState({
    bata: "",
    europe: "",
    uk: "",
  });
  const [show, setShow] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setInputType(e.target.value);
  };


  const convertSize = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      alert("Please enter a valid number.");
      return;
    }

    let bata, inches, cm, europe, uk;
    switch (inputType) {
      case "bata":
        bata = value;
        if (value === 5) {
          europe = 38;
          uk = 5;
        } else if (value === 6) {
          europe = "39 or 40";
          uk = 6;
        } else if (value === 7) {
          europe = "41"
          uk = 7;
        } else if (value === 8) {
          europe = "42"
          uk = 8;
        } else if (value === 9) {
          europe = "43"
          uk = 9;
        } else if (value === 10) {
          europe = "44"
          uk = 10;
        } else if (value === 11) {
          europe = "45"
          uk = 11;
        }
        break;
      case "inches":
        inches = value;
        if (inches < 10) {
          alert("Size is too small.");
          return;
        } else if (inches > 12) {
          alert("Size is too large.");
          return;
        } else if (inches >= 10 && inches <= 10.125) {
          bata = 5
        } else if (inches >= 10.125 && inches <= 10.25) {
          bata = 6
        } else if (inches >= 10.25 && inches <= 11) {
          bata = 7
        } else if (inches >= 11 && inches <= 11.25) {
          bata = 8
        } else if (inches >= 11.25 && inches <= 11.7) {
          bata = 9
        } else if (inches >= 11.7 && inches <= 12) {
          bata = 10
        } else if (inches === 12) {
          bata = 11
        }
        
        if (bata === 5) {
          europe = "38";
        } else if (bata === 6) {
          europe = "39 or 40";
        } else if (bata >= 7) {
          europe = bata + 34;
        }
        uk = bata;
                
        break;
      case "cm":
        cm = value;
        if (cm < 24) {
          alert("Size is too small.");
          return;
        } else if (cm > 29) {
          alert("Size is too large.");
          return;
        } else if (cm >= 24 && cm <= 24.5) {
          bata = 5
        } else if (cm >= 24.6 && cm <= 25.1) {
          bata = 6
        } else if (cm >= 25.2 && cm <= 25.7) {
          bata = 7
        } else if (cm >= 25.8 && cm <= 26.3) {
          bata = 8
        } else if (cm >= 26.4 && cm <= 26.9) {
          bata = 9
        } else if (cm >= 27 && cm <= 27.5) {
          bata = 10
        } else if (cm >= 27.6 && cm <= 28.1) {
          bata = 11
        } else if (cm >= 28.2 && cm <= 29) {
          bata = 11
        }

        if (bata === 5) {
          europe = "38";
        } else if (bata === 6) {
          europe = "39 or 40";
        } else if (bata >= 7) {
          europe = bata + 34;
        }
        uk = bata;
        break;
      default:
        alert("Please select a valid input type.");
        return;
    }

    setOutput({ bata,europe, uk });
    setShow(true);
  };

  return (
    <div className="sneaker-size-calculator">
      <h2>Sneaker Size Calculator</h2>
      <select value={inputType} onChange={handleSelectChange}>
        <option value="bata">Bata Size</option>
        <option value="inches">Inches</option>
        <option value="cm">CM</option>
      </select>
      <input
        type="text"
        placeholder={`Enter size (${inputType})`}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={convertSize}>Convert</button>
      {show &&  (
        <div className="output">
          <p>
            <strong>Bata Size:</strong> {output.bata}
          </p>
          <p>
            <strong>Europe:</strong> {output.europe}
          </p>
          <p>
            <strong>UK:</strong> {output.uk}
          </p>
        </div>
      )}
    </div>
  );
};

export default SneakerSizeCalculator;
