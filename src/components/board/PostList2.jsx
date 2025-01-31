import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageNavigator from "./PageNavigator";
import CommentBubbleOutLine from "../../assets/icons/CommentBubbleOutLine.svg";
import ReplyArrow from "../../assets/icons/ReplyArrow.svg";
import ThumbsUp from "../../assets/icons/ThumbsUp.svg";

function PostList2({ posts }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRowClick = (id) => {
    navigate(`${location.pathname}/${id}`);
  };

  return (
    <PostListWrapper>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => {
          console.log(post);
          return (
            <PostWrapper key={post.id} onClick={() => handleRowClick(post.id)}>
              <Left>
                <Title>{post.title}</Title>
                <Text>{post.content}</Text>
                <IconsWrapper>
                  <IconWrapper>
                    <img src={ThumbsUp} alt="likes" />
                    <Text color="#919191">{post.likes || 0}</Text>
                  </IconWrapper>
                  <IconWrapper>
                    <img src={CommentBubbleOutLine} alt="comments" />
                    <Text color="#919191">{post.comments || 0}</Text>
                  </IconWrapper>
                  <Text color="#919191">{post.createdAt}</Text>
                </IconsWrapper>
              </Left>
              <Right>
                {post.image && <Img src={post.image} alt="musical" />}
              </Right>
            </PostWrapper>
          );
        })
      ) : (

        <></>
      )}
      <NavWrapper>
        <PageNavigator
          currentPage={1} // 현재 페이지
          totalPages={4} // 전체 페이지 수
          onPageChange={(page) => console.log(`Move to page: ${page}`)} // 페이지 변경 핸들러
        />
      </NavWrapper>
    </PostListWrapper>
  );
}

export default PostList2;

const PostListWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Pretendard, sans-serif;
  text-align: center;

`;
const PostWrapper = styled.div`

width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
 border-bottom: 1px solid #e6e6e6;

  &:last-child {
    border-bottom: none;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  margin: 16px 12px;
  gap: 12px;
`
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 132px;
`
const Title = styled.div`
  color: ${(props) => props.color ? props.color : '#000'};

  /* Body-bold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const IconsWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 12px;
`
const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

const Text = styled.div`
  color: ${(props) => props.color ? props.color: '#000'};

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
`
const Img = styled.img`
height: 88px;
width: 88px;
border-radius: 3px;
`