import styled from 'styled-components';


const Outer = styled.div`
    display: flex;
    font-family: Permanent Marker;
`

const Column = styled.div`
    height: 90vh;
    margin: 5vmin;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`


const FixedColumn = styled(Column)`
    height: 90vh;
    width: ${props => props.percent ? props.percent + "vw" : "64vw"};
    flex-grow: 0;
`

const InnerCenter = styled.div`
    margin: auto;
`

const InnerTop = styled.div`
`

const Title = styled.h1`
    font-size: 4.5vmin;
`

const Ul = styled.ul`
    font-size 3vmin;
    margin-left: 3vmin;
    padding-left: 3vmin;
`

const Li = styled.li`
`

export {Outer, Column, FixedColumn, InnerCenter, InnerTop, Title, Ul, Li}
