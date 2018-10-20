import React from 'react';

// [TODO] Make defalt state & Make Oject contain UserInfo

const SignUpComponent = ({id, password, passwordCf, username, aaaNum, schoolNum, major, email, mobile, handleChange, postSignUp, profile, uploadFile }) => {
    return (
        <div id="sign-up-wrapper">
                <h2>가입안내</h2>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <div className="div-agreement">
                                    <p>
                                        안녕하세요? 서울대학교 아마추어 천문회 - AAA - 의 홈페이지에 오신것을 환영합니다!
                                        <br/><br/>
                                        지금 가입하려고 하는 사이트는 AAA인들이 온라인활동을 하는 공간으로,
                                        회원들의 개인정보 보호와 원활한 커뮤니티 활동을 위하여 몇가지 지켜주셔야 할 사항들이 있습니다.
                                        <br/><br/>
                                        귀찮으시더라도 아래 주의사항을 잘 읽어주시고 가입하여 주시기 바랍니다.
                                        <br/><br/><br/>
                                        1. 본 사이트는 실명제입니다.
                                        <br/><br/>
                                        따라서 실명으로 가입하지 않으시는 회원님은 강제 탈퇴조치 될 수 있으니, 주의하시기 바랍니다.
                                        <br/><br/><br/>
                                        2. 본 사이트는 회원등급제를 실시합니다.
                                        <br/><br/>
                                        회원들의 개인정보를 보호하고 자유로운 커뮤니티 활동을 보장하기 위하여
                                        소정의 자격요건을 만족하시지 못하는 분들은 몇몇 기능을 사용하실 수 없습니다.
                                        <br/><br/><br/>
                                        ☆ 회원등급별 권한
                                        <br/><br/>
                                        Lv10 : 비회원. 동아리원들의 커뮤니티를 위한 부분을 제외하고 이용 가능.
                                        <br/>
                                        Lv9 : AAA 회원 인증이 안된 회원. 비회원과 권한이 같다.
                                        <br/>
                                        Lv8 : 정보기입이 미비한 AAA 회원. 회원정보 보기를 제외한 모든 기능 이용가능.
                                        <br/>
                                        Lv7 : AAA 회원. 모든 기능 이용가능.
                                        <br/><br/>

                                        AAA 회원임을 확인하기 위하여 가입번호를 인증 수단으로 사용합니다.
                                        가입번호는 정확한 번호를 체크하는 것이 아니라 양식을 확인하므로 잡기장 필명과 유사하게 적어주시면 됩니다.
                                        정확한 양식으로 제출시 Lv 8로 가입처리가 됩니다.
                                        이후 입력된 회원정보가 충분하다고 생각하면 Lv 7로 올려드립니다.
                                        <br/><br/>
                                        다만, AAA의 회원은 아니나 AAA와 관련이 있는 분인 경우에는,
                                        추후 메뉴를 마련하도록 하겠습니다.
                                        <br/><br/>
                                        그리고, AAA 회원이지만 가입번호 양식을 모르시는 분들 역시,
                                        가입 후에 운영자에게 게시판에 소개글을 올려 주시면 확인 후 등급을 조절해드리겠습니다.
                                        <br/><br/>
                                        3. 회원 가입 시에는 학번과 학과, 전화번호를 필히 입력하여 주십시오.
                                        신원 확인을 위한 것이니 필히 입력해주시기 바랍니다.
                                        미입력시에는 Lv 9로 강제 조정됩니다.
                                        <br/><br/>
                                        AAA 홈페이지에서 즐거운 시간 보내십시오. 감사합니다.
                                        <br/>
                                        문의사항이 있을 시에는 snuaaa@gmail.com 으로 메일 보내주십시오.
                                    </p>
                                </div>
                                <p className="enif-text-right">위의 가입 안내문을 모두 읽었습니다.<input type="checkBox" /></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="signup-input-wrapper">
                    <div className="enif-input-field">
                        <label>아이디*</label>
                        <input 
                            type="text"
                            name="id"
                            className="input-text"
                            onChange={handleChange}
                            value={id}
                            required="required" />
                    </div>
                    <div className="enif-input-field">
                        <label>비밀번호*</label>
                        <input
                            type="password"
                            name="password"
                            className="input-text"
                            onChange={handleChange}
                            value={password}
                            required="required" />
                    </div>
                    <div className="enif-input-field">
                        <label>비밀번호 확인*</label>
                        <input
                                type="password"
                                name="passwordCf"
                                className="input-text"
                                onChange={handleChange}
                                value={passwordCf}
                                required="required" />
                    </div>
                    <div className="enif-input-field">
                        <label>이름*</label>
                        <input
                            type="text"
                            name="username"
                            className="input-text"
                            onChange={handleChange}
                            value={username}
                            required="required" />
                    </div>
                    <div className="enif-input-field">
                        <label>E-mail*</label>
                        <input
                            type="email"
                            name="email"
                            className="input-text"
                            onChange={handleChange}
                            value={email}
                            required="required" />
                    </div>
                    <div className="enif-input-field">
                        <label>Mobile*</label>
                        <input
                            type="text"
                            name="mobile"
                            className="input-text"
                            onChange={handleChange}
                            value={mobile}
                            required="required" />
                    </div>
                    <div className="enif-input-field">
                        <label>동아리 가입번호</label>
                        <input
                            type="text"
                            name="aaaNum"
                            className="input-text"
                            onChange={handleChange}
                            value={aaaNum} />
                    </div>
                    <div className="enif-input-field">
                        <label>학번</label>
                        <input
                            type="text"
                            name="schoolNum"
                            className="input-text"
                            onChange={handleChange}
                            value={schoolNum} />
                    </div>
                    <div className="enif-input-field">
                        <label>학과</label>
                        <input
                            type="text"
                            name="major"
                            className="input-text"
                            onChange={handleChange}
                            value={major} />
                    </div>
                    <div className="enif-input-field">
                        <label>Profile</label>
                        <input
                            type="file"
                            name="profile"
                            accept="image/*"
                            onChange={(e) => uploadFile(e)}
                            /* ref={profileRef} */
                            value={profile}/>
                    </div>
                    <div className="enif-input-field">
                        <label>자기소개</label>
                        <textarea />
                    </div>
                    <div className="enif-input-field">
                        <button className="enif-btn-common-rec signup-btn" onClick={postSignUp}>회원가입</button>                        
                    </div>
                </div>

                        
            </div>
    )
}


export default SignUpComponent;