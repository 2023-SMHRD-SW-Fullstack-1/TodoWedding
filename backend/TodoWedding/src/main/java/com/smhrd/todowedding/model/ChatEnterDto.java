package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 채팅방 접속했을 때 DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */

@AllArgsConstructor
@Getter
public class ChatEnterDto {

	private Long partnerSeq;
	private Long memberSeq;
	
}
