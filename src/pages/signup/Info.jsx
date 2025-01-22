import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";

import styled from "styled-components";
import MuitLogo from "../../components/signup/muitLogo";
import SeePassword from '../../assets/icons/SeePassword.svg';

const COLOR_MUIT_RED = "#A00000";

function Info() {
    const schema = yup.object().shape({
        id: yup.string().min(4).max(20).required(),
        password: yup.string().min(8).max(20).required(),
    })
    
    const [isShowPWChecked, setIsShowPWChecked] = useState(false);
    const passwordRef = useRef(null);
    const handleShowPWChecked = async() => {
        const password = await passwordRef.current
        if(password === null) return

        await setIsShowPWChecked(!isShowPWChecked)
        if(!isShowPWChecked){
            password.type = 'text';
        } else{
            password.type = 'password';
        }
    }

    return(
        <Page>
            <MuitLogo />
            <Container>
                <SideMenu>
                    <div> 01 약관 동의 </div>
                    <div  className="nowHere"> 02 정보 입력 </div>
                </SideMenu>

                <InfoArea>
                    <h2 className="Title-B-600">회원가입</h2>

                    <InputArea>
                        <p className="body-B-600">이름</p>
                        <Input>
                            <input placeholder="이름을 입력하세요"/>
                        </Input>
                    </InputArea>

                    <InputArea>
                        <p className="body-B-600">아이디</p>
                        <Input>
                            <input placeholder="아이디를 입력하세요" type={'id'}/>
                        </Input>
                    </InputArea>

                    <InputArea>
                        <p className="body-B-600">비밀번호</p>
                        <Input>
                            <input placeholder="비밀번호를 입력하세요" type={'password'}  ref={passwordRef}/>
                            <img src={SeePassword} onClick={handleShowPWChecked}/>
                        </Input>
                    </InputArea>

                    <InputArea>
                        <p className="body-B-600">비밀번호 확인</p>
                        <Input>
                            <input placeholder="비밀번호를 입력하세요" type={'password'}  ref={passwordRef}/>
                            <img src={SeePassword} onClick={handleShowPWChecked}/>
                        </Input>
                    </InputArea>

                    <InputArea>
                        <p className="body-B-600">이메일</p>
                        <Input>
                            <input placeholder="예: muit1234@gmail.com" type={'email'}/>
                            <button className='passkey-btn'>인증번호 받기</button>
                        </Input>
                    </InputArea>

                    <InputArea>
                        <p className="body-B-600">성별</p>
                        <GenderSelectBtn>
                            <button className='gender-select'>남성</button>
                            <button className='gender-select'>여성</button>
                        </GenderSelectBtn>
                    </InputArea>

                    <InputArea>
                        <p className="body-B-600">휴대폰 번호</p>
                        <Input>
                            <input placeholder="숫자를 입력하세요"/>
                        </Input>
                    </InputArea>

                    <InputArea>
                        <p className="body-B-600">주소</p>

                    </InputArea>

                    <Check className="keepLogin">
                        <div className='ageCheck'>
                            <CheckBox type='checkbox' id="ageCheck"/>
                            <div>
                                <label htmlFor="ageCheck">14세 이상입니다</label>
                                <p>만 14세 미만 회원은 회원가입이 불가능합니다.</p>
                            </div>
                        </div>
                        <div className='eventCheck'>
                            <CheckBox type='checkbox' id='eventCheck'/>
                            <label htmlFor='eventCheck'>SMS, 이메일로 상품 및 이벤트 정보를 받겠습니다. (선택)</label>
                        </div>

                    </Check>

                    <BtnArea>
                        <Button className="previous">이전</Button>
                        <Button className="next">가입하기</Button>
                    </BtnArea>

                </InfoArea>

            </Container>

        </Page>

    )
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
const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  h2{margin:0px}
  .Title-B-600{
    margin-bottom: 10px;
  }
`
const InputArea = styled.div`
  display: flex;
  align-items: center;
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
`
const Input = styled.form`
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

  .passkey-btn{
    margin-bottom: 4px;
    height: 28px;    
    display: flex;
    padding: 4px 12px;
    align-items: center;
    border-radius: 2px; 
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-white-bg, #FFF);

    color: #919191;
    /* Body-tiny-md */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;

  }
`
const GenderSelectBtn = styled.div`
    display: flex;
    gap: 20px;

    .gender-select{
        display: flex;
        width: 72px;
        height: 28px;
        padding: 4px 12px;
        align-items: center;
        justify-content: center;

        border-radius: 2px;
        border: 1px solid var(--Gray-sub, #919191);
        background: var(--Gray-white-bg, #FFF);

        color: #000;
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
    }
`
const Check = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label{
    color: var(--Gray-maintext, #000);
    /* Body-me */
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
  p{
    margin: 0px;
    color: var(--Gray-sub, #919191);
    /* Body-tiny-md */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    margin-top: 8px;
  }
  .ageCheck{
    display: flex;
  }
  .eventCheck{
    display: flex;
  }
`
const CheckBox = styled.input`
    appearance: none;

    box-sizing: border-box;
    width: 20px;
    height: 20px;
    margin-right: 8px;

    border-radius: 3px;
    border: 1px solid #898989;

    &:checked{
        background: ${COLOR_MUIT_RED};
        border: none;
    }
`
const BtnArea = styled.div`
    display: flex;
    gap: 20px;
    margin: 64px 0 64px 0;
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

export default Info;