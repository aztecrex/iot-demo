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
    font-size: 5.4vmin;
`

const Section = styled.h1`
    font-size 3.4vmin;
    &:before {
        content: '~~ ';
    }
    &:after {
        content: ' ~~';
    }
`


const Ul = styled.ul`
    font-size 4vmin;
    list-style: none;
`

const Li = styled.li`
    text-indent: -1em;
    &:before {
        content: '- ';
    }
`

const Red = styled.span`
    color: red;
`

const Green = styled.span`
    color: green;
`

const Blue = styled.span`
    color: blue;
`

const P = styled.p`
    font-size: 3.4vmin
`


export {
    Outer, Column, FixedColumn, InnerCenter, InnerTop, Title, Ul, Li,
    Red, Green, Blue, Section, P
}
