import { Category } from "../../models";

export default async () => {
  try {
    const firstcate: { name: string }[] = [
      { name: "여성의류" },
      { name: "남성의류" },
      { name: "신발" },
      { name: "가방/지갑" },
      { name: "시계" },
      { name: "쥬얼리" },
      { name: "패션 액세서리" },
      { name: "디지털" },
      { name: "가전제품" },
      { name: "스포츠/레저" },
      { name: "차량/오토바이" },
      { name: "스타굿즈" },
      { name: "키덜트" },
      { name: "예술/희귀/수집품" },
      { name: "음반/악기" },
      { name: "도서/티켓/문구" },
      { name: "뷰티/미용" },
      { name: "가구/인테리어" },
      { name: "생활/주방용품" },
      { name: "공구/산업용품" },
      { name: "식품" },
      { name: "유아동/출산" },
      { name: "반려동물용품" },
      { name: "기타" },
      { name: "지역 서비스" },
      { name: "구인구직" },
      { name: "재능" },
    ];
    const secondcate: {
      name: string;
      preCateId: number;
    }[] = [
      { name: "여성아우터", preCateId: 1 },
      { name: "여성상의", preCateId: 1 },
      { name: "여성바지", preCateId: 1 },
      { name: "여성치마", preCateId: 1 },
      { name: "여성원피스", preCateId: 1 },
      { name: "여성점프슈트", preCateId: 1 },
      { name: "여성셋업/세트", preCateId: 1 },
      { name: "여성언더웨어/홈웨어", preCateId: 1 },
      { name: "여성테마/이벤트", preCateId: 1 },
      //
      { name: "남성아우터", preCateId: 2 },
      { name: "남성상의", preCateId: 2 },
      { name: "남성바지", preCateId: 2 },
      { name: "남성점프슈트", preCateId: 2 },
      { name: "남성셋업/세트", preCateId: 2 },
      {
        name: "남성언더웨어/홈웨어",

        preCateId: 2,
      },
      { name: "테마/이벤트", preCateId: 2 },
      //
      { name: "스니커즈", preCateId: 3 },
      { name: "남성화", preCateId: 3 },
      { name: "여성화", preCateId: 3 },
      { name: "스포츠화", preCateId: 3 },
      //
      { name: "여성가방", preCateId: 4 },
      { name: "남성가방", preCateId: 4 },
      { name: "여행용 가방", preCateId: 4 },
      { name: "여성지갑", preCateId: 4 },
      { name: "남성지갑", preCateId: 4 },
      { name: "기타지갑", preCateId: 4 },
      //
      { name: "남성시계", preCateId: 5 },
      { name: "여성시계", preCateId: 5 },
      { name: "시계용품", preCateId: 5 },
      { name: "귀걸이/피어싱", preCateId: 6 },
      //
      { name: "목걸이/팬던트", preCateId: 6 },
      { name: "팔찌", preCateId: 6 },
      { name: "발찌", preCateId: 6 },
      { name: "반지", preCateId: 6 },
      { name: "쥬얼리 세트", preCateId: 6 },
      { name: "기타쥬얼리", preCateId: 6 },
      //
      { name: "모자", preCateId: 7 },
      { name: "안경/선글라스", preCateId: 7 },
      { name: "목도리/장갑", preCateId: 7 },
      { name: "스카프/넥타이", preCateId: 7 },
      { name: "벨트", preCateId: 7 },
      { name: "양말/스타킹", preCateId: 7 },
      { name: "우산/양산", preCateId: 7 },
      { name: "키링/키케이스", preCateId: 7 },
      { name: "기타 액세서리", preCateId: 7 },
      //
      { name: "휴대폰", preCateId: 8 },
      { name: "태블릿", preCateId: 8 },
      {
        name: "웨어러블(워치/밴드)",

        preCateId: 8,
      },
      {
        name: "오디오/영상/관련기기",

        preCateId: 8,
      },
      { name: "pc/노트북", preCateId: 8 },
      { name: "게임/타이틀", preCateId: 8 },
      { name: "카메라/DSLR", preCateId: 8 },
      {
        name: "PC부품/저장장치",

        preCateId: 8,
      },
      //
      { name: "생활가전", preCateId: 9 },
      { name: "주방가전", preCateId: 9 },
      { name: "미용가전", preCateId: 9 },
      { name: "냉장고", preCateId: 9 },
      { name: "에어컨", preCateId: 9 },
      { name: "세탁기/건조기", preCateId: 9 },
      { name: "TV", preCateId: 9 },
      {
        name: "사무기기(복사기/팩스 등)",

        preCateId: 9,
      },
      { name: "기타 가전제품", preCateId: 9 },
      //
      { name: "골프", preCateId: 10 },
      { name: "캠핑", preCateId: 10 },
      { name: "낚시", preCateId: 10 },
      { name: "축구", preCateId: 10 },
      { name: "야구", preCateId: 10 },
      { name: "농구", preCateId: 10 },
      { name: "자전거", preCateId: 10 },
      { name: "등산/클라이밍", preCateId: 10 },
      {
        name: "헬스/요가/필라테스",

        preCateId: 10,
      },
      {
        name: "인라인/스케이트보드",

        preCateId: 10,
      },
      {
        name: "전동킥보드/전동휠",

        preCateId: 10,
      },
      { name: "테니스", preCateId: 10 },
      { name: "배드민턴", preCateId: 10 },
      { name: "볼링", preCateId: 10 },
      { name: "탁구", preCateId: 10 },
      { name: "당구", preCateId: 10 },
      { name: "겨울스포츠", preCateId: 10 },
      { name: "수상스포츠", preCateId: 10 },
      { name: "격투/무술", preCateId: 10 },
      { name: "기타스포츠", preCateId: 10 },
      //
      { name: "국산차", preCateId: 11 },
      { name: "수입차", preCateId: 11 },
      { name: "차량용품/부품", preCateId: 11 },
      {
        name: "오토바이/스쿠터",

        preCateId: 11,
      },
      {
        name: "오토바이 용품/부품",

        preCateId: 11,
      },
      {
        name: "산업용 차량/장비",

        preCateId: 11,
      },
      //
      { name: "보이그룹", preCateId: 12 },
      { name: "걸그룹", preCateId: 12 },
      { name: "솔로(남)", preCateId: 12 },
      { name: "솔로(여)", preCateId: 12 },
      { name: "배우(남)", preCateId: 12 },
      { name: "배우(여)", preCateId: 12 },
      {
        name: "방송/예능/캐릭터",

        preCateId: 12,
      },
      //
      { name: "피규어/인형", preCateId: 13 },
      { name: "레고/블럭", preCateId: 13 },
      { name: "프라모델", preCateId: 13 },
      { name: "RC/드론", preCateId: 13 },
      { name: "보드게임", preCateId: 13 },
      { name: "서바이벌건", preCateId: 13 },
      { name: "기타(키덜트)", preCateId: 13 },
      //
      { name: "희귀/수집품", preCateId: 14 },
      { name: "골동품", preCateId: 14 },
      { name: "예술작품", preCateId: 14 },
      //
      { name: "CD/DVD/LP", preCateId: 15 },
      { name: "악기", preCateId: 15 },
      //
      { name: "도서", preCateId: 16 },
      { name: "문구", preCateId: 16 },
      {
        name: "기프티콘/쿠폰",

        preCateId: 16,
      },
      { name: "상품권", preCateId: 16 },
      { name: "티켓", preCateId: 16 },
      //
      { name: "스킨케어", preCateId: 17 },
      { name: "색조메이크업", preCateId: 17 },
      {
        name: "베이스메이크업",

        preCateId: 17,
      },
      {
        name: "바디/헤어케어",

        preCateId: 17,
      },
      { name: "향수/아로마", preCateId: 17 },
      {
        name: "네일아트/케어",

        preCateId: 17,
      },
      {
        name: "미용소품/기기",

        preCateId: 17,
      },
      {
        name: "다이어트/이너뷰티",

        preCateId: 17,
      },
      { name: "남성 화장품", preCateId: 17 },
      //
      { name: "가구", preCateId: 18 },
      { name: "침구", preCateId: 18 },
      { name: "수공예/수선", preCateId: 18 },
      {
        name: "셀프 인테리어 물품",

        preCateId: 18,
      },
      {
        name: "인테리어 소품",

        preCateId: 18,
      },
      { name: "꽃/원예", preCateId: 18 },
      { name: "조명", preCateId: 18 },
      {
        name: "카페트/러그/매트",

        preCateId: 18,
      },
      {
        name: "커튼/블라인드",

        preCateId: 18,
      },
      //
      { name: "주방용품", preCateId: 19 },
      { name: "욕실용품", preCateId: 19 },
      { name: "생활용품", preCateId: 19 },
      //
      {
        name: "드릴/전동공구",

        preCateId: 20,
      },
      {
        name: "수공구/가정용 공구",

        preCateId: 20,
      },
      { name: "공구함", preCateId: 20 },
      {
        name: "산업용품/자재",

        preCateId: 20,
      },
      {
        name: "측정/계측/레벨",

        preCateId: 20,
      },
      {
        name: "공장기계/용접/가스",

        preCateId: 20,
      },
      {
        name: "에어 유압공구",

        preCateId: 20,
      },
      { name: "기타산업용품", preCateId: 20 },
      //
      { name: "건강식품", preCateId: 21 },
      {
        name: "건강기능식품(식약처 시범사업)",

        preCateId: 21,
      },
      { name: "농수축산물", preCateId: 21 },
      { name: "간식", preCateId: 21 },
      { name: "커피/차", preCateId: 21 },
      { name: "생수/음료", preCateId: 21 },
      { name: "면/통조림", preCateId: 21 },
      { name: "장/소스/오일", preCateId: 21 },
      { name: "간편조리식품", preCateId: 21 },
      { name: "기타 식품", preCateId: 21 },
      //
      {
        name: "베이비의류(0-2세)",

        preCateId: 22,
      },
      {
        name: "여아의류(3-6세)",

        preCateId: 22,
      },
      {
        name: "남아의류(3-6세)",

        preCateId: 22,
      },
      {
        name: "여주니어의류(7세~)",

        preCateId: 22,
      },
      {
        name: "남주니어의류(7세~)",

        preCateId: 22,
      },
      {
        name: "신발/가방/잡화",

        preCateId: 22,
      },
      { name: "유아동용품", preCateId: 22 },
      {
        name: "임부 의류/용품",

        preCateId: 22,
      },
      {
        name: "교구/완구/인형",

        preCateId: 22,
      },
      {
        name: "수유/이유용품",

        preCateId: 22,
      },
      //
      { name: "강아지 용품", preCateId: 23 },
      {
        name: "강아지 사료/간식",

        preCateId: 23,
      },
      { name: "기타(강아지)", preCateId: 23 },
      { name: "고양이 용품", preCateId: 23 },
      {
        name: "고양이 사료/간식",

        preCateId: 23,
      },
      { name: "기타(고양이)", preCateId: 23 },
      {
        name: "기타(반려동물 용품)",

        preCateId: 23,
      },
      {
        name: "기타(반려동물 사료/간식)",

        preCateId: 23,
      },
      //
      { name: "이사/용달", preCateId: 25 },
      {
        name: "인테리어/간판",

        preCateId: 25,
      },
      {
        name: "청소/세탁/철거",

        preCateId: 25,
      },
      { name: "학원/수강", preCateId: 25 },
      { name: "네일/미용", preCateId: 25 },
      { name: "헬스/요가", preCateId: 25 },
      {
        name: "호텔/펜션/숙박",

        preCateId: 25,
      },
      { name: "차량/수리", preCateId: 25 },
      { name: "금융/채무", preCateId: 25 },
      { name: "결혼/행사", preCateId: 25 },
      { name: "병원/약국", preCateId: 25 },
      { name: "기타", preCateId: 25 },
      //
      { name: "재택알바", preCateId: 26 },
      { name: "알바찾아요", preCateId: 26 },
      { name: "강사/교육", preCateId: 26 },
      {
        name: "서비스/미디어",

        preCateId: 26,
      },
      { name: "IT/디자인", preCateId: 26 },
      { name: "생산/기능직", preCateId: 26 },
      { name: "상담영업", preCateId: 26 },
      { name: "매장관리", preCateId: 26 },
      { name: "사무/회계", preCateId: 26 },
      { name: "서빙/주방", preCateId: 26 },
      //
      {
        name: "디자인/영상/사진",

        preCateId: 27,
      },
      {
        name: "생활서비스/지식",

        preCateId: 27,
      },
      { name: "스타일/뷰티", preCateId: 27 },
      {
        name: "블로그/문서/번역",

        preCateId: 27,
      },
      { name: "거래대행", preCateId: 27 },
      {
        name: "재능인 찾아요",

        preCateId: 27,
      },
      { name: "기타재능", preCateId: 27 },
    ];
    const Thirdcate: {
      name: string;
      preCateId: number;
    }[] = [
      { name: "여성패딩", preCateId: 27 + 1 },
      { name: "여성점퍼", preCateId: 27 + 1 },
      { name: "여성코트", preCateId: 27 + 1 },
      { name: "여성자켓", preCateId: 27 + 1 },
      { name: "여성가디건", preCateId: 27 + 1 },
      { name: "여성조끼/베스트", preCateId: 27 + 1 },
      { name: "여성니트/스웨터", preCateId: 27 + 2 },
      { name: "여성후드티/후드집업", preCateId: 27 + 2 },
      { name: "여성맨투맨", preCateId: 27 + 2 },
      { name: "여성블라우스", preCateId: 27 + 2 },
      { name: "여성셔츠", preCateId: 27 + 2 },
      { name: "여성반팔 티셔츠", preCateId: 27 + 2 },
      { name: "여성긴팔 티셔츠", preCateId: 27 + 2 },
      { name: "여성민소매 티셔츠", preCateId: 27 + 2 },
      { name: "여성데님/청바지", preCateId: 27 + 3 },
      { name: "여성슬랙스", preCateId: 27 + 3 },
      { name: "여성면바지", preCateId: 27 + 3 },
      { name: "여성반바지", preCateId: 27 + 3 },
      {
        name: "여성트레이닝/조거팬츠",
        preCateId: 27 + 3,
      },
      { name: "여성레깅스", preCateId: 27 + 3 },
      { name: "여성기타 바지", preCateId: 27 + 3 },
      { name: "여성롱 스커트", preCateId: 27 + 4 },
      { name: "여성미디 스커트", preCateId: 27 + 4 },
      { name: "여성미니 스커트", preCateId: 27 + 4 },
      { name: "여성롱 원피스", preCateId: 27 + 5 },
      { name: "여성미디 원피스", preCateId: 27 + 5 },
      { name: "여성미니 원피스", preCateId: 27 + 5 },
      { name: "여성정장/셋업", preCateId: 27 + 7 },
      {
        name: "여성트레이닝/스웨트 셋업",

        preCateId: 27 + 7,
      },
      { name: "여성기타 셋업 세트", preCateId: 27 + 7 },
      { name: "여성홈웨어", preCateId: 27 + 8 },
      { name: "여성언더웨어", preCateId: 27 + 8 },
      {
        name: "여성코스튬/코스프레",

        preCateId: 27 + 9,
      },
      { name: "여성한복", preCateId: 27 + 9 },
      { name: "여성드레스", preCateId: 27 + 9 },
      {
        name: "여성기타 테마/이벤트",

        preCateId: 27 + 9,
      },
      //
      { name: "남성패딩", preCateId: 27 + 10 },
      { name: "남성점퍼", preCateId: 27 + 10 },
      { name: "남성코트", preCateId: 27 + 10 },
      { name: "남성자켓", preCateId: 27 + 10 },
      { name: "남성가디건", preCateId: 27 + 10 },
      { name: "남성조끼/베스트", preCateId: 27 + 10 },
      //
      {
        name: "남성후드티/후드집업",

        preCateId: 27 + 11,
      },
      { name: "남성맨투맨", preCateId: 27 + 11 },
      { name: "남성니트/스웨터", preCateId: 27 + 11 },
      { name: "남성셔츠", preCateId: 27 + 11 },
      { name: "남성반팔 티셔츠", preCateId: 27 + 11 },
      { name: "남성긴팔 티셔츠", preCateId: 27 + 11 },
      { name: "남성민소매 티셔츠", preCateId: 27 + 11 },
      //
      { name: "남성데님/청바지", preCateId: 27 + 12 },
      { name: "남성면바지", preCateId: 27 + 12 },
      { name: "남성슬랙스", preCateId: 27 + 12 },
      { name: "남성트레이닝/조거팬츠", preCateId: 27 + 12 },
      { name: "남성반바지", preCateId: 27 + 12 },
      { name: "남성기타바지", preCateId: 27 + 12 },
      //
      { name: "남성정장/셋업", preCateId: 27 + 14 },
      { name: "남성트레이닝/스웨트 셋업", preCateId: 27 + 14 },
      { name: "남성기타 셋업/세트", preCateId: 27 + 14 },
      //
      { name: "남성언더웨어", preCateId: 27 + 15 },
      { name: "남성홈웨어", preCateId: 27 + 15 },
      //
      { name: "남성코스튬/코스프레", preCateId: 27 + 16 },
      { name: "남성한복", preCateId: 27 + 16 },
      { name: "남성기타 테마/이벤트", preCateId: 27 + 16 },
      //
      { name: "남성샌들/슬리퍼", preCateId: 27 + 18 },
      { name: "남성구두/로퍼", preCateId: 27 + 18 },
      { name: "남성워커/부츠", preCateId: 27 + 18 },
      { name: "기타 남성화", preCateId: 27 + 18 },
      //
      { name: "여성샌들/슬리퍼", preCateId: 27 + 19 },
      { name: "여성구두", preCateId: 27 + 19 },
      { name: "여성단화/플랫슈즈", preCateId: 27 + 19 },
      { name: "여성워커/부츠", preCateId: 27 + 19 },
      { name: "기타여성화", preCateId: 27 + 19 },
      //
      { name: "농구화", preCateId: 27 + 20 },
      { name: "골프화", preCateId: 27 + 20 },
      { name: "축구/풋살화", preCateId: 27 + 20 },
      { name: "테니스화", preCateId: 27 + 20 },
      { name: "등산화/트레킹화", preCateId: 27 + 20 },
      { name: "야구화", preCateId: 27 + 20 },
      { name: "기타 스포츠화", preCateId: 27 + 20 },
      //
      { name: "여성클러치백", preCateId: 27 + 21 },
      { name: "여성숄더백", preCateId: 27 + 21 },
      { name: "여성크로스백", preCateId: 27 + 21 },
      { name: "여성토트벡", preCateId: 27 + 21 },
      { name: "여성백팩", preCateId: 27 + 21 },
      { name: "여성기타 여성가방", preCateId: 27 + 21 },
      //
      { name: "남성클러치", preCateId: 27 + 22 },
      { name: "남성숄더백", preCateId: 27 + 22 },
      { name: "남성크로스백", preCateId: 27 + 22 },
      { name: "남성브러프케이스", preCateId: 27 + 22 },
      { name: "남성백팩", preCateId: 27 + 22 },
      { name: "기타 남성가방", preCateId: 27 + 22 },
      //
      { name: "캐리어", preCateId: 27 + 23 },
      { name: "기타 여행용 가방", preCateId: 27 + 23 },
      //
      { name: "남성프리미엄 시계(쿼츠)", preCateId: 27 + 27 },
      { name: "남성프리미엄 시계(오토매틱)", preCateId: 27 + 27 },
      { name: "남성일반 시계 시계(디지털)", preCateId: 27 + 27 },
      { name: "남성일반 시계(메탈 밴드)", preCateId: 27 + 27 },
      { name: "남성일반 시계(가죽 밴드)", preCateId: 27 + 27 },
      { name: "남성일반 시계(기타 밴ㄷ)", preCateId: 27 + 27 },
      //
      { name: "여성프리미엄 시계(쿼츠)", preCateId: 27 + 28 },
      { name: "여성프리미엄 시계(오토매틱)", preCateId: 27 + 28 },
      { name: "여성일반 시계 시계(디지털)", preCateId: 27 + 28 },
      { name: "여성일반 시계(메탈 밴드)", preCateId: 27 + 28 },
      { name: "여성일반 시계(가죽 밴드)", preCateId: 27 + 28 },
      { name: "여성일반 시계(기타 밴ㄷ)", preCateId: 27 + 28 },
      //
      { name: "스트랩", preCateId: 27 + 29 },
      { name: "기타 시계용품", preCateId: 27 + 29 },
      //
      { name: "다이아몬드 귀걸이", preCateId: 27 + 30 },
      { name: "금 귀걸이", preCateId: 27 + 30 },
      { name: "은 귀걸이", preCateId: 27 + 30 },
      { name: "진주/유색보석 귀걸이", preCateId: 27 + 30 },
      { name: "패션 귀걸이", preCateId: 27 + 30 },
      { name: "피어싱", preCateId: 27 + 30 },
      { name: "귀찌/이어커프", preCateId: 27 + 30 },
      //
      { name: "다이아몬드 목걸이", preCateId: 27 + 31 },
      { name: "금 목걸이", preCateId: 27 + 31 },
      { name: "은 목걸이", preCateId: 27 + 31 },
      { name: "진주/유색보석 목걸이", preCateId: 27 + 31 },
      { name: "패션 목걸이", preCateId: 27 + 31 },
      { name: "초커", preCateId: 27 + 31 },
      //
      { name: "금팔찌", preCateId: 27 + 32 },
      { name: "은팔찌", preCateId: 27 + 32 },
      { name: "패션팔찌", preCateId: 27 + 32 },
      //
      { name: "금발찌", preCateId: 27 + 33 },
      { name: "패션발찌", preCateId: 27 + 33 },
      //
      { name: "다이아몬드 반지", preCateId: 27 + 34 },
      { name: "금반지", preCateId: 27 + 34 },
      { name: "은반지", preCateId: 27 + 34 },
      { name: "진주/유색보석 반지", preCateId: 27 + 34 },
      { name: "패션반지", preCateId: 27 + 34 },
      //
      { name: "귀금속 쥬얼리 세트", preCateId: 27 + 35 },
      { name: "패션 쥬얼리 세트", preCateId: 27 + 35 },
      //
      { name: "볼캡", preCateId: 27 + 37 },
      { name: "버킷", preCateId: 27 + 37 },
      { name: "스냅백", preCateId: 27 + 37 },
      { name: "비니", preCateId: 27 + 37 },
      { name: "기타(모자)", preCateId: 27 + 37 },
      //
      { name: "선글라스", preCateId: 27 + 38 },
      { name: "안경", preCateId: 27 + 38 },
      //
      { name: "목도리", preCateId: 27 + 39 },
      { name: "장갑", preCateId: 27 + 39 },
      //
      { name: "스카프", preCateId: 27 + 40 },
      { name: "넥타이", preCateId: 27 + 40 },
      //
      { name: "남성 벨트", preCateId: 27 + 41 },
      { name: "여성 벨트", preCateId: 27 + 41 },
      //
      { name: "양말", preCateId: 27 + 42 },
      { name: "스타킹", preCateId: 27 + 42 },
      //
      { name: "스마트폰", preCateId: 27 + 46 },
      { name: "일반폰(피쳐폰)", preCateId: 27 + 46 },
      { name: "케이스/보호필름/액세서리", preCateId: 27 + 46 },
      { name: "케이블/충전기/주변기기", preCateId: 27 + 46 },
      { name: "기타 휴대폰", preCateId: 27 + 46 },
      //
      { name: "태블릿", preCateId: 27 + 47 },
      { name: "케이스/보호필름/액세서리", preCateId: 27 + 47 },
      { name: "케이블/충전기/주변기기", preCateId: 27 + 47 },
      //
      { name: "스마트워치/밴드", preCateId: 27 + 48 },
      { name: "케이스/보호필름/액세서리", preCateId: 27 + 48 },
      { name: "케이블/충전기/주변기기", preCateId: 27 + 48 },
      //
      { name: "이어폰", preCateId: 27 + 49 },
      { name: "헤드폰", preCateId: 27 + 49 },
      { name: "스피커/앰프", preCateId: 27 + 49 },
      { name: "MP3/PMP", preCateId: 27 + 49 },
      { name: "비디오/프로젝터", preCateId: 27 + 49 },
      { name: "오디오/홈시어터", preCateId: 27 + 49 },
      { name: "기타 오디오/영상/관련기기", preCateId: 27 + 49 },
      //
      { name: "데스크탑", preCateId: 27 + 50 },
      { name: "노트북/넷북", preCateId: 27 + 50 },
      { name: "모니터", preCateId: 27 + 50 },
      { name: "키보드", preCateId: 27 + 50 },
      { name: "마우스", preCateId: 27 + 50 },
      { name: "기타 PC 주변기기", preCateId: 27 + 50 },
      { name: "노트북 가방/액세서리", preCateId: 27 + 50 },
      { name: "기타 PC/노트북", preCateId: 27 + 50 },
      //
      { name: "닌텐도/NDS/Wii", preCateId: 27 + 51 },
      { name: "소니/플레이스테이션", preCateId: 27 + 51 },
      { name: "XBOX", preCateId: 27 + 51 },
      { name: "PC게임", preCateId: 27 + 51 },
      { name: "기타 게임/타이틀", preCateId: 27 + 51 },
      //
      { name: "필름카메라/중형카메라", preCateId: 27 + 52 },
      { name: "DSLR/미러리스", preCateId: 27 + 52 },
      { name: "렌즈/필터/컨버터", preCateId: 27 + 52 },
      { name: "일반디카/토이카메라", preCateId: 27 + 52 },
      { name: "삼각대/플래시/조명", preCateId: 27 + 52 },
      { name: "디지털 캠코더", preCateId: 27 + 52 },
      { name: "메모리/배터리/가방", preCateId: 27 + 52 },
      { name: "기타 카메라", preCateId: 27 + 52 },
      //
      { name: "CPU/메인보드", preCateId: 27 + 53 },
      { name: "HDD/ODD/SSD", preCateId: 27 + 53 },
      { name: "USB/케이블/스피커", preCateId: 27 + 53 },
      { name: "복합기/프린터", preCateId: 27 + 53 },
      { name: "네트워크 장비", preCateId: 27 + 53 },
      { name: "쿨러/파워서플라이", preCateId: 27 + 53 },
      { name: "메모리/VGA", preCateId: 27 + 53 },
      { name: "소모품", preCateId: 27 + 53 },
      //
      { name: "마사지기", preCateId: 27 + 54 },
      { name: "청소기", preCateId: 27 + 54 },
      { name: "공기청정기", preCateId: 27 + 54 },
      { name: "가습기", preCateId: 27 + 54 },
      { name: "제습기", preCateId: 27 + 54 },
      { name: "선풍기/냉풍기", preCateId: 27 + 54 },
      { name: "히터/온풍기", preCateId: 27 + 54 },
      { name: "전기매트/장판", preCateId: 27 + 54 },
      { name: "다리미", preCateId: 27 + 54 },
      { name: "미싱/재봉틀", preCateId: 27 + 54 },
      //
      { name: "인덕션/전기레인지", preCateId: 27 + 55 },
      { name: "전기밥솥", preCateId: 27 + 55 },
      { name: "커피머신", preCateId: 27 + 55 },
      { name: "에어프라이어", preCateId: 27 + 55 },
      { name: "믹서기/블렌더", preCateId: 27 + 55 },
      { name: "식기세척기", preCateId: 27 + 55 },
      { name: "정수기", preCateId: 27 + 55 },
      { name: "오븐", preCateId: 27 + 55 },
      { name: "전기포트", preCateId: 27 + 55 },
      { name: "토스터", preCateId: 27 + 55 },
      { name: "전자레인지", preCateId: 27 + 55 },
      { name: "음식물처리기", preCateId: 27 + 55 },
      //
      { name: "피부케어기기", preCateId: 27 + 56 },
      { name: "고데기", preCateId: 27 + 56 },
      { name: "드라이기", preCateId: 27 + 56 },
      { name: "면도기/이발기", preCateId: 27 + 56 },
      { name: "제모기", preCateId: 27 + 56 },
      //
      { name: "골프 채", preCateId: 27 + 63 },
      { name: "골프 남성 의류", preCateId: 27 + 63 },
      { name: "골프 여성 읠", preCateId: 27 + 63 },
      { name: "골프백", preCateId: 27 + 63 },
      { name: "골프공", preCateId: 27 + 63 },
      { name: "골프 커버", preCateId: 27 + 63 },
      { name: "기타 골프 용품", preCateId: 27 + 63 },
      //
      { name: "캠핑 의자/테이블", preCateId: 27 + 64 },
      { name: "캠핑 취사용품", preCateId: 27 + 64 },
      { name: "캠핑 랜턴", preCateId: 27 + 64 },
      { name: "침낭/매트/해먹", preCateId: 27 + 64 },
      { name: "텐트/그늘막", preCateId: 27 + 64 },
      { name: "기타 캠핑 용품", preCateId: 27 + 64 },
      //
      { name: "공통 낚시 장비", preCateId: 27 + 65 },
      { name: "바다 낚시", preCateId: 27 + 65 },
      { name: "민물 낚시", preCateId: 27 + 65 },
      { name: "루어/플라이 낚시", preCateId: 27 + 65 },
      { name: "낚시 의류 및 기타 용품", preCateId: 27 + 65 },
      //
      { name: "축구 의류/잡화", preCateId: 27 + 66 },
      { name: "축구 용품", preCateId: 27 + 66 },
      { name: "굿즈(카드/사인볼 등)", preCateId: 27 + 66 },
      //
      { name: "야구 의류/잡화", preCateId: 27 + 67 },
      { name: "야구 용품", preCateId: 27 + 67 },
      { name: "글러브", preCateId: 27 + 67 },
      { name: "굿즈(카드/사인볼 등)", preCateId: 27 + 67 },
      //
      { name: "농구 의류/잡화", preCateId: 27 + 68 },
      { name: "농구 용품", preCateId: 27 + 68 },
      { name: "굿즈(카드/사인볼 등)", preCateId: 27 + 68 },
      //
      { name: "자전거 의류 및 액세서리", preCateId: 27 + 69 },
      { name: "자전거 부품", preCateId: 27 + 69 },
      { name: "클래식/픽시", preCateId: 27 + 69 },
      { name: "로드/BMX", preCateId: 27 + 69 },
      { name: "MTB/산악", preCateId: 27 + 69 },
      { name: "전동/하이브리드", preCateId: 27 + 69 },
      { name: "미니벨로/접이식", preCateId: 27 + 69 },
      { name: "기타 자전거", preCateId: 27 + 69 },
      //
      { name: "남성 등산복", preCateId: 27 + 70 },
      { name: "여성 등산복", preCateId: 27 + 70 },
      { name: "등산 가방", preCateId: 27 + 70 },
      { name: "암벽/클라이밍", preCateId: 27 + 70 },
      { name: "기타 등산 용품", preCateId: 27 + 70 },
      //
      { name: "헬스/요가/필라테스 장비", preCateId: 27 + 71 },
      { name: "헬스/요가/필라테스 의류", preCateId: 27 + 71 },
      { name: "기타용품", preCateId: 27 + 71 },
      //
      { name: "스키/보드 의류 및 잡화", preCateId: 27 + 79 },
      { name: "스노우 보드 장비", preCateId: 27 + 79 },
      { name: "스키 장비", preCateId: 27 + 79 },
      { name: "기타 겨울 스포츠", preCateId: 27 + 79 },
      //
      { name: "남성 수영복/래쉬가드", preCateId: 27 + 80 },
      { name: "여성 수영복/래쉬가드", preCateId: 27 + 80 },
      { name: "수영/물놀이 용품", preCateId: 27 + 80 },
      { name: "서핑", preCateId: 27 + 80 },
      { name: "기타 수상 스포츠", preCateId: 27 + 80 },
      //
      { name: "복싱", preCateId: 27 + 81 },
      { name: "주짓수", preCateId: 27 + 81 },
      { name: "기타 격투/무술", preCateId: 27 + 81 },
      //
      { name: "경차/소형차", preCateId: 27 + 83 },
      { name: "준/중형치", preCateId: 27 + 83 },
      { name: "준/대형차", preCateId: 27 + 83 },
      { name: "SRV/RV", preCateId: 27 + 83 },
      { name: "밴/승합차", preCateId: 27 + 83 },
      { name: "버스/화물차", preCateId: 27 + 83 },
      { name: "스포츠카", preCateId: 27 + 83 },
      { name: "기타(국산차)", preCateId: 27 + 83 },
      //
      { name: "경차/소형차", preCateId: 27 + 84 },
      { name: "준/중형차", preCateId: 27 + 84 },
      { name: "준/대형차", preCateId: 27 + 84 },
      { name: "SRV/RV", preCateId: 27 + 84 },
      { name: "밴/승합차", preCateId: 27 + 84 },
      { name: "버스/화물차", preCateId: 27 + 84 },
      { name: "스포츠카", preCateId: 27 + 84 },
      { name: "기타(수입차)", preCateId: 27 + 84 },
      //
      { name: "타이어/휠", preCateId: 27 + 85 },
      { name: "차량 부품", preCateId: 27 + 85 },
      { name: "차량/튜닝 용품", preCateId: 27 + 85 },
      { name: "네이게이션/블랙박스", preCateId: 27 + 85 },
      { name: "카오디오/영상", preCateId: 27 + 85 },
      //
      { name: "오토바이(125cc 이하)", preCateId: 27 + 86 },
      { name: "오토바이(125cc 초과)", preCateId: 27 + 86 },
      //
      { name: "라이더 용품", preCateId: 27 + 87 },
      { name: "오토바이 용품", preCateId: 27 + 87 },
      { name: "오토바이/튜닝 용품", preCateId: 27 + 87 },
      { name: "기타(오토바이 용품/부품)", preCateId: 27 + 87 },
      //
      { name: "굴삭기/지게차", preCateId: 27 + 88 },
      { name: "농기계/경운기", preCateId: 27 + 88 },
      //
      { name: "음반/영상물", preCateId: 27 + 89 },
      { name: "팬시/포토카드", preCateId: 27 + 89 },
      { name: "포스터 화보", preCateId: 27 + 89 },
      { name: "인형/피규어", preCateId: 27 + 89 },
      { name: "응원도구", preCateId: 27 + 89 },
      { name: "의류/패션잡화", preCateId: 27 + 89 },
      { name: "기타(보이그룹)", preCateId: 27 + 89 },
      //
      { name: "음반/영상물", preCateId: 27 + 90 },
      { name: "팬시/포토카드", preCateId: 27 + 90 },
      { name: "포스터 화보", preCateId: 27 + 90 },
      { name: "인형/피규어", preCateId: 27 + 90 },
      { name: "응원도구", preCateId: 27 + 90 },
      { name: "의류/패션잡화", preCateId: 27 + 90 },
      { name: "걸그룹)", preCateId: 27 + 90 },
      //
      { name: "음반/영상물", preCateId: 27 + 91 },
      { name: "팬시/포토카드", preCateId: 27 + 91 },
      { name: "포스터 화보", preCateId: 27 + 91 },
      { name: "인형/피규어", preCateId: 27 + 91 },
      { name: "응원도구", preCateId: 27 + 91 },
      { name: "의류/패션잡화", preCateId: 27 + 91 },
      { name: "기타(솔로-남)", preCateId: 27 + 91 },
      //
      { name: "음반/영상물", preCateId: 27 + 92 },
      { name: "팬시/포토카드", preCateId: 27 + 92 },
      { name: "포스터 화보", preCateId: 27 + 92 },
      { name: "인형/피규어", preCateId: 27 + 92 },
      { name: "응원도구", preCateId: 27 + 92 },
      { name: "의류/패션잡화", preCateId: 27 + 92 },
      { name: "기타(솔로-여)", preCateId: 27 + 92 },
      //
      { name: "음반/영상물", preCateId: 27 + 93 },
      { name: "팬시/포토카드", preCateId: 27 + 93 },
      { name: "포스터 화보", preCateId: 27 + 93 },
      { name: "인형/피규어", preCateId: 27 + 93 },
      { name: "응원도구", preCateId: 27 + 93 },
      { name: "의류/패션잡화", preCateId: 27 + 93 },
      { name: "기타(배우-남)", preCateId: 27 + 93 },
      //
      { name: "음반/영상물", preCateId: 27 + 94 },
      { name: "팬시/포토카드", preCateId: 27 + 94 },
      { name: "포스터 화보", preCateId: 27 + 94 },
      { name: "인형/피규어", preCateId: 27 + 94 },
      { name: "응원도구", preCateId: 27 + 94 },
      { name: "의류/패션잡화", preCateId: 27 + 94 },
      { name: "기타(배우-여)", preCateId: 27 + 94 },
      //
      { name: "음반/영상물", preCateId: 27 + 95 },
      { name: "팬시/포토카드", preCateId: 27 + 95 },
      { name: "포스터 화보", preCateId: 27 + 95 },
      { name: "인형/피규어", preCateId: 27 + 95 },
      { name: "응원도구", preCateId: 27 + 95 },
      { name: "의류/패션잡화", preCateId: 27 + 95 },
      { name: "기타(보이그룹)", preCateId: 27 + 95 },
      //
      { name: "관악기", preCateId: 27 + 107 },
      { name: "현악기", preCateId: 27 + 107 },
      { name: "타악기", preCateId: 27 + 107 },
      { name: "건반악기", preCateId: 27 + 107 },
      { name: "전자악기", preCateId: 27 + 107 },
      { name: "악기 용품", preCateId: 27 + 107 },
      { name: "기타(음반/악기)", preCateId: 27 + 107 },
      //
      { name: "시/소설", preCateId: 27 + 108 },
      { name: "자기계발", preCateId: 27 + 108 },
      { name: "교양/인문", preCateId: 27 + 108 },
      { name: "경제/경영", preCateId: 27 + 108 },
      { name: "학습/사전/참고서", preCateId: 27 + 108 },
      { name: "아동/어린이", preCateId: 27 + 108 },
      { name: "만화", preCateId: 27 + 108 },
      { name: "예술/디자인", preCateId: 27 + 108 },
      { name: "여행/취미/레저/건강", preCateId: 27 + 108 },
      { name: "사회/정치/법", preCateId: 27 + 108 },
      { name: "과학/IT", preCateId: 27 + 108 },
      { name: "간행물", preCateId: 27 + 108 },
      { name: "기타(도서)", preCateId: 27 + 108 },
      //
      { name: "학습도구/문구/필기류", preCateId: 27 + 109 },
      { name: "미술/화방용품", preCateId: 27 + 109 },
      //
      { name: "치킨/피자/햄버거", preCateId: 27 + 110 },
      { name: "베이커리/도넛/아이스크림", preCateId: 27 + 110 },
      { name: "커피(음료)", preCateId: 27 + 110 },
      { name: "편의점", preCateId: 27 + 110 },
      { name: "기타(기프티콘/쿠폰)", preCateId: 27 + 110 },
      //
      { name: "문화/도서", preCateId: 27 + 111 },
      { name: "백화점", preCateId: 27 + 111 },
      { name: "외식", preCateId: 27 + 111 },
      { name: "기타", preCateId: 27 + 111 },
      //
      { name: "뮤지컬/연극", preCateId: 27 + 112 },
      { name: "콘서트", preCateId: 27 + 112 },
      { name: "영화(예매/관람권)", preCateId: 27 + 112 },
      { name: "여행/숙박/렌트", preCateId: 27 + 112 },
      { name: "테마파크", preCateId: 27 + 112 },
      { name: "스포츠/레저", preCateId: 27 + 112 },
      { name: "공연/전시/행사", preCateId: 27 + 112 },
      { name: "기타(티켓)", preCateId: 27 + 112 },
      //
      { name: "클렌징/스크럽", preCateId: 27 + 113 },
      { name: "스킨/토너/미스트", preCateId: 27 + 113 },
      { name: "로션/에멀젼", preCateId: 27 + 113 },
      { name: "에센스/크림", preCateId: 27 + 113 },
      { name: "팩/마스크", preCateId: 27 + 113 },
      { name: "썬케어", preCateId: 27 + 113 },
      { name: "기타(스킨케어)", preCateId: 27 + 113 },
      //
      { name: "아이라이너/브로우", preCateId: 27 + 114 },
      { name: "아이섀도우", preCateId: 27 + 114 },
      { name: "마스카라", preCateId: 27 + 114 },
      { name: "립틴트", preCateId: 27 + 114 },
      { name: "립밤/립글로즈", preCateId: 27 + 114 },
      { name: "립스틱", preCateId: 27 + 114 },
      { name: "치크/블러셔", preCateId: 27 + 114 },
      { name: "기타(색조메이크업)", preCateId: 27 + 114 },
      //
      { name: "메이크업베이스", preCateId: 27 + 115 },
      { name: "BB/CC크림", preCateId: 27 + 115 },
      { name: "쿠션팩트", preCateId: 27 + 115 },
      { name: "파운데이션", preCateId: 27 + 115 },
      { name: "파우더/팩트", preCateId: 27 + 115 },
      { name: "프라이마/컨실러", preCateId: 27 + 115 },
      { name: "기타(베이스메이크업)", preCateId: 27 + 115 },
      //
      { name: "샴푸/린스", preCateId: 27 + 116 },
      { name: "헤어에센스/트리트먼트", preCateId: 27 + 116 },
      { name: "헤어스타일링", preCateId: 27 + 116 },
      { name: "헤어컬러(염색)", preCateId: 27 + 116 },
      { name: "발모제/탈모관련", preCateId: 27 + 116 },
      { name: "바디클렌져/로션", preCateId: 27 + 116 },
      { name: "핸드/풋케어", preCateId: 27 + 116 },
      { name: "기타(헤어/바디)", preCateId: 27 + 116 },
      //
      { name: "여성 향수", preCateId: 27 + 117 },
      { name: "남성 향수", preCateId: 27 + 117 },
      { name: "남여공용 향수", preCateId: 27 + 117 },
      { name: "기타(향수/아로마)", preCateId: 27 + 117 },
      //
      { name: "네일아트/스티커", preCateId: 27 + 118 },
      { name: "매니큐어/페디큐어", preCateId: 27 + 118 },
      { name: "네일케어도구", preCateId: 27 + 118 },
      { name: "네일리무버", preCateId: 27 + 118 },
      { name: "기타(네일아트/케어)", preCateId: 27 + 118 },
      //
      { name: "뷰티소품(퍼프/거울)", preCateId: 27 + 119 },
      { name: "메이크업 브러쉬", preCateId: 27 + 119 },
      { name: "화장품 파우치/정리함", preCateId: 27 + 119 },
      { name: "기타(이미용품)", preCateId: 27 + 119 },
      //
      { name: "스킨/로션", preCateId: 27 + 121 },
      { name: "클렌징/마스크", preCateId: 27 + 121 },
      { name: "에센스/크림", preCateId: 27 + 121 },
      { name: "BB크림", preCateId: 27 + 121 },
      { name: "선케어", preCateId: 27 + 121 },
      { name: "왁스", preCateId: 27 + 121 },
      { name: "올인원", preCateId: 27 + 121 },
      { name: "세트", preCateId: 27 + 121 },
      { name: "기타(남성화장품)", preCateId: 27 + 121 },
      //
      { name: "거실가구", preCateId: 27 + 122 },
      { name: "침실가구", preCateId: 27 + 122 },
      { name: "학생/서제/사무용가구", preCateId: 27 + 122 },
      { name: "선반/수납가구", preCateId: 27 + 122 },
      { name: "주방가구", preCateId: 27 + 122 },
      //
      { name: "수공예품", preCateId: 27 + 124 },
      { name: "수공예 용품/부자재", preCateId: 27 + 124 },
      //
      { name: "포스터/그림/액자", preCateId: 27 + 126 },
      { name: "디퓨저/캔들", preCateId: 27 + 126 },
      { name: "쿠션/방석", preCateId: 27 + 126 },
      { name: "탁상/벽시계", preCateId: 27 + 126 },
      { name: "식탁보/테이블 매트", preCateId: 27 + 126 },
      { name: "거울", preCateId: 27 + 126 },
      { name: "기타 인테리어 소품", preCateId: 27 + 126 },
      //
      { name: "식물/꽃", preCateId: 27 + 127 },
      { name: "원예 용품", preCateId: 27 + 127 },
      //
      { name: "그릇/홈세트", preCateId: 27 + 131 },
      { name: "잔/컵", preCateId: 27 + 131 },
      { name: "텀블러/물병", preCateId: 27 + 131 },
      { name: "수저/커트러리", preCateId: 27 + 131 },
      { name: "업소용품/기기", preCateId: 27 + 131 },
      { name: "냄비/프라이팬", preCateId: 27 + 131 },
      { name: "조리도구", preCateId: 27 + 131 },
      { name: "칼/도마", preCateId: 27 + 131 },
      { name: "보관/밀페용기", preCateId: 27 + 131 },
      { name: "주전자/티포트", preCateId: 27 + 131 },
      { name: "커피용품", preCateId: 27 + 131 },
      { name: "제과/제빵", preCateId: 27 + 131 },
      { name: "주방수납용품", preCateId: 27 + 131 },
      { name: "기타 주방용품", preCateId: 27 + 131 },
      //
      { name: "구강/면도용품", preCateId: 27 + 132 },
      { name: "샤워/목욕용품", preCateId: 27 + 132 },
      { name: "수건/타월", preCateId: 27 + 132 },
      { name: "샤워기/레드/수전용품", preCateId: 27 + 132 },
      { name: "욕실수납/정리", preCateId: 27 + 132 },
      { name: "욕조/반식욕 용품", preCateId: 27 + 132 },
      { name: "변기/비데용품", preCateId: 27 + 132 },
      { name: "기타 욕실용품", preCateId: 27 + 132 },
      //
      { name: "청소용품", preCateId: 27 + 133 },
      { name: "세탁/빨래용품", preCateId: 27 + 133 },
      { name: "세제", preCateId: 27 + 133 },
      { name: "화장지", preCateId: 27 + 133 },
      { name: "생리대", preCateId: 27 + 133 },
      { name: "기타 생활용품", preCateId: 27 + 133 },
      //
      { name: "우주복/슈트", preCateId: 27 + 152 },
      { name: "싸개/배냇저고리", preCateId: 27 + 152 },
      { name: "원피스", preCateId: 27 + 152 },
      { name: "유아상의", preCateId: 27 + 152 },
      { name: "유아하의", preCateId: 27 + 152 },
      { name: "유아내의/속옷", preCateId: 27 + 152 },
      { name: "자켓/점퍼", preCateId: 27 + 152 },
      { name: "정장/드레스", preCateId: 27 + 152 },
      { name: "베이비수영복", preCateId: 27 + 152 },
      { name: "기타 베이비의류", preCateId: 27 + 152 },
      //
      { name: "원피스", preCateId: 27 + 153 },
      { name: "상하복/세트", preCateId: 27 + 153 },
      { name: "자켓/점퍼", preCateId: 27 + 153 },
      { name: "코트/정장", preCateId: 27 + 153 },
      { name: "가디건/조끼", preCateId: 27 + 153 },
      { name: "니트/스웨터", preCateId: 27 + 153 },
      { name: "블라우스/셔츠", preCateId: 27 + 153 },
      { name: "티셔츠", preCateId: 27 + 153 },
      { name: "바지", preCateId: 27 + 153 },
      { name: "치마", preCateId: 27 + 153 },
      { name: "스포츠/테마의류", preCateId: 27 + 153 },
      { name: "속옷/잠옷", preCateId: 27 + 153 },
      { name: "기타 여아의류", preCateId: 27 + 153 },
      //

      { name: "상하복/세트", preCateId: 27 + 154 },
      { name: "자켓/점퍼", preCateId: 27 + 154 },
      { name: "코트/정장", preCateId: 27 + 154 },
      { name: "가디건/조끼", preCateId: 27 + 154 },
      { name: "니트/스웨터", preCateId: 27 + 154 },
      { name: "셔츠/남방", preCateId: 27 + 154 },
      { name: "티셔츠", preCateId: 27 + 154 },
      { name: "바지", preCateId: 27 + 154 },
      { name: "스포츠/테마의류", preCateId: 27 + 154 },
      { name: "속옷/잠옷", preCateId: 27 + 154 },
      { name: "기타 남아의류", preCateId: 27 + 154 },
      //
      { name: "원피스", preCateId: 27 + 155 },
      { name: "상하복/세트", preCateId: 27 + 155 },
      { name: "자켓/점퍼", preCateId: 27 + 155 },
      { name: "코트/정장", preCateId: 27 + 155 },
      { name: "가디건/조끼", preCateId: 27 + 155 },
      { name: "니트/스웨터", preCateId: 27 + 155 },
      { name: "블라우스/셔츠", preCateId: 27 + 155 },
      { name: "티셔츠", preCateId: 27 + 155 },
      { name: "바지", preCateId: 27 + 155 },
      { name: "치마", preCateId: 27 + 155 },
      { name: "스포츠/테마의류", preCateId: 27 + 155 },
      { name: "속옷/잠옷", preCateId: 27 + 155 },
      { name: "기타 여주니어의류", preCateId: 27 + 155 },
      //
      { name: "상하복/세트", preCateId: 27 + 156 },
      { name: "자켓/점퍼", preCateId: 27 + 156 },
      { name: "코트/정장", preCateId: 27 + 156 },
      { name: "가디건/조끼", preCateId: 27 + 156 },
      { name: "니트/스웨터", preCateId: 27 + 156 },
      { name: "셔츠/남방", preCateId: 27 + 156 },
      { name: "티셔츠", preCateId: 27 + 156 },
      { name: "바지", preCateId: 27 + 156 },
      { name: "스포츠/테마의류", preCateId: 27 + 156 },
      { name: "속옷/잠옷", preCateId: 27 + 156 },
      { name: "기타 남주니어의류", preCateId: 27 + 156 },
      //
      { name: "액세서리", preCateId: 27 + 157 },
      { name: "신발", preCateId: 27 + 157 },
      { name: "가방/지갑", preCateId: 27 + 157 },
      { name: "모자", preCateId: 27 + 157 },
      { name: "양말", preCateId: 27 + 157 },
      { name: "기타 신발/가방/잡화", preCateId: 27 + 157 },
      //
      { name: "유모차", preCateId: 27 + 158 },
      { name: "아기띠", preCateId: 27 + 158 },
      { name: "카시트", preCateId: 27 + 158 },
      { name: "보행기/쏘서", preCateId: 27 + 158 },
      { name: "기저귀", preCateId: 27 + 158 },
      { name: "가구/침대/매트", preCateId: 27 + 158 },
      { name: "이불/침구", preCateId: 27 + 158 },
      { name: "목욕/구강용품", preCateId: 27 + 158 },
      { name: "세탁/위생용품", preCateId: 27 + 158 },
      { name: "유아동 스킨케어", preCateId: 27 + 158 },
      { name: "기타 유아동용품", preCateId: 27 + 158 },
      //
      { name: "임부의류/수유복", preCateId: 27 + 159 },
      { name: "임부스킨케어", preCateId: 27 + 159 },
      { name: "기타 임부 의류/용품", preCateId: 27 + 159 },

      { name: "인형(유아용)", preCateId: 27 + 160 },
      { name: "캐릭터완구/로봇", preCateId: 27 + 160 },
      { name: "교구/CD/DVD", preCateId: 27 + 160 },
      { name: "퍼즐/블록", preCateId: 27 + 160 },
      { name: "스포츠완구", preCateId: 27 + 160 },
      { name: "신생아완구", preCateId: 27 + 160 },
      { name: "자전거/승용완구", preCateId: 27 + 160 },
      { name: "물놀이/계절용품", preCateId: 27 + 160 },
      { name: "놀이집/텐트/미끄러믈", preCateId: 27 + 160 },
      { name: "기타 교구/완구/인형", preCateId: 27 + 160 },
      //
      { name: "젖병/세정용품", preCateId: 27 + 161 },
      { name: "분유", preCateId: 27 + 161 },
      { name: "수저/식판/이유식용품", preCateId: 27 + 161 },
      { name: "기타 수유/이유용품", preCateId: 27 + 161 },
      //
      { name: "재택 기타", preCateId: 27 + 182 },
      { name: "타이핑/포스팅", preCateId: 27 + 182 },
      { name: "디자이너", preCateId: 27 + 182 },
      { name: "프로그래머", preCateId: 27 + 182 },
      //
      { name: "단기알바", preCateId: 27 + 183 },
      { name: "주말알바", preCateId: 27 + 183 },
      { name: "야간알바", preCateId: 27 + 183 },
      { name: "사무/회계", preCateId: 27 + 183 },
      { name: "강사/교육", preCateId: 27 + 183 },
      { name: "서비스/미디어", preCateId: 27 + 183 },
      { name: "상담영업", preCateId: 27 + 183 },
      { name: "서빙/주방", preCateId: 27 + 183 },
      { name: "생산/기능직", preCateId: 27 + 183 },
      { name: "매장관리", preCateId: 27 + 183 },
      { name: "기타 업종", preCateId: 27 + 183 },
      //
      { name: "외국어/어학원", preCateId: 27 + 184 },
      { name: "과외/학습지", preCateId: 27 + 184 },
      { name: "예체능", preCateId: 27 + 184 },
      { name: "IT/컴퓨터", preCateId: 27 + 184 },
      { name: "강사/교육 기타", preCateId: 27 + 184 },
      //
      { name: "모델", preCateId: 27 + 185 },
      { name: "헤어/피부/애견", preCateId: 27 + 185 },
      { name: "영화/공연/전시", preCateId: 27 + 185 },
      { name: "보조출연/방송", preCateId: 27 + 185 },
      { name: "안내데스크", preCateId: 27 + 185 },
      { name: "서비스/미디어 기타", preCateId: 27 + 185 },
      //
      { name: "프로그래머", preCateId: 27 + 186 },
      { name: "마케팅", preCateId: 27 + 186 },
      { name: "디자인", preCateId: 27 + 186 },
      { name: "사이트운영/관리", preCateId: 27 + 186 },
      { name: "IT/디자인 기타", preCateId: 27 + 186 },
      //
      { name: "배달", preCateId: 27 + 187 },
      { name: "운전/대리운전", preCateId: 27 + 187 },
      { name: "공사현장", preCateId: 27 + 187 },
      { name: "청소/미화", preCateId: 27 + 187 },
      { name: "전단배포", preCateId: 27 + 187 },
      { name: "제조가공", preCateId: 27 + 187 },
      { name: "운반이사", preCateId: 27 + 187 },
      { name: "포장조립", preCateId: 27 + 187 },
      { name: "생산/기능직 기타", preCateId: 27 + 187 },
      //
      { name: "영업/세일즈", preCateId: 27 + 188 },
      { name: "고객상담", preCateId: 27 + 188 },
      { name: "아웃바운드 TM", preCateId: 27 + 188 },
      { name: "섦문조사", preCateId: 27 + 188 },
      { name: "상담영업 기타", preCateId: 27 + 188 },
      //
      { name: "가전/휴대폰", preCateId: 27 + 189 },
      { name: "PC방/오락실", preCateId: 27 + 189 },
      { name: "스포츠/뷰티", preCateId: 27 + 189 },
      { name: "서점/문구", preCateId: 27 + 189 },
      { name: "볼링/당구장", preCateId: 27 + 189 },
      { name: "편의점/마트", preCateId: 27 + 189 },
      { name: "쇼핑몰/백화점", preCateId: 27 + 189 },
      { name: "매장관리 기타", preCateId: 27 + 189 },
      //
      { name: "사무보조/문서작성", preCateId: 27 + 190 },
      { name: "경리/회계/총무", preCateId: 27 + 190 },
      { name: "사무/회계 기타", preCateId: 27 + 190 },
      //
      { name: "음식점/레스토랑", preCateId: 27 + 191 },
      { name: "결혼/행사", preCateId: 27 + 191 },
      { name: "조리/주방보조", preCateId: 27 + 191 },
      { name: "베이커리/디저트", preCateId: 27 + 191 },
      { name: "카페/바리스타", preCateId: 27 + 191 },
      { name: "서빙/주방 기타", preCateId: 27 + 191 },
      //
      { name: "그림/디자인", preCateId: 27 + 192 },
      { name: "사진/영상제작", preCateId: 27 + 192 },
      { name: "음악/녹음", preCateId: 27 + 192 },
      { name: "기타", preCateId: 27 + 192 },
      //
      { name: "상담/노하우", preCateId: 27 + 193 },
      { name: "생활서비스", preCateId: 27 + 193 },
      { name: "대행서비스", preCateId: 27 + 193 },
      { name: "기타", preCateId: 27 + 193 },
      //
      { name: "피부/메이크업", preCateId: 27 + 194 },
      { name: "의류/헤어", preCateId: 27 + 194 },
      { name: "기타", preCateId: 27 + 194 },
      //
      { name: "포스팅/리뷰", preCateId: 27 + 195 },
      { name: "타이핑/문서", preCateId: 27 + 195 },
      { name: "번역/통역", preCateId: 27 + 195 },
      { name: "기타", preCateId: 27 + 195 },
      //
      { name: "구매 대행", preCateId: 27 + 196 },
      { name: "판매 대행", preCateId: 27 + 196 },
      { name: "기타", preCateId: 27 + 196 },
      //
      { name: "교육/과외", preCateId: 27 + 197 },
      { name: "생활서비스/지식", preCateId: 27 + 197 },
      { name: "거래대행", preCateId: 27 + 197 },
      { name: "디자인/영상/사진", preCateId: 27 + 197 },
      { name: "스타일/뷰티", preCateId: 27 + 197 },
      { name: "기타재능 구해요", preCateId: 27 + 197 },
      //
      { name: "기타재능", preCateId: 27 + 198 },
    ];
    for (let i = 0; i < firstcate.length; i++) {
      await Category.create(firstcate[i]);
    }
    for (let i = 0; i < secondcate.length; i++) {
      await Category.create(secondcate[i]);
    }
    for (let i = 0; i < Thirdcate.length; i++) {
      await Category.create(Thirdcate[i]);
    }
  } catch (err) {
    console.error(err);
  }
};
