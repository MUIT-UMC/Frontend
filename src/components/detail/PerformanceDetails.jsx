import React, { useState } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  width: 820px;
  border-bottom: 1px solid #E6E6E6;;
  gap: 40px;
`;

const NavItem = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 15px 0px;
  color: ${({ isActive }) => (isActive ? '#A00000' : '#919191')};
  border-bottom: ${({ isActive }) => (isActive ? '3px solid #A00000' : '3px solid #FFF')};
  transition: color 0.2s, border-bottom 0.2s;

  &:hover {
  }

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: ${({ isActive }) => (isActive ? '700' : '300')};
line-height: normal;
`;

const Content = styled.div`
  padding-top: 32px;
`;

const navItems = [
  { id: 'details', name: '공연 정보' },
  { id: 'cast', name: '캐스팅 정보' },
  { id: 'view-guide', name: '시야 확인' },
  { id: 'reviews', name: '관람 후기' },
];

function PerformanceDetails() {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div>
      <Navbar>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          >
            {item.name}
          </NavItem>
        ))}
      </Navbar>

      <Content>
        {activeTab === 'details' && <div>공연 정보 내용</div>}
        {activeTab === 'cast' && <div>캐스팅 정보 내용</div>}
        {activeTab === 'view-guide' && <div>시야 확인 내용</div>}
        {activeTab === 'reviews' && <div>관람 후기 내용</div>}
      </Content>
    </div>
  );
}

export default PerformanceDetails;
