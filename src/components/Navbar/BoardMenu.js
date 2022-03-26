import {  faTimes,faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { connect} from 'react-redux';
import styled from 'styled-components';



const MenuWrapper = styled.div`
    z-index: 999;
    overflow-x: hidden;
    width: 340px;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background-color: whitesmoke;
    transform: ${(props) => props.showBoardMenu ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    display: block;
    height: 100%;
`;

const Menu = styled.div`
    box-sizing: border-box;
    width: 340px;
    // padding: 0px 12px;
    color: #172b4d;
`;

const MenuItems = styled.div`
    border-bottom: 1px solid #ccd2d7;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 1.2rem;

    font-weight: 500;
    color: #193345;
    text-align: center;
`;



const CloseMenu = styled.button`
    border: none;
    font-size: 1.5rem;
    background: none;
    color: #42526e;
    position: absolute;
    top: 18px;
    right: 12px;

    &:hover {
        color: #193345;
        cursor: pointer;
    }
`;

const OptionsList = styled.ul`
    text-align: left;
    list-style: none;
    cursor: pointer;
    // padding-inline-end: 40px;
`;

const OptionsItem = styled.li`
    display: block;
    align-items: center;
    color: #193345;
    font-size: 1rem;
    // padding: .4rem .4rem;
    line-height: 1.2rem;
    border-radius: 3px;
    font-weight: 600;
    &:hover {
        background-color: #6b808c3f;
    }
`;

const Icon = styled.span`
    color: #193345;
    padding: .3rem;
    margin-right: .3rem;
`;
const Members =styled.ul`
padding-inline-start:0
`
const MemberList=styled.div`
    background-color:#EEEEEE
    margin: 4px 5px;
    border-radius:20px;
    padding: 10px;
`



function BoardMenu(props) {

    const { showBoardMenu, toggleMenu } = props;
    const {memberList}=props.board
    

    return (
        <MenuWrapper showBoardMenu={showBoardMenu}>
            <Menu>
                <MenuItems>
                     <Title>Menu</Title>
                    <CloseMenu onClick={toggleMenu}><FontAwesomeIcon icon={faTimes} /></CloseMenu>
                </MenuItems>
                
                <MenuItems>
                    <OptionsList>
                        <OptionsItem>
                           <Icon><FontAwesomeIcon icon={faUsers}/></Icon>Members
                            <Members type="1">
                                {memberList && memberList.map((member,i)=>(
                                    <MemberList>
                                        <h3 style={{"fontSize":"15px","fontWeight":"500"}}>{i+1}. {member.name}</h3>
                                        <p style={{"fontWeight":"200"}}>{member.email.replace(",", ".")}</p>
                                    </MemberList>
                                ))
                                }
                            </Members>
                        </OptionsItem>
                    </OptionsList>
                </MenuItems>
            </Menu>
        </MenuWrapper>
    )
}


const mapStateToProps = (state) => ({
    board:state.board
});

export default connect(mapStateToProps)(BoardMenu);