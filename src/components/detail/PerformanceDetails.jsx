import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Review from '../../pages/detail/subpages/Review';
import Casts from '../../pages/detail/subpages/Casts';
import Performance from '../../pages/detail/subpages/Performance';
import Seats from '../../pages/detail/subpages/Seats';

const Content = styled.div`
  padding-top: 32px;
  width: 820px;
`;

const navItems = [
  { id: 'details', name: '공연 정보' },
  { id: 'cast', name: '캐스팅 정보' },
  { id: 'view-guide', name: '시야 확인' },
  { id: 'reviews', name: '관람 후기' },
];

function PerformanceDetails() {
  const [activeTab, setActiveTab] = useState('details');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useMemo(() => navItems.map(() => React.createRef()), []);

  useEffect(() => {
    const defaultTabIndex = navItems.findIndex((item) => item.id === activeTab);
    const tabElement = tabRefs[defaultTabIndex]?.current;

    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement;
      if (
        indicatorStyle.left !== offsetLeft ||
        indicatorStyle.width !== offsetWidth
      ) {
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [activeTab, tabRefs, indicatorStyle]);

  const handleTabClick = (id, index) => {
    setActiveTab(id);
    const tabElement = tabRefs[index]?.current;
    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  };

  return (
    <div>
      <Navbar>
        {navItems.map((item, index) => (
          <NavItem
            key={item.id}
            ref={tabRefs[index]}
            isActive={activeTab === item.id}
            onClick={() => handleTabClick(item.id, index)}
          >
            {item.name}
          </NavItem>
        ))}
        <Indicator style={indicatorStyle} />
      </Navbar>

      <Content>
        {activeTab === 'details' && <Performance/>}
        {activeTab === 'cast' && <Casts />}
        {activeTab === 'view-guide' && <Seats />}
        {activeTab === 'reviews' && <Review />}
      </Content>
    </div>
  );
}


const Navbar = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  width: 820px;
  gap: 40px;
  border-bottom: 1px solid #e6e6e6;
`;

const NavItem = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 15px 0;
  color: ${({ isActive }) => (isActive ? '#A00000' : '#919191')};
  transition: color 0.2s;

  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? '700' : '300')};
  line-height: normal;

  &:hover {
    color: #a00000;
  }
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 3px;
  background-color: #a00000;
  transition: left 0.3s ease, width 0.3s ease;
`;

export default PerformanceDetails;
