
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../assets/icons/AdminCheckboxRed.svg";

import SearchBarShort_Mock from "../components/SearchBarShort_Mock";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = localStorage.getItem("adminToken");
const colLabels = ["아이디", "이름", "E-mail", "번호", "날짜/시간(최신순)", "진행도"];

export default function AdminQueryDetail() {

  // 1. 체크박스 //////////////////////////////////////////////////////////////////
  const [checkboxes, setCheckboxes] = useState([false, false, false, false, false]);
  const toggleCheck = (index) => {
    setCheckboxes((prev) => {
      if (prev[index]) { // 만약 이미 체크되어 있다면 => 전부 해제
        return [false, false, false, false, false];
      }                 // 아니라면 => 해당 index만 true, 나머지는 false
      const newState = [false, false, false, false, false];
      newState[index] = true;
      return newState;
    });
  };
  const isAnyChecked = checkboxes.some((checked) => checked === true);

  const { queryId } = useParams();  // URL 파라미터 (/adminpage/query/detail/:queryId)
  const navigate = useNavigate();
  const [queryInfo, setqueryInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [responseContent, setResponseContent] = useState("");  // 수정할 답변 내용 저장
  useEffect(() => {
    if (queryId) {
      fetchQueryDetail(queryId);
    }
  }, [queryId]);
  // 문의 상세 조회 API
  const fetchQueryDetail = async (queryId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/inquiries/${queryId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const data = res.data.result || {};
      const refined = {
        userId: data.member.memberId,   // 유저 관리 번호
        name: data.member.memberName,   // 진짜 이름
        phone: data.member.phone,
        email: data.member.email,
        queryTime: formatDate(data.inquiry.createdAt),
        progress: data.inquiry.status === 'COMPLETED' ? '완료' : '미완료',
        queryId: data.inquiry.inquiryId,
        queryTitle: data.inquiry.title,
        queryContent: data.inquiry.content,
        responseId: data.response?.responseId,
        responseContent: data.response?.content || '답변을 하지 않은 문의사항.',
        responseTime: formatDate(data.response?.createdAt)
      };
      setqueryInfo(refined);
      setResponseContent(refined.responseContent);
    } catch (err) {
      console.error("문의 정보 조회 실패:", err);
      alert("해당 문의를 조회할 수 없습니다.");
      navigate("/adminpage/query"); 
    }
  };
// 날짜 포맷 함수 (YYYY.MM.DD / HH:mm)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // 날짜 YYYY.MM.DD 형식으로 변환
  const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '.');
  // 시간 HH:mm 형식으로 변환
  const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5); 
  return `${formattedDate} / ${formattedTime}`;
};

  // 답변/수정 하기 -> editMode = true
  const handleEdit = () => {
    setEditMode(true);
  };

  // 답변/수정 API
  const handleApply = async () => {
    try {
      const res = await axios.put(
        `${baseURL}/admin/inquiries/response/${queryInfo.queryId}`,
        {
          content: responseContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token_admin}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setqueryInfo((prevState) => ({
        ...prevState,
        responseContent: responseContent,
      }));
      alert("답변이 수정되었습니다.");
      setEditMode(false);
    } catch (err) {
      console.error("답변 수정 실패:", err);
      alert("답변 수정에 실패했습니다.");
    }
  };


  return (
    <Container>
      <Tilte>문의</Tilte>
      <SearchSection>
        <SearchBarShort_Mock/>
        <CheckBoxes>
          {colLabels.map((label, idx) => (
            <CheckBoxWrapper key={label}>
              <CheckBox onClick={() => toggleCheck(idx)}>
                <img
                  src={checkboxes[idx] ? CheckBoxIconRed : CheckBoxIcon}
                  alt="CheckBox Icon"
                />
              </CheckBox>
              <CheckText>{label}</CheckText>
            </CheckBoxWrapper>
          ))}
          <CheckSearchIcon><img src={isAnyChecked ? SearchIconRed : SearchIconBlack} alt="Search Icon" /></CheckSearchIcon>
        </CheckBoxes>
      </SearchSection>
      
      <Subtitle>
        <BackButton onClick={() => navigate(-1)}>
          &lt;
        </BackButton>
        &nbsp; 일대일 문의
      </Subtitle>

      <MainSection>
        <InfoTable>
          <thead>
            <Tr>
              <Th>이름</Th>
              <Th>전화번호</Th>
              <Th>이메일</Th>
              <Th>문의 작성일</Th>
              <Th>진행도</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>{queryInfo?.name}</Td>
              <Td>{queryInfo?.phone}</Td>
              <Td>{queryInfo?.email}</Td>
              <Td>{queryInfo?.queryTime}</Td>
              <Td>{queryInfo?.progress}</Td>
            </Tr>
          </tbody>
        </InfoTable>
        <Query>
          <Text>문의 내용</Text>
          <ContnetBox>
            <QueryTitle>제목 : {queryInfo?.queryTitle}</QueryTitle>
            <QueryContent>{queryInfo?.queryContent}</QueryContent>
          </ContnetBox>
        </Query>
        <Response>
          <Text>답변</Text>
          <ContnetBox>
            {editMode ? (
              <textarea
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                placeholder="답변을 작성해주세요."
                rows={5}
                style={{ width: '866px', padding: '10px' }}
              />
            ) : (
              <ResponseContent>{queryInfo?.responseContent}</ResponseContent>
            )}
          </ContnetBox>
          {queryInfo?.progress === "완료" && (<ResponseTime>답변 작성일 : {queryInfo?.responseTime}</ResponseTime>)}
        </Response>
      </MainSection>

      
      {/* 하단 버튼 */}
      {!editMode ? (
        <RedButton onClick={handleEdit}>답변/수정하기</RedButton>
      ) : (
        <GrayButton onClick={handleApply}>저장하기</GrayButton>
      )}
    </Container>
  );

}


