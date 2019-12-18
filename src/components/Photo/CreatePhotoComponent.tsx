import React from 'react';
import CreatePhotoInfo from '../../components/Photo/CreatePhotoInfo';
import ThumbnailList from '../../components/Album/ThumbnailList';
import PreviewImage from '../../components/Album/PreviewImage';
import TagType from '../../types/TagType';

// type CreatePhotoComponentProps = {
//     handleChange
//     handleDate
//     uploadFile
//     clickTag
//     imgUrls
//     setImgIdx
//     removeImg
//     checkForm
//     tags, togglePopUp, imgIdx, selectedTags,
//     photoInfo, btnDisabled
// }


function CreatePhotoComponent({
    handleChange, handleDate, uploadFile, clickTag, imgUrls, setImgIdx, removeImg, checkForm,
    tags, togglePopUp, imgIdx, photoInfo, btnDisabled }: any) {


    const makeTagList = () => {
        if(photoInfo && tags) {
            return tags.map((tag: TagType) => {
                let labelClassName = (tag.tag_type === 'M') ? 'tag-label-1' : 'tag-label-2';
                return (
                    <div className="tag-unit" key={tag.tag_id} >
                        <input type="checkbox" id={"crt_" + tag.tag_id} checked={photoInfo.tags.includes(tag.tag_id)}
                            onChange={clickTag} />
                        <label className={labelClassName} htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
                    </div>
                )
            })
        }
    }

    return (
        <div className="crt-photo-popup">
            <div className="crt-photo-wrp">
                <div className="crt-photo-header">
                    <h3>사진 업로드</h3>
                </div>
                <div className="crt-photo-body">
                    <div className="crt-photo-left">
                        <ThumbnailList imgUrls={imgUrls} imgIdx={imgIdx} setImgIdx={setImgIdx} removeImg={removeImg} />
                        <div className="block-constant">
                            <label htmlFor="photos">
                                <div className="add-photo">
                                    <i className="ri-add-fill enif-f-2x"></i>
                                </div>
                            </label>
                            <input type="file" id="photos" multiple accept="image/*" onChange={uploadFile} />
                        </div>
                    </div>

                    <div className="crt-photo-center">
                        <PreviewImage imgUrls={imgUrls} imgIdx={imgIdx} />
                    </div>

                    <div className="crt-photo-right">
                        <div className="crt-photo-right-top" >
                            {
                                imgIdx >= 0 ?
                                    <>
                                        {tags &&
                                            <div className="tag-list-wrapper">
                                                {makeTagList()}
                                            </div>}

                                        <CreatePhotoInfo
                                            photoInfo={photoInfo}
                                            handleChange={handleChange}
                                            handleDate={handleDate}/>
                                    </>
                                    :
                                    <div className="message-info">사진을 선택해주세요</div>
                            }
                        </div>
                        <div className="crt-photo-btn-wrapper">
                            <button className="btn-cancel" onClick={togglePopUp}>취소</button>
                            <button className="btn-ok" disabled={btnDisabled} onClick={checkForm}>완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePhotoComponent;