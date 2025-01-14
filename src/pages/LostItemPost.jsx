import React from "react";
import styled from "styled-components";
import itemImg from "../assets/images/lost-item-1.png";
import CommentInputArea from "../components/post/CommentInputArea";
function LostItemPost() {
  return (
    <>
      <LostItemPostContainer>
        <TitleWrapper>
        <PostTitle>아이폰 16프로 화이트 티타늄</PostTitle><BoardName>분실</BoardName>
        </TitleWrapper>
        <SubTitleWrapper>
          <User>최윤경</User><PostDate>2025-01-05</PostDate>
        </SubTitleWrapper>
        <Hr marginTop='20px' marginBottom='36px'/>
        <ItemInfoWrapper>
                  <ItemImage>
                    <img alt="뮤지컬 포스터" src={itemImg} />
                  </ItemImage>
                  <ItemDetail>
                    <Item>
                      <Label>뮤지컬명</Label>
                      <div>
                        <Value>알라딘</Value>
                      </div>
                    </Item>
                    <Item>
                      <Label>분실장소</Label>
                      <Value>링크아트센터드림 드림1관</Value>
                    </Item>
                    <Item>
                      <Label>분실일</Label>
                      <Value>2025.01.05 | 14:00-16:00</Value>
                    </Item>
                    <Item>
                      <Label>분실물명</Label>
                      <Value>아이폰 16 pro 화이트 티타늄</Value>
                    </Item>
                    <Item>
                      <Label>특징</Label>
                      <Value>짱구케이스 끼고 있고...맹구 콧물 돌아가는 모양의 케이스에요..배경화면은 사진으로 참고할게요 
이렇게 생겼습니다. 
여자화장실 세면대쪽 손 씻을때 빠졌을까요 아니면 공연장에서 주머니에서 빠졌을까요ㅜㅜ
찾거나 보신 분들은 댓글로 남겨주세요...감사합니다ㅠㅠ</Value>
                    </Item>
                  </ItemDetail>
                </ItemInfoWrapper>
                <Hr marginTop='60px' marginBottom='20px'/>
                <PostTitle marginBottom='20px'>댓글 3개</PostTitle>
                <CommentInputArea />

      </LostItemPostContainer>
    </>
    
  );
}

export default LostItemPost;

const LostItemPostContainer = styled.div`
  margin: 86px 100px;
`

const PostTitle = styled.div`
  color: #000;

  /* Title-semibo */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0px'};
`

const BoardName = styled.div`
color: var(--Muit-Red-main, #A00000);

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
  align-items: flex-end; /* 아래쪽으로 정렬 */
`;

const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

const User = styled.div`
  color: var(--Gray-sub, #919191);

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`

const PostDate = styled.div`
  color: var(--Gray-sub, #919191);

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`

const Hr = styled.hr`
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  border: 0; /* 기본 테두리 제거 */
  border-top: 1px solid var(--Gray-outline, #E6E6E6); /* 선의 스타일 설정 */
  height: 0; /* 불필요한 높이 제거 */
  box-shadow: none; /* 그림자 제거 */
  transform: rotate(0.09deg); /* 회전 설정, 필요 시 유지 */
  flex-shrink: 0;
`;


const ItemInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 37px;
`;

const ItemImage = styled.div`
  flex: 1;
  img {
    width: 320px;
    height: 320px;
    background-color: #f0f0f0;
  }
`;

const ItemDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0px 40px;
`;

const Item = styled.div`
  display: flex;
`;

const Label = styled.div`
    color: #000;
    width: 120px;
  /* Body-bold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Value = styled.div`
  color: ${(props) => props.color? props.color:'#000'};
  /* Body-me */
  width: ${(props) => props.width? props.width: '600px'};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize? props.fontSize:'16px'};
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 156.25% */
 text-decoration-line: ${(props) => props.strikethrough ? 'line-through' : 'none'};
  margin-right: ${(props) => props.marginRight ? props.marginRight : '0px'};
  margin-left: ${(props) => props.marginLeft ? props.marginLeft : '0px'};
`;

