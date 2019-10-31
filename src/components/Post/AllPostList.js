import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate'

const AllPostList = ({ posts }) => {

    const makePostList = () => {

        if (posts && posts.length > 0) {
            return posts.map(post => {
                let contentInfo = post.content;
                let boardInfo = post.content.board;
                let userInfo = post.content.user;
                return (
                    <div className="post-list" key={contentInfo.content_id}>
                        <div className="post-list-unit post-list-unit-4">
                            <Link to={`/board/${boardInfo.board_id}`}>
                                {boardInfo.board_name}
                            </Link>
                        </div>
                        <div className="post-list-unit-left with-boardname">
                            <div className="post-list-unit-title">
                                <Link to={`/post/${contentInfo.content_id}`}>
                                    <h5>{contentInfo.title}</h5>
                                </Link>
                            </div>
                            <div className="post-list-unit-left-bot">
                                <div className="post-list-unit post-list-unit-2">
                                    {userInfo && userInfo.nickname}
                                </div>
                                <div className="post-list-unit post-list-unit-2">
                                    {convertDate(contentInfo.createdAt)}
                                </div>
                            </div>
                        </div>

                        <div className="post-list-unit post-list-unit-3">
                            <span className="color-pink icon-wrapper">
                                <i className="material-icons md-18">favorite</i>
                                {contentInfo.like_num}
                            </span>
                        </div>
                        <div className="post-list-unit post-list-unit-3">
                            <span className="color-gray1 icon-wrapper">
                                <i className="material-icons md-18 md-dark">comment</i>
                                {contentInfo.comment_num}
                            </span>
                        </div>
                    </div>
                )
            });
        }
    }

    return (
        <div className="post-list-wrapper">
            <div className="post-list-header">
                <div className="post-list-header-unit post-list-header-4">게시판</div>
                <div className="post-list-header-unit post-list-header-1 with-boardname">제목</div>
                <div className="post-list-header-unit post-list-header-2">작성자</div>
                <div className="post-list-header-unit post-list-header-2">작성일</div>
                <div className="post-list-header-unit post-list-header-3">추천</div>
                <div className="post-list-header-unit post-list-header-3">댓글</div>
            </div>
            {makePostList()}
        </div>
    )
}

export default AllPostList;