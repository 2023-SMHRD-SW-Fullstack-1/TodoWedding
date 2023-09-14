import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import axios from "axios";

/*
 * Header
 * 작성자 : 서현록
 * 작성일 : 2023.09.04
 * 수정 :
 *  - 카카오 로그인 후 닉네임 적용, 로그아웃 세션 삭제 및 메인페이지 경로 수정 (양수진, 2023.09.08)
 *  - redux값 사용 위해 로고 클릭시 메인페이지 이동 Link로 변경 (신지영, 2023.09.09)
 *  - 카카오 로그인 후 바로 닉네임 렌더링 redux dispatch로 적용 (양수진, 2023.09.13)
 *  - D-day, 최근 일정 조회 header 적용 (신지영, 2023.09.14)
 */

const style = {
    button: `border p-2 ml-2 bg-purple-500 text-slate-100`,
};

const Header = () => {
    //리덕스에서 사용자 정보 가져오기
    const token = useSelector((state) => state.Auth.token);
    //유저 닉네임
    const [loginUserNickname, setLoginUserNickname] = useState();
    //d-day 정보
    const [marryDt, setMarryDt] = useState();
    //최근 일정 정보
    const [latestSchedule, setLatestSchedule] = useState({});

    //결혼일 조회
    const findMarryDt = () => {
        axios
            .get(`http://localhost:8085/marry-d-day/${token.userSeq}`)
            .then((res) => {
                console.log("결혼일 조회 결과 : ", res.data);
                setMarryDt(res.data);
            })
            .catch((err) => {
                console.log("결혼일 조회 에러 : ", err);
            });
    };

    //최근 일정 조회
    const findLatestSchedule = () => {
        axios
            .get(`http://localhost:8085/latest-schedule/${token.userSeq}`)
            .then((res) => {
                console.log("최근 일정 조회 결과 : ", res.data);
                if (res.data != null) {
                    //최신 일정 날짜 표시 변환
                    const dateData = res.data.schedule_start_dt.split("-");
                    const contents = res.data.schedule_contents;

                    setLatestSchedule({
                        schedule_contents: contents,
                        schedule_start_dt: dateData[0] + "년 " + dateData[1] + "월 " + dateData[2] + "일",
                    });
                }
            })
            .catch((err) => {
                console.log("최근 일정 조회 error 발생 : ", err);
            });
    };

    useEffect(() => {
        //카카오 로그인 정보 가져오기 - 헤더에서 따서 쓰기
        console.log("사용자 로그인 닉네임", loginUserNickname);

        // 카카오 로그인 정보가 있는 경우에만 닉네임 상태값 업데이트
        if (token) {
            setLoginUserNickname(token.userNick);
        }

        const selectUserInfo = async () => {
            await findMarryDt();
            await findLatestSchedule();
        };

        selectUserInfo();
    }, [token]);

    return (
        <div className="header-bar">
            {loginUserNickname ? (
                <div className="flex flex-row">
                    <div className="flex flex-col self-center">
                        <div className="self-center text-3xl mr-1 text-[#9F7FFC] font-bold">D-{marryDt}</div>
                        <div className="text-[9px]">반가워요. {loginUserNickname}님💜</div>
                    </div>
                    <div className="ml-9 text-[12px]">
                        <span className="font-bold">{latestSchedule.schedule_start_dt}</span>에 <br></br>
                        <span className="font-extrabold text-[#9F7FFC] text-[16px]">
                            {latestSchedule.schedule_contents}
                        </span>{" "}
                        일정이 기다리고 있어요!
                    </div>
                    <button className="border p-2 bg-[#9F7FFC] text-slate-100 ml-28">{<GiHamburgerMenu />}</button>
                </div>
            ) : (
                <div className="welcome-nick">
                    <Link to="/">
                        <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
                    </Link>
                    <Link to="/todowedding/login" className="main-login">
                        <span className="text-sm">로그인</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
