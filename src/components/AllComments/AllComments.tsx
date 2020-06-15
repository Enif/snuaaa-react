import React from 'react';
import { Location } from 'history';

import HomeService from '../../services/HomeService';
import Loading from '../Common/Loading';
import MyCommentList from '../MyPage/MyCommentList';
import Paginator from '../Common/Paginator';
import BoardName from '../Board/BoardName';
import BoardStateEnum from '../../common/BoardStateEnum';
import history from '../../common/history';
import CommentType from '../../types/CommentType';


const TAG = 'ALLCOMMENTS'
const COMMENTROWNUM = 10;

type AllCommentsProps = {
    location: Location;
}

type AllCommentsState = {
    boardState: number;
}

class AllComments extends React.Component<AllCommentsProps, AllCommentsState> {

    comments: CommentType[];
    commentCount: number;

    constructor(props: AllCommentsProps) {
        super(props);
        console.log(`[${TAG}] Constructor`)
        this.comments = [];
        this.commentCount = 0;
        // const hisState = history.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            // pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    componentDidMount() {
        this.fetch()
    }

    // static getDerivedStateFromProps(props, state) {
    //     const hisState = history.location.state;
    //     return {
    //         pageIdx: (hisState && hisState.page) ? hisState.page : 1,
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.pageIdx !== nextState.pageIdx) {
    //         this.fetch(nextState.pageIdx);
    //         return true;
    //     }
    //     return true;
    // }

    componentDidUpdate(prevProps: AllCommentsProps) {
        if (prevProps.location.state !== this.props.location.state) {
            this.fetch();
        }
    }

    clickPage = (idx: number) => {
        history.push({
            state: {
                page: idx
            }
        })
    }

    setBoardState = (state: number) => {
        this.setState({
            boardState: state
        })
    }

    fetch = async () => {
        const { location } = this.props;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;

        this.setBoardState(BoardStateEnum.LOADING)
        await HomeService.retrieveAllComments(pageIdx)
            .then((res) => {
                this.comments = res.data.commentInfo;
                this.commentCount = res.data.commentCount;
                this.setBoardState(BoardStateEnum.READY)
            })
            .catch((err: Error) => {
                console.error(err);
            })
    }

    render() {
        console.log(`[${TAG}] render.. `)
        const { location } = this.props;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;
        const { boardState } = this.state;

        return (
            <>
                {
                    (() => {
                        if (boardState === BoardStateEnum.LOADING) {
                            return <Loading />
                        }
                        else if (boardState === BoardStateEnum.READY || boardState === BoardStateEnum.WRITING) {
                            return (
                                <div className="board-wrapper postboard-wrapper">
                                    <BoardName board_name="전체 댓글" />
                                    {
                                        boardState === BoardStateEnum.READY &&
                                        <>
                                            <MyCommentList comments={this.comments} />
                                            {
                                                this.commentCount > 0 &&
                                                <Paginator
                                                    pageIdx={pageIdx}
                                                    pageNum={Math.ceil(this.commentCount / COMMENTROWNUM)}
                                                    clickPage={this.clickPage} />
                                            }
                                        </>
                                    }
                                </div>
                            )
                        }
                        else return (
                            <div>ERROR PAGE</div>
                        )
                    })()
                }
            </>
        );
    }
}

export default AllComments;