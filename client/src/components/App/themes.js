import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    body: "#fff",
    reverseBody: "#212F3C",
    reverseText: "#fff",
    text: "#363E45",
    border: "1px solid rgb(52, 73, 94)",
    bodyColor: "cadetblue",
    hover: "#dcdcdc"
}

export const darkTheme = {
    body: "#212F3C",
    text: "#fff",
    reverseBody: "#fff",
    reverseText: "#363E45",
    border: "1px solid #fff",
    bodyColor: "dimgray",
    hover: "dimgray"
}

export const GlobalStyles = createGlobalStyle`

body {
   background: ${(props) => props.theme.body};
   color: ${(props) => props.theme.text};
}

.emojiPopup {
    background: ${(props) => props.theme.reverseBody};
    color: ${(props) => props.theme.reverseText};
    border: ${(props) => props.theme.border};
}

.myContainer.data, .data {
    color: ${(props) => props.theme.bodyColor};
} 
.box, .just-picture, .dialog-container {
    background-color: ${(props) => props.theme.bodyColor};
}

.profile, .contacts {
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
 }

 .itemNaming {
    color: ${(props) => props.theme.text};
 }

 .item:hover {
    background-color: ${(props) => props.theme.hover};
 }

.userPhoto {
   border: ${(props) => props.theme.border};
}

.switchButton {
    border: ${(props) => props.theme.border};
}
`
