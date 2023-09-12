package com.smhrd.todowedding.controller;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.json.JSONString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.todowedding.model.KakaoProfile;
import com.smhrd.todowedding.model.Member;
import com.smhrd.todowedding.model.MemberResponseDto;
import com.smhrd.todowedding.model.OAuthToken;
import com.smhrd.todowedding.service.KakaoLoginService;
import com.smhrd.todowedding.service.KakaoMessageService;
import com.smhrd.todowedding.service.MemberService;

import lombok.extern.slf4j.Slf4j;

/*
 * 카카오 로그인 컨트롤러
 * 작성 : 서유광
 * 일자 : 2023.09.05
 * 수정
 * 	- 전체 회원 정보 불러오기 기능 추가 (신지영, 2023.09.10)
 *  - 카카오톡 나에게 보내기 (예약) 기능 추가 (신지영, 202.09.12)
 */

@Slf4j
@CrossOrigin("http://localhost:3000")
@RestController
public class KakaoLoginController {
	
	@Autowired
	private KakaoLoginService kakaoLoginService;
	
	@Autowired
	private KakaoMessageService kakaoMessageService;
	
	// 카카오 API 관련 서비스가 아니기 때문에 웹사이트 내에서 관리하는 MemberService 사용
	@Autowired
	private MemberService memberService;
	
	//토큰 정보 저장
	private static String accessToken = null;
	
	@GetMapping("/auth/kakao/callback")
	public Map<String,Object> kakaoCallback(String code) throws NoSuchFieldException, SecurityException, IOException, JsonProcessingException { 
		System.out.println("프론트에서 넘어온 카카오 코드값 : " + code);
		Map<String, Object> KakaoData = kakaoLoginService.getAccessToken(code);
		
		//토큰 정보 저장
		ObjectMapper mapper = new ObjectMapper();
		Object kakaoToken = KakaoData.get("kakaoAccess");
		Map<String, Object> tokenMap = mapper.readValue((String) kakaoToken, Map.class);
		accessToken = (String) tokenMap.get("access_token");
		log.info("accessToken : " + accessToken);
		return KakaoData;
	}
	
	//전체 회원 조회 
	@GetMapping("/member")
	public List<MemberResponseDto> findAllMember() {
		return memberService.findAllMember();
	}
	
	@GetMapping("/member/delete")
	public int deleteMember(@RequestParam("member_seq") int member_seq) {
		System.out.println(member_seq);
		memberService.deleteMember(member_seq);
	     
		//String resultMessage = memberService.deleteMember(memberSeq);
//		if(resultMessage.equals("SUCCESS")) { 
//		    return ResponseEntity.ok("회원 정보 삭제 완료"); // 성공적으로 처리되면 200 OK 응답과 메시지 반환.
//		} else {  
//		    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 삭제 실패: " + resultMessage); // 실패하면 에러 메시지와 함께 500 Internal Server Error 응답 반환.
//	   }
		return 0;
	}
	
	
	//예약 실행
	@Scheduled(cron = "* * * * * *", zone = "Asia/Seoul")
	public void run() {

		log.info("스케쥴러 실행 : " + accessToken);
		
		if(accessToken != null) {			
			log.info("accessToken : " + accessToken);
			kakaoMessageService.sendMessage(accessToken);
		}
	}
}
