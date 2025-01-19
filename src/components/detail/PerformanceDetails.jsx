import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const tabRefs = navItems.map(() => React.createRef());

  useEffect(() => {
    // 컴포넌트가 마운트된 후 기본 탭의 위치와 너비 계산
    const defaultTabIndex = navItems.findIndex((item) => item.id === activeTab);
    const tabElement = tabRefs[defaultTabIndex]?.current;

    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [tabRefs, activeTab]);

  const handleTabClick = (id, index) => {
    setActiveTab(id);

    // 클릭된 탭의 위치와 너비 계산
    const tabElement = tabRefs[index].current;
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
        {/* 하단 슬라이딩 선 */}
        <Indicator style={indicatorStyle} />
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
