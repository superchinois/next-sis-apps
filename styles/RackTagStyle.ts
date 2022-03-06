const barcode_positions_map = {
  ean13: {right: "-30px", bottom:"40px"},
  code128: {right: "-14px", bottom:"40px"},
  code1282: {right: "-51px", bottom:"44px"},
  ean8: {right: "-14px", bottom:"40px"},
}

const RackTagStyle = {
  sx:{
    tag: {
            paddingLeft: "2mm",
            border: "2px red solid",
            height: "70mm",
            width: "126mm",
            float: "left",
            outline: "0 #FFEAEA solid",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            justifyContent: "space-evenly"
        },
    itemcode: {
      position: "absolute",
      fontSize: "16pt",
      fontWeight: "bold",
      left: "20px",
      bottom:"0",
    },
    tableTag:{
      lineHeight:"1em",
      alignSelf: "flex-start",
    },
    barcode: (type)=>{return {
      position: "absolute",
      right: barcode_positions_map[type].right,
      bottom: barcode_positions_map[type].bottom,
      transform: "rotate(-90deg)",
    }},
    tagSideTop:{
      position: "absolute",
      transform: "rotate(90deg)",
      top: "121px",
      left: "400px",
    }
  },
  css:{
    ttc_style: {
      fontWeight: "bold",
      fontSize: "14pt",
      textAlign: "right",
    },
    pack_style: {fontSize:"smaller",fontWeight: "bold"},
  }
};
export default RackTagStyle;