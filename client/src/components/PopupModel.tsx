import '../css/Popup-Model.css'
import { createPortal } from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
function PopupModel({children}:{children:any}) {
const theme=createTheme({
  typography: {
    fontSize: 20, // Adjust the font size as needed
  },
})

  return createPortal(<>
    <div className="modal-wrapper" ></div>
    <ThemeProvider theme={theme}>
    
    <div className="modal-container">
      {children}
      {/* {handelSubmit} */}
    </div>
    </ThemeProvider>
  </>,document.getElementById("popup-container")!)
}

export default PopupModel