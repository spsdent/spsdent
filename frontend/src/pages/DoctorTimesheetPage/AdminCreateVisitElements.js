import styled from 'styled-components';

export const SideModalContainer = styled.div`
position: fixed;
right: 0;
top: 0;
width: 100%;
min-height: 100%;
background-color: #fff;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family:"poppins";

@media only screen and (min-width: 768px) {
    width: 40%;
}
`
export const SideModalContent = styled.div`
width: 90%;
height: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
// background-color: gray;

`
export const FormColumn = styled.div`
width: 100%;
min-width: 300px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: space-between;
// background-color: red;
`
export const FormItem = styled.div`
background-color: cadetblue;
display: flex;
justify-content: flex-start;
align-items: center;
gap: 1em;
width: 100%;
`
export const StyledLabel = styled.label`
font-size: .6em;
width: 8em;

`

export const StyledButtonExit = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    border: 2px solid #333;
    color: #333;
    background: transparent;
    cursor: pointer;
`;