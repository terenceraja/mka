///////////////////////////////////////////////////////////////////////////////////////////////////

/////////           FORMATTING DATA FROM SERVER               /////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

import { DateTime } from "luxon";

// DATE FORMATING
export const formatISO = (arr, col1, col2) => {
  if (col1 && col2) {
    return arr.map((obj) => {
      const luxonDateOPE = obj[col1] ? DateTime.fromISO(obj[col1]) : null;
      const luxonDateValeur = obj[col2] ? DateTime.fromISO(obj[col2]) : null;

      return {
        ...obj,
        [col1]: luxonDateOPE ? luxonDateOPE.toFormat("dd/MM/yyyy") : null,
        [col2]: luxonDateValeur ? luxonDateValeur.toFormat("dd/MM/yyyy") : null,
      };
    });
  } else {
    return arr.map((obj) => {
      const luxonDateOPE = obj[col1] ? DateTime.fromISO(obj[col1]) : null;

      return {
        ...obj,
        [col1]: luxonDateOPE ? luxonDateOPE.toFormat("dd/MM/yyyy") : null,
      };
    });
  }
};

// CALCULATE +/- VALUE TABLE LIGNEPTF
export const PCTValCalc = (arr) =>
  arr.map((obj) => {
    // Extract the necessary values from the object
    const MktCOTDevLIGN = parseFloat(obj.MktCOTDevLIGN_lsn);
    const PMA = parseFloat(obj.PMA_lsn);

    // Calculate the "Value" based on the provided formula
    const Value = (MktCOTDevLIGN / PMA - 1) * 100;

    // Create a new object with the existing properties and the new "Value" property
    return {
      ...obj,
      Value: isNaN(Value) ? null : Value.toFixed(2), // Handle potential NaN values and round to 2 decimal places
    };
  });

// CACULATE % TABLES LIGNEPTF
export const PCTCalc = (arr, totMV) =>
  arr.map((obj) => {
    const MVAaiJCptaDevPTF_lsn = parseFloat(obj.MVAaiJCptaDevPTF_lsn) || 0;
    const PCT = ((MVAaiJCptaDevPTF_lsn / totMV) * 100).toFixed(2);

    return {
      ...obj,
      PCT: isNaN(PCT) ? null : PCT,
    };
  });

export function getUniqueLanguesWithSum(arrayOfObjects, mvPtf) {
  if (typeof mvPtf === "string") {
    mvPtf = parseFloat(mvPtf);
  }
  let uniqueLangues = [];
  let adjustedSumByLangueArray = [];

  arrayOfObjects.forEach((obj) => {
    if (obj.LangueNomLocalAlloc_lmt) {
      const langue = obj.LangueNomLocalAlloc_lmt;

      // Check if the language is not already in the uniqueLangues array
      if (!uniqueLangues.includes(langue)) {
        uniqueLangues.push(langue);
        adjustedSumByLangueArray.push(
          (parseFloat(obj.MVAaiJCptaDevCLI_lsn) / mvPtf) * 100
        );
      } else {
        // Update the adjusted sum for the current language
        const index = uniqueLangues.findIndex((item) => item === langue);
        adjustedSumByLangueArray[index] +=
          (parseFloat(obj.MVAaiJCptaDevCLI_lsn) / mvPtf) * 100;
      }
    }
  });

  // Return an object with uniqueLangues array and adjustedSumByLangue array
  return { uniqueLangues, adjustedSumByLangue: adjustedSumByLangueArray };
}

export function getUniqueDevWithSum(arrayOfObjects, mvPtf) {
  if (typeof mvPtf === "string") {
    mvPtf = parseFloat(mvPtf);
  }
  let uniqueLangues = [];
  let adjustedSumByLangueArray = [];

  arrayOfObjects.forEach((obj) => {
    if (obj.CurrISOCode_lxt) {
      const langue = obj.CurrISOCode_lxt;

      // Check if the language is not already in the uniqueLangues array
      if (!uniqueLangues.includes(langue)) {
        uniqueLangues.push(langue);
        adjustedSumByLangueArray.push(
          (parseFloat(obj.MVAaiJCptaDevCLI_lsn) / mvPtf) * 100
        );
      } else {
        // Update the adjusted sum for the current language
        const index = uniqueLangues.findIndex((item) => item === langue);
        adjustedSumByLangueArray[index] +=
          (parseFloat(obj.MVAaiJCptaDevCLI_lsn) / mvPtf) * 100;
      }
    }
  });

  // Return an object with uniqueLangues array and adjustedSumByLangue array
  return { uniqueLangues, adjustedSumByLangue: adjustedSumByLangueArray };
}

export function YTDTimes100(array) {
  // Iterate through each object in the array
  array.forEach(function (obj) {
    // Check if the property exists
    if (obj.PCTPlusValKpYtoDDevLIGNDebutAnnee_lcn) {
      // Convert the property value to a number (if it's a valid number)
      let numericValue = parseFloat(obj.PCTPlusValKpYtoDDevLIGNDebutAnnee_lcn);

      // Check if the conversion was successful and it's a valid number
      if (!isNaN(numericValue)) {
        // Multiply the numeric value by 100
        obj.PCTPlusValKpYtoDDevLIGNDebutAnnee_lcn = numericValue * 100;
      }
    }
  });
  return array;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////

/////////           AG GRID FORMATING              ///////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

//FORMAT MARKET VALUE COLOUMN PAGE PTF
export const formatMarketValue = (value) => {
  const floatValue = parseFloat(value);
  if (!isNaN(floatValue)) {
    const roundedValue = floatValue.toFixed(2);

    // Replace comma with space for thousands separator and replace dot with comma for decimal separator
    const formattedValue = roundedValue
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      .replace(".", ",");
    return formattedValue;
  } else {
    return value;
  }
};

// FORMAT QUANTITE COLUMN PAGE DETPTF
export const formatSpacingAndDecimalNumbers = (value, decimalPlaces = 2) => {
  const floatValue = parseFloat(value);
  if (!isNaN(floatValue)) {
    // Round the number to the specified decimal places
    const roundedValue = floatValue.toFixed(decimalPlaces);
    // Separate thousands with a space before the decimal part
    let [integerPart, decimalPart] = roundedValue.split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // Concatenate integer and decimal parts
    const formattedValue = decimalPart
      ? `${integerPart},${decimalPart}`
      : integerPart;
    return formattedValue;
  } else {
    return value;
  }
};
