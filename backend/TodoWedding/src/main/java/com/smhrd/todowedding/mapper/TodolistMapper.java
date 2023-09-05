package com.smhrd.todowedding.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.json.simple.JSONObject;

import com.smhrd.todowedding.model.CountTodolist;
import com.smhrd.todowedding.model.Todolist;
import com.smhrd.todowedding.model.TodolistDto;

/*
 * 투두리스트 관련 mapper
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
@Mapper
public interface TodolistMapper {

	//해당 user의 투두리스트에 투두리스트 추가하기
	@Insert("insert into tw_todolist (todolist_contents, member_seq) values (#{todolistContents}, #{memberSeq})")
	public int addTodoList(TodolistDto todolistDto);
	
	//해당 user의 전체 투두리스트 조회하기
	@Select("select * from tw_todolist where member_seq=#{memberSeq}")
	public List<Todolist> findAllTodolist(int memberSeq);
	
	//memberSeq, todolistSeq에 대하여 내용 수정하기 
	@Update("update tw_todolist set todolist_contents =#{todolistContents} where todolist_seq=#{todolistSeq} and member_seq=#{memberSeq}")
	public int updateTodolist(int todolistSeq, String todolistContents, int memberSeq);
	
	//memberSeq, todolistSeq에 대한 투두리스트 삭제하기 
	@Delete("delete from tw_todolist where todolist_seq=#{todolistSeq} and member_seq=#{memberSeq}")
	public void deleteTodolist(int todolistSeq, int memberSeq);
	
	//memberSeq의 전체 투두리스트 개수 조회
	@Select("select todolist_completed, count(todolist_completed) as count from tw_todolist where member_seq=#{memberSeq} group by todolist_completed")
	public List<CountTodolist> allCountTodolist(int memberSeq);
	
}
