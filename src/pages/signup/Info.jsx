import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";

import styled from "styled-components";
import MuitLogo from "../../components/signup/muitLogo";
import SeePassword from '../../assets/icons/SeePassword.svg';
import SearchRed from "../../assets/icons/SearchRed.svg"
import { useNavigate } from 'react-router-dom';

const COLOR_MUIT_RED = "#A00000";

function Info() {
    const schema = yup.object().shape({
        id: yup.string()
            .min(6, "6~20자 영문, 숫자 입력")
            .max(20, "6~20자 영문, 숫자 입력")
            .required("아이디를 입력해주세요."),
        password: yup.string()
            .min(8, "8~20자 이상 입력")
            .max(20, "8~20자 이상 입력")
            .required("비밀번호를 입력해주세요."),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password"), null], "동일한 비밀번호 입력")
            .required("비밀번호 확인을 입력해주세요."),
        email: yup.string()
            .email('유효한 이메일 주소를 입력해 주세요.')
            .required("이메일을 반드시 입력해 주세요."),
    });
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    
    const [isShowPWChecked, setIsShowPWChecked] = useState(false);
    const [ageCheck, setAgeCheck] = useState(false);
    const passwordRef = useRef(null);

    const handleShowPWChecked = async() => {
        setIsShowPWChecked(!isShowPWChecked);
    };

    const onSubmit = (data) => {
        console.log("회원가입 정보:", data);
    };
    
    const navigate = useNavigate();
    const onPrevious = () => {
        navigate(-1);
    };
    const EndSignUp = () => {
        navigate('/signup/complete');
    };

    const [selectedGender, setSelectedGender] = useState(null); // 성별 상태 관리
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender); // 선택된 성별 상태 업데이트
    };

    console.log(errors);

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

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputArea>
                            <p className="body-B-600">이름</p>
                            <Input>
                                <input placeholder="이름을 입력하세요" />
                            </Input>
                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">아이디</p>
                            <div className='inputError'>
                                <Input>
                                    <input placeholder="아이디를 입력하세요"
                                        type={'id'}{...register('id')} />
                                </Input>
                                {errors.id && <ErrorMessage>{errors.id?.message}</ErrorMessage>}
                            </div>

                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">비밀번호</p>
                            <div className='inputError'>
                                <Input>
                                    <input placeholder="비밀번호를 입력하세요"
                                        type={isShowPWChecked ? "text" : "password"}
                                        {...register("password")} />
                                    <img src={SeePassword} onClick={handleShowPWChecked} />
                                </Input>
                                {errors.password &&
                                <ErrorMessage>{errors.password?.message}</ErrorMessage>}
                            </div>
                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">비밀번호 확인</p>
                            <div className='inputError'>
                                <Input>
                                    <input placeholder="비밀번호를 입력하세요"
                                        type={isShowPWChecked ? "text" : "password"}
                                        {...register("confirmPassword")} />
                                    <img src={SeePassword} onClick={handleShowPWChecked} />
                                </Input>
                                {errors.confirmPassword &&
                                    <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>}
                            </div>
                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">이메일</p>
                            <Input>
                                <input placeholder="예: muit1234@gmail.com" type={'email'} />
                                <button className='passkey-btn'>인증번호 받기</button>
                            </Input>
                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">성별</p>
                            <GenderSelectBtn>
                                <button
                                    className={`gender-select ${selectedGender === "male" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect("male")}> 남성</button>
                                <button
                                    className={`gender-select ${selectedGender === "female" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect("female")}>여성</button>
                            </GenderSelectBtn>
                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">휴대폰 번호</p>
                            <Input>
                                <input placeholder="숫자를 입력하세요" />
                            </Input>
                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">주소</p>
                            <div className='address-search'> <img src={SearchRed}/> 주소 검색</div>
                        </InputArea>

                        <Check>
                            <div className='ageCheck'>
                                <CheckBox type='checkbox'
                                    id="ageCheck"
                                    checked={ageCheck}
                                    onChange={(e) => setAgeCheck(e.target.checked)} />
                                <div>
                                    <label htmlFor="ageCheck">14세 이상입니다</label>
                                    <p>만 14세 미만 회원은 회원가입이 불가능합니다.</p>
                                </div>
                            </div>
                            <div className='eventCheck'>
                                <CheckBox type='checkbox' id='eventCheck' />
                                <label htmlFor='eventCheck'>SMS, 이메일로 상품 및 이벤트 정보를 받겠습니다. (선택)</label>
                            </div>

                        </Check>

                        <BtnArea>
                            <Button className="previous"
                            onClick={onPrevious}>이전</Button>
                            <Button className="next"
                                disabled={!ageCheck}
                                onClick={EndSignUp}>가입하기</Button>
                        </BtnArea>

                    </Form>

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
  h2{margin:0px}
  .Title-B-600{
    margin-bottom: 10px;
  }
`
const Form = styled.form`
    display: flex;
  flex-direction: column;
  gap: 40px; 
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
const ErrorMessage = styled.p`
    color: var(--Red-warning, #FF1E00);
    /* Body-tiny-md */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`;
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

    .gender-select.selected{
        color: var(--Muit-Red-main, #A00000);
        border: 1px solid var(--Muit-Red-main, #A00000);
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

export default Info;