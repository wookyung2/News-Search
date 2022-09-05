# NYT API를 통한 기사 검색 사이트 구현

# 기사 검색 사이트 기능

## Input 기능

- 마지막 타이핑 이후 0.5초 동안 추가 입력이 없으며, input value가 있는 경우 검색 api 호출
- 최대 5개까지 search history 저장 (브라우저 종료시에도 지속)
- search history가 존재하고 input에 focus 중이면 search history 노출

## Clip 기능

- 기사 카드의 clip버튼을 클릭하여 해당 기사를 즐겨찾기
- clip된 기사들은 브라우저를 재시작하여도 유지 (persist 사용함)
- clip된 기사들은 "/clip"에서 확인
- 기사를 unclip 하면 더는 "/clip"에서 확인할 수 없음