/* ---------------- styled components ---------------- */


const Container = styled.div`
  position: relative;
  width:  1150px;
  height: 916px;
  background-color: ${COLOR_WHITE};
  padding-left: 71px;
  padding-right:  131px;
  box-sizing: border-box;

  display:  flex;
  flex-direction:  column;
`;

const Tilte = styled.div`
  margin-top: 4px;
  font-family:  "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color:  ${COLOR_MUIT_RED};
`;

const SearchSection = styled.div`
  margin-top:  15px;
  display:  flex;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBoxes = styled.div`
  display:  flex;
  gap:  18px;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBoxWrapper = styled.div`
  display:  flex;
  gap:  15px;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBox = styled.button`
  border: none;
  cursor: pointer;
  width: 19px;
  height: 19px;
  background-color: transparent;
`;

const CheckText = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const CheckSearchIcon = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.div`
  margin-top: 51px;
  margin-left: 0px;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const MainSection = styled.div`
  width: 918px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 16px;
  margin-left: 31px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: center;
  padding: 4px;
  border: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const Td = styled.td`
  text-align: center;
  padding: 4px;
  border: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const Text = styled.div`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const Query = styled.div`
  margin-top: 26px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const QueryTitle = styled.div`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: #8F8E94;
`;

const QueryContent = styled.div`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const Response = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ResponseContent = styled.div`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const ContnetBox = styled.div`
  width: 100%;
  height: 198px;
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #8F8E94;
  padding: 10px 14px 10px 14px;
  gap: 10px;
`;

const ResponseTime = styled.div`
  margin-top: 18px;
  font-family: 'Pretendard';
  font-size: 12px;
  font-weight: 500;
  color: #8F8E94;
`;

const RedButton = styled.button`
  margin-left: 792px;
  margin-top: 60px;
  width: 156px;
  height: 38px;

  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_WHITE};

  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 8px;
  background-color: ${COLOR_MUIT_RED};
`;

const GrayButton = styled.button`
  margin-left: 792px;
  margin-top: 60px;
  width: 156px;
  height: 38px;
  
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_WHITE};

  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #555555;
  border-radius: 8px;
  background-color: #555555;
`;