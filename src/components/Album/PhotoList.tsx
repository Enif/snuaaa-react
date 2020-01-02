import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/Common/AaaImage';
import history from '../../common/history';
import ContentType from '../../types/ContentType';

type PhotoListProps = {
    photos: ContentType[];
}

function PhotoList ({ photos }: PhotoListProps) {

    const makePhotoList = () => {
        if (photos.length > 0) {
            return photos.map(content => {
                let contentInfo = content;
                let photo = content.photo;
                if(photo) {
                    return (
                        <div className="photo-wrapper" key={contentInfo.content_id}>
                            <Link to={{
                                pathname: `/photo/${contentInfo.content_id}`,
                                state: {
                                    modal: true,
                                    backgroundLocation: history.location
                                }
                            }} >
                                <div className="photo-cover">
                                    <i className="ri-heart-fill"></i>
                                    <p>{contentInfo.like_num}</p>
                                    &nbsp;
                                    <i className="ri-message-fill"></i>
                                    <p>{contentInfo.comment_num}</p>
                                </div>
                                <Image imgSrc={photo.thumbnail_path} />
                            </Link>
                        </div>
                    )
                }
            })
        }
    }

    return (
        <>
            <div className="photo-list-wrapper">
                {makePhotoList()}
            </div>
        </>
    )
}

export default PhotoList;