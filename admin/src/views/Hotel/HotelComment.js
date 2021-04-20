import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Layout, Comment, Avatar, Card, Empty } from 'antd';
import { getCommentList } from '../../assets/api/comment';
import { useParams } from 'react-router-dom';
const { Content } = Layout;
function HotelDetail(props) {
  let { id } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const getList = () => {
    const params = {
      hotel_id: id,
      pageIndex: 1,
      pageSize: 100,
    };
    setLoading(true);
    getCommentList(params).then((res) => {
      setList(res.list);
      setLoading(false);
    });
  };

  const ExampleComment = ({ children, item }) => (
    <Comment
      actions={
        item?.user ? [<span key="comment-nested-reply-to"></span>] : null
      }
      author={
        <a>{item?.user ? item.user.nickname : item.from_user.nickname}</a>
      }
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={<p>{item.content}</p>}
    >
      {children}
    </Comment>
  );

  return (
    <Card title="评论" loading={loading}>
      <Content>
        {list.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}

        {list.map((item) => (
          <ExampleComment key={item.id} item={item}>
            {item.replyList.map((code) => (
              <ExampleComment key={code.id} item={code}></ExampleComment>
            ))}
          </ExampleComment>
        ))}
      </Content>
    </Card>
  );
}

export default withRouter(HotelDetail);
