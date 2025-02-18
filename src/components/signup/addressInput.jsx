import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import SearchRed from "../../assets/icons/SearchRed.svg";

const AddressInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(""); // 선택된 기본 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 입력값

  // 주소 검색 버튼 클릭
  const handleAddress = () => {
    setIsOpen(true);
  };

  // 주소 선택 완료 시 실행
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname) extraAddress += data.bname;
      if (data.buildingName) extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress); // 주소 저장
    setIsOpen(false); // 팝업 닫기
  };

  return (
    <>
      <InputArea>
        <p className="body-B-600">주소</p>
        <div className="address-search" onClick={handleAddress}>
          <img src={SearchRed} alt="주소 검색" /> 주소 검색
        </div>
      </InputArea>

      {isOpen && (
        <ModalBackground onClick={() => setIsOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <DaumPostcode onComplete={handleComplete} />
            <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
          </ModalContent>
        </ModalBackground>
      )}

      {address && (
        <>
          <InputArea>
            <p className="body-B-600">도로명 주소</p>
            <Input>
              <input value={address} readOnly placeholder="주소를 선택해주세요." />
            </Input>
          </InputArea>

        </>
      )}
    </>
  );
};

// Styled Components
const InputArea = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;
  p{margin:0px;}

  .body-B-600{
    width: 90px;
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  
  position: relative;
  .address-search{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    width: 104px;
    height: 32px;
    border-radius: 3px;

    border: 1px solid var(--Muit-Red-main, #A00000);
    background: var(--Gray-white-bg, #FFF);

    color: var(--Muit-Red-main, #A00000);
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }

  .address-search:hover {
    background: #FFECEC;
  }
`

const Input = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: Pretendard;

  height: 32px;
  width: 716px;

  border-style:none;
  border-bottom:solid 1px #E6E6E6;
  outline: none;

  input{
    border: none;
    flex: 1;

    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
  }
  input::placeholder{
    color: #919191;
    /* Body-tiny-md */
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  input:focus{
    outline : none;
  }
`

// 모달 스타일
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background: #A00000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`

export default AddressInput;
