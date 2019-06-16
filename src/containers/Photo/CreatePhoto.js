import React from 'react';
import * as service from 'services';
import CreatePhotoInfo from 'components/Album/CreatePhotoInfo';
import ThumbnailList from 'components/Album/ThumbnailList';
import PreviewImage from 'components/Album/PreviewImage';

const TAG = 'CREATEPHOTO'

class CreatePhoto extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.photoInfos = [];

        this.state = {
            title: '',
            text: '',
            date: '',
            location: '',
            camera: '',
            lens: '',
            focal_length: '',
            f_stop: '',
            exposure_time: '',
            iso: '',
            selectedTags: [],
            uploadPhotos: [],
            imgDatas: [],
            imgIdx: -1
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDate = (date) => {
        this.setState({
            date: date
        })
    }

    uploadFile = (e) => {
        const { uploadPhotos } = this.state;
        if (e.target.files) {
            this.setState({
                uploadPhotos: uploadPhotos.concat(...e.target.files)
            })
        }
        for (let i = 0; i < e.target.files.length; i++) {
            this.photoInfos.push({
                title: '',
                text: '',
                date: '',
                location: '',
                camera: '',
                lens: '',
                focal_length: '',
                f_stop: '',
                exposure_time: '',
                iso: '',
                selectedTags: []
            })
        }
    }

    setImgIdx = (index) => {

        const { imgIdx, title, text, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso, selectedTags } = this.state;

        if (imgIdx >= 0) {
            this.photoInfos[imgIdx] = {
                title: title,
                text: text,
                date: date,
                location: location,
                camera: camera,
                lens: lens,
                focal_length: focal_length,
                f_stop: f_stop,
                exposure_time: exposure_time,
                iso: iso,
                selectedTags: selectedTags
            }
        }

        this.setState({
            imgIdx: index,
            title: this.photoInfos[index].title,
            text: this.photoInfos[index].text,
            date: this.photoInfos[index].date,
            location: this.photoInfos[index].location,
            camera: this.photoInfos[index].camera,
            lens: this.photoInfos[index].lens,
            focal_length: this.photoInfos[index].focal_length,
            f_stop: this.photoInfos[index].f_stop,
            exposure_time: this.photoInfos[index].exposure_time,
            iso: this.photoInfos[index].iso,
            selectedTags: this.photoInfos[index].selectedTags
        })
    }

    makeTagList = () => {
        const tagList = this.props.tags.map((tag) => {
            return (
                <div className="tag-unit" key={tag.tag_id} >
                    <input type="checkbox" id={"crt_" + tag.tag_id} checked={this.state.selectedTags.includes(tag.tag_id)}
                        onChange={(e) => this.clickTag(e)} />
                    <label htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
                </div>
            )
        })
        return tagList;
    }

    clickTag = (e) => {
        let tagId = e.target.id.replace('crt_', '');

        if (this.state.selectedTags.includes(tagId)) {
            this.setState({
                selectedTags: this.state.selectedTags.filter(tag => tagId !== tag)
            })
        }
        else {
            this.setState({
                selectedTags: this.state.selectedTags.concat(tagId)
            })

        }
    }

    checkForm = () => {
        if (!this.state.uploadPhotos) {
            alert("사진을 첨부해주세요")
        }
        else {
            this.createPhotos();
        }
    }

    createPhotos = async () => {

        const { imgIdx, title, text, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso, selectedTags } = this.state;
        if (imgIdx >= 0) {
            this.photoInfos[imgIdx] = {
                title: title,
                text: text,
                date: date,
                location: location,
                camera: camera,
                lens: lens,
                focal_length: focal_length,
                f_stop: f_stop,
                exposure_time: exposure_time,
                iso: iso,
                selectedTags: selectedTags
            }
        }

        const photosForm = new FormData();

        for (let i = 0, max = this.state.uploadPhotos.length; i < max; i++) {
            console.log(this.photoInfos[i])
            photosForm.append('board_id', this.props.board_id);
            photosForm.append('title', this.photoInfos[i].title);
            photosForm.append('text', this.photoInfos[i].text);
            photosForm.append('date', this.photoInfos[i].date);
            photosForm.append('location', this.photoInfos[i].location);
            photosForm.append('camera', this.photoInfos[i].camera);
            photosForm.append('lens', this.photoInfos[i].lens);
            photosForm.append('focal_length', this.photoInfos[i].focal_length);
            photosForm.append('f_stop', this.photoInfos[i].f_stop);
            photosForm.append('exposure_time', this.photoInfos[i].exposure_time);
            photosForm.append('iso', this.photoInfos[i].iso);
            photosForm.append('tags', this.photoInfos[i].selectedTags);
            photosForm.append('uploadPhotos', this.state.uploadPhotos[i]);
        }

        if (this.props.album_id) {

            await service.createPhotosInAlbum(this.props.album_id, photosForm)
                .then(() => {
                    console.log('[%s] Create Photos Success', TAG);
                    console.log(this.props)
                    this.props.togglePopUp();
                    this.props.fetch();
                })
                .catch(() => {
                    console.error(`[${TAG}] Create Photos Fail`);
                    alert('사진 생성 실패');
                })
        }
        else if (this.props.board_id) {

            await service.createPhotosInPhotoBoard(this.props.board_id, photosForm)
                .then(() => {
                    console.log('[%s] Create Photos Success', TAG);
                    this.props.togglePopUp();
                    this.props.retrievePhotos(this.props.board_id);
                })
                .catch(() => {
                    console.error(`[${TAG}] Create Photos Fail`);
                    alert('사진 생성 실패');
                })
        }
        else {
            console.error(`[${TAG}] Unhandled Exception`);
            this.props.togglePopUp();
        }
    }

    render() {
        console.log('[%s] render', TAG)
        const { uploadPhotos, imgIdx, title, text, date, location, camera, lens, focal_length, f_stop, exposure_time, iso } = this.state

        return (
            <div className="crt-photo-popup">
                <div className="crt-photo-wrp">
                    <div className="crt-photo-header">
                        <h3>사진 업로드</h3>
                    </div>
                    <div className="crt-photo-body">
                        <div className="crt-photo-left">
                            <label htmlFor="photos">
                                <div className="add-photo">
                                    <i className="material-icons md-36">add</i>
                                </div>
                            </label>
                            <input type="file" id="photos" multiple accept="image/*" onChange={(e) => this.uploadFile(e)} />
                            <ThumbnailList uploadPhotos={uploadPhotos} imgIdx={imgIdx} setImgIdx={this.setImgIdx} />
                        </div>

                        <div className="crt-photo-center">
                            <PreviewImage uploadPhotos={uploadPhotos} imgIdx={imgIdx} />
                        </div>

                        <div className="crt-photo-right">

                            {(() => {
                                if (this.state.imgIdx >= 0) {
                                    return (
                                        <>
                                            {this.props.tags &&
                                                <div className="tag-wrapper">
                                                    {this.makeTagList()}
                                                </div>}

                                            <CreatePhotoInfo title={title} text={text} date={date} location={location}
                                                camera={camera} lens={lens} focal_length={focal_length} f_stop={f_stop}
                                                exposure_time={exposure_time} iso={iso} handleChange={this.handleChange} handleDate={this.handleDate} />
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <div className="message-info">사진을 선택해주세요</div>
                                    )
                                }
                            })()}
                            <div className="btn-wrapper">
                                <button className="btn-cancel" onClick={() => this.props.togglePopUp()}>취소</button>
                                <button className="btn-ok" onClick={() => this.checkForm()}>완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default CreatePhoto;