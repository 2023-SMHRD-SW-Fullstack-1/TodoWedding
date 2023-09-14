/**
 * 업체 전용 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.14
 */

import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";
import bell from "../../assets/images/icon/bell.png";

const PartnerHeader = ({ loginUserNickname }) => {
    return (
        <div className="header-bar flex flex-row justify-between bg-gradient-to-r from-[#DEDEED] to-white">
            <Link to="/todowedding/partner" className="flex-col">
                <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
            </Link>
            <div className="text-xs mt-1 self-center">
                반가워요,
                {loginUserNickname}님💜
            </div>
            <img src={bell} className="w-5 h-5 self-center mr-6 mt-1"></img>
        </div>
    );
};

export default PartnerHeader;
