import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const muit_server = import.meta.env.VITE_APP_SERVER_URL;
const token = localStorage.getItem("accessToken");
console.log(token);
const PostMenu = ({isMyPost}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { postId } = useParams();

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(`${muit_server}/delete/${postId}`, {
          headers: { 
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
  
        if (response.data.isSuccess) {
          alert("게시글이 삭제되었습니다.");
          navigate("/board/item/lost"); // 삭제 후 홈으로 이동
        } else {
          alert("삭제 실패: " + response.data.message);
        }
      } catch (error) {
        console.error("삭제 오류:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm("게시글을 신고하시겠습니까?")) {
      try {
        const response = await axios.post(`${muit_server}/reports/${postId}`, 
          {},
          {
          headers: { 
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
  
        if (response.data.isSuccess) {
          alert("정상적으로 신고 처리 되었습니다.");
        } else {
          alert("신고 실패: " + response.data.message);
        }
      } catch (error) {
        console.error("신고 오류:", error);
        alert("신고 중 오류가 발생했습니다.");
      }
    }
  };

  
  return (
    <Wrapper>
      <IconWrapper onClick={() => console.log("Menu clicked")}>
      <BsThreeDotsVertical  />
      </IconWrapper>
      
      <MenuWrapper>
        {isMyPost ?  <>
          <div onClick={() =>  navigate(`${location.pathname}/edit`)}>수정</div>
          <div onClick={() => handleDelete()}>삭제</div>
        </> :
        <OneMenu onClick={() => handleReport()}>신고</OneMenu>
        }
        
       
      </MenuWrapper>
    </Wrapper>
  );
};

export default PostMenu;

const Wrapper = styled.div`
  position: relative; /* 아이콘을 기준으로 메뉴를 위치시키기 위해 */
  display: inline-block; /* 아이콘을 inline-block으로 설정하여 수평으로 배치 */
`;

const IconWrapper = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
`
const MenuWrapper = styled.div`
  position: absolute;
  top: 40%; /* 아이콘 바로 아래에 위치 */
  right: 0%; /* 아이콘 오른쪽에 정렬 */
  background-color: white;
  width: 100px;
  display: none; /* 초기에는 메뉴 숨김 */
  border-radius: 2px;

  div {
    /* Body-tiny-md */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 128.571% */
    border: 1px solid #C1C1C1;
    padding: 6px;
    cursor: pointer;
    text-align: center;
    background: #FFF;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  div:nth-child(1) {
    color: var(--Gray-sub, #919191);

    border-radius: 4px 4px 0px 0px;
    border-bottom: none;
  }
    div:nth-child(2) {
    color: var(--Gray-sub, #FF1E00);

    border-radius: 0px 0px 4px 4px;
  }

  /* 아이콘 클릭 시 메뉴 보이도록 */
  ${Wrapper}:hover & {
    display: block;
  }
`;

const OneMenu = styled.div`
border-radius: 4px !important;
border-bottom: 1px solid #C1C1C1  !important;
`