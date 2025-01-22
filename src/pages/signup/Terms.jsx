import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TermsAccordion from "../../components/signup/Accordion";
import MuitLogo from "../../components/signup/muitLogo";
import terms from "../../components/signup/terms"; // 필수 동의 항목
import optionalTerms from "../../components/signup/termsOptional"; // 선택 동의 항목

const COLOR_MUIT_RED = "#A00000";

function Terms() {
  const navigate = useNavigate();

  // 모든 체크박스 상태 관리
  const [checkedTerms, setCheckedTerms] = useState({
    all: false,
    ...terms.reduce((acc, term) => ({ ...acc, [term.id]: false }), {}),
    ...optionalTerms.reduce((acc, term) => ({ ...acc, [term.id]: false }), {}),
  });

  // 필수 항목 체크 여부 계산
  const isEssentialChecked = terms.every((term) => checkedTerms[term.id]);

  // '모두 동의' 체크박스 클릭 핸들러
  const handleAgreeAll = () => {
    const agreeAll = !checkedTerms.all;
    const updatedCheckedTerms = {
      all: agreeAll,
      ...terms.reduce((acc, term) => ({ ...acc, [term.id]: agreeAll }), {}),
      ...optionalTerms.reduce((acc, term) => ({ ...acc, [term.id]: agreeAll }), {}),
    };
    setCheckedTerms(updatedCheckedTerms);
  };

  // 개별 약관 체크박스 클릭 핸들러
  const handleCheckboxChange = (id) => {
    setCheckedTerms((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      updated.all = terms
        .concat(optionalTerms)
        .every((term) => updated[term.id]);
      return updated;
    });
  };

  // '다음' 버튼 클릭 핸들러
  const navigateToInfo = () => {
    if (isEssentialChecked) {
      navigate("/signup/info");
    }
  };

  return (
    <Page>
      <MuitLogo />
      <Container>
        <SideMenu>
          <div className="nowHere"> 01 약관 동의 </div>
          <div> 02 정보 입력 </div>
        </SideMenu>
        <TermArea>
          <h2 className="Title-B-600">약관 동의</h2>
          <div className="gap-40">
            <AgreeAll>
              <input
                type="checkbox"
                id="agree-chk"
                className="agree-chk"
                checked={checkedTerms.all}
                onChange={handleAgreeAll}
              />
              <div className="agree-text">
                <label htmlFor="agree-chk"> 모두 동의합니다. </label>
                <p className="Body-m-500">
                  이용약관, 전자금융거래 이용 약관, 개인정보 수집동의서, 위치기반서비스
                  이용약관 항목에 대해 모두 동의합니다. 각 사항에 대한 동의 여부를
                  개별적으로 선택하실 수 있으며, 선택 동의 사항에 대한 동의를
                  거부하여도 서비스를 이용하실 수 있습니다.
                </p>
              </div>
            </AgreeAll>
            <div className="Essential">
              <h3>필수 동의 항목</h3>
              <TermsAccordion
                terms={terms}
                checkedTerms={checkedTerms}
                onCheckboxChange={handleCheckboxChange}
              />
            </div>
            <div className="Additional">
              <h3>선택 동의 항목</h3>
              <TermsAccordion
                terms={optionalTerms}
                checkedTerms={checkedTerms}
                onCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
          <BtnArea>
            <Button className="previous">이전</Button>
            <Button
              onClick={navigateToInfo}
              className="next"
              disabled={!isEssentialChecked}
            >
              다음
            </Button>
          </BtnArea>
        </TermArea>
      </Container>
    </Page>
  );
}

const Page = styled.div`
    font-family: Pretendard;
    padding: 120px 100px 0 100px;

    display: flex;
    flex-direction: column;
`
const Container = styled.div`
    display: flex;
    gap: 116px;
    padding-top: 80px;
`
const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    div{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: #919191;

        display:flex;
        align-items: center;

        box-sizing: border-box;
        width: 200px;
        height: 40px;
        padding: 8px 20px;
        border-radius: 3px;
        border: 1px solid #E6E6E6;
    }
    .nowHere{
        border: 1px solid #A00000;
        background: #A00000;
        color: #FFF;
    }
`
const TermArea = styled.div`
    width: 820px;
    h2{margin:0px;}
    .Title-B-600{
        color: #000;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;

        margin-bottom: 16px;
    }
    .gap-40{
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
`
const AgreeAll = styled.div`
    box-sizing: border-box;
    width: 820px;
    //height: 108px;
    background-color: #F5F5F5;
    padding: 20px 20px 20px 20px;

    display: flex;
    gap: 8px;

    .agree-chk{
        appearance: none;
        box-sizing: border-box;
        width: 40px;
        height: 20px;

        border-radius: 3px;
        border: 1px solid #919191;
    }
    .agree-chk:checked{
        background: ${COLOR_MUIT_RED};
        border: 1px solid ${COLOR_MUIT_RED};
    }
    .agree-text{
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    label{
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
    }
    p{margin: 0px;}
    .Body-m-500{
    color: #919191;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    }
`
const BtnArea = styled.div`
    display: flex;
    gap: 20px;
    margin: 60px 0 60px 0;
    .previous{
        border: 1px solid  #E6E6E6;
        background:#FFF;
        
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
    }
    .next{
        border: 1px solid  #A00000;
        background:  #A00000;
        
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
    }
    .next:disabled {
        border: 1px solid  #919191;
        background:  #919191;
        color: #FFF;
        cursor: not-allowed;
}
`
const Button = styled.button`
    box-sizing: border-box;
    font-family: Pretendard;
    display: flex;
    width: 400px;
    height: 40px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
`

export default Terms;