import styled from 'styled-components';

export const SideModalContainer = styled.div`
position: fixed;
right: 0;
top: 0;
width: 40%;
height: 100%;
background-color: #fff;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family:"poppins";
`
export const SideModalContent = styled.div`
width: 90%;
height: 80%;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
background-color: gray;

`
export const FormColumn = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: space-between;
background-color: red;
width: 100%;
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