import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Common/Image';

const PhotoList = ({ photos }) => {

    const makePhotoList = () => {
        if (photos.length > 0) {
            return photos.map(photo => {
                let contentInfo = photo.contentPhoto;
                return (
                    <div className="photo-wrapper" key={contentInfo.content_id}>
                        <Link to={{
                            pathname: `/photo/${contentInfo.content_id}`,
                            state: { modal: true }
                        }} >
                            <div className="photo-cover">
                                <i className="material-icons">favorite</i>
                                <p>{contentInfo.like_num}</p>
                                &nbsp;
                                <i className="material-icons">comment</i>
                                <p>{contentInfo.comment_num}</p>
                            </div>
                            <Image imgSrc={photo.thumbnail_path} />
                        </Link>
                    </div>
                )
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