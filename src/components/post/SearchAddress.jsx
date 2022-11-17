import React, { useState }  from "react";
import DaumPostcode from "react-daum-postcode";


function SearchAddress(props) {

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    //props.onClose()
    props.setPostAddres(fullAddress)
    props.popupPostCode()
    console.log(data)
    //setInputs(fullAddress)
    console.log(fullAddress)
    console.log(data.zonecode)
  };

  //const [inputs, setInputs] = useState();

  return (
    <div>
      <DaumPostcode
        onComplete={handleComplete}
        {...props}

      />
    </div>
    
  );
}

export default SearchAddress;

SearchAddress.defaultProps = {
  style: {
    width: "700px",
    height: "450px",
  },
};