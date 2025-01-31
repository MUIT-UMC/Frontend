import styled from "styled-components";
import SearchRed from "../../../../assets/icons/SearchRed.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddAddress() {
    const navigate = useNavigate();
     const [name, setName] = useState("");
     const [recipient, setRecipient] = useState("");
     const [phone, setPhone] = useState("");
 
     const isFormValid = name.trim() !== "" && recipient.trim() !== "" && phone.trim() !== "";

    const GoBack = () => {
        navigate(-1);
    };
    const CompleteAddAddress = () => {
        alert("주소가 성공적으로 추가되었습니다.");
      };

    return (
        <Container>
            <InputArea>
                <p className="body-B-600">배송지명</p>
                <Input>
                    <input 
                        placeholder="예시: 집, 회사"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Input>
            </InputArea>

            <InputArea>
                <p className="body-B-600">수령인</p>
                <Input>
                    <input 
                        placeholder="수령인을 입력하세요"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </Input>
            </InputArea>

            <InputArea>
                <p className="body-B-600">주소</p>
                <div className='address-search'> 
                    <img src={SearchRed} alt="주소 검색"/> 주소 검색
                </div>
            </InputArea>

            <InputArea>
                <p className="body-B-600">휴대폰</p>
                <Input>
                    <input 
                        placeholder="휴대폰 번호를 입력하세요"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Input>
            </InputArea>

            <BtnArea>
                <button onClick={GoBack} className="previous">이전</button>
                <button 
                    onClick={CompleteAddAddress}
                    className="confirm"
                    disabled={!isFormValid}
                >
                    변경
                </button>
            </BtnArea>
        </Container>
    )
}

const Container = styled.div`
    font-family: Pretendard;
    padding: 16px 0px;
`
const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;

  .body-B-600{
    width: 64px;

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
`
const Input = styled.div`
  display: flex;
  justify-content: space-between;

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
const EditButton = styled.button`
  width: 73px;
  height: 28px;
  padding: 4px 12px;
  align-items: center;

  border-radius: 2px;
  border: 1px solid #919191;
  background: #FFF;

  color: #919191;
  /* Body-tiny-md */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`
const BtnArea = styled.div`
  display: flex;
  gap: 20px;

  padding-top: 100px;

  button{
    display: flex;
    width: 400px;
    height: 40px;
    padding: 8px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;

    /* Body-bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }

  .confirm{
    color: #FFF;
    border: 1px solid var(--Muit-Red-main, #A00000);
    background: var(--Muit-Red-main, #A00000);
  }
  .confirm:disabled{
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-sub, #919191);
  }

  .previous{
    color: #000;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: var(--Gray-white-bg, #FFF);
  }  
`

export default AddAddress;