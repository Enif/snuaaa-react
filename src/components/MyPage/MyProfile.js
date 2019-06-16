import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image';
import { breakLine } from 'utils/breakLine';

function MyProfile({profileImg, nickname, userDesc}) {

    const [isExpand, setIsExpand] = useState(false);

    let descClass = isExpand ? "userdesc expanded" : "userdesc";
    let icon = isExpand ? "expand_less" : "expand_more"

    return (
        <div className="my-profile-wrapper">
            <div className="my-left">
                <div className="profile-img">
                    <Image imgSrc={profileImg}/>
                </div>
                <div className="nickname">{nickname}</div>
                <div className="btn-edit-info">
                    <Link to="profile">
                        <button>회원정보 수정</button>
                    </Link>
                </div>

            </div>
            <div className="my-right">
                <div className={descClass}>{breakLine(userDesc)}</div>
                <div>
                    <i className="material-icons pointer" onClick={() => setIsExpand(!isExpand)}>{icon}</i>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;