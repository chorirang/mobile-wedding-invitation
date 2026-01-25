# 모바일 청첩장

간단하고 예쁜 모바일 청첩장입니다. 비개발자도 쉽게 사용할 수 있도록 만들어졌습니다.

## 주요 기능

- 메인 이미지 및 신랑신부 이름 표시
- 인사말 및 혼주 정보
- 예식 일시 및 장소 안내
- 카카오맵 연동 (지도 표시 및 길찾기)
- 사진 갤러리 (클릭하여 크게 보기)
- 계좌번호 안내 (복사 기능)
- 청첩장 공유하기 (카카오톡, 문자메시지, 링크복사)
- 캘린더 저장 기능

## 파일 구조

```
test/
├── index.html          # 메인 HTML 파일
├── style.css          # 스타일시트
├── script.js          # JavaScript 기능
├── README.md          # 사용 설명서 (이 파일)
└── images/            # 이미지 폴더 (직접 생성 필요)
    ├── main-photo.jpg  # 메인 사진
    ├── photo1.jpg      # 갤러리 사진 1
    ├── photo2.jpg      # 갤러리 사진 2
    ├── photo3.jpg      # 갤러리 사진 3
    ├── photo4.jpg      # 갤러리 사진 4
    ├── photo5.jpg      # 갤러리 사진 5
    └── photo6.jpg      # 갤러리 사진 6
```

## 사용 방법

### 1단계: 이미지 폴더 생성 및 사진 추가

1. `test` 폴더 안에 `images` 폴더를 만듭니다.
2. 다음 사진들을 준비하여 `images` 폴더에 넣습니다:
   - `main-photo.jpg`: 메인 사진 (청첩장 맨 위에 표시됨)
   - `photo1.jpg` ~ `photo6.jpg`: 갤러리에 표시할 사진 6장

**사진 권장 사항:**
- 메인 사진: 세로 비율 (예: 1080 x 1350px)
- 갤러리 사진: 정사각형 비율 (예: 1080 x 1080px)
- 파일 크기: 각 사진 1MB 이하 권장 (빠른 로딩)

### 2단계: HTML 파일 수정

`index.html` 파일을 텍스트 에디터(메모장, VSCode 등)로 열어서 다음 정보들을 수정하세요:

#### 신랑신부 이름 및 날짜
```html
<h2 class="couple-name">홍길동 ❤️ 김영희</h2>  <!-- 신랑신부 이름 수정 -->
<p class="wedding-date">2026년 03월 15일 토요일 오후 2시</p>  <!-- 날짜/시간 수정 -->
```

#### 인사말
```html
<div class="greeting-text">
    <p>
        <!-- 이 부분의 인사말을 수정하세요 -->
        평생을 함께할 반려자를 만나<br>
        ...
    </p>
</div>
```

#### 혼주 정보
```html
<div class="parent-row">
    <span class="parent-name">홍아버지 · 홍어머니</span>  <!-- 부모님 이름 수정 -->
    <span class="parent-relation">의 장남</span>  <!-- 장남/차남/삼남 등 -->
    <span class="groom-name">홍길동</span>  <!-- 신랑 이름 -->
</div>
```

#### 예식 장소
```html
<p class="info-value">서울 강남구 테헤란로 123</p>  <!-- 주소 수정 -->
<p class="info-detail">그랜드컨벤션 3층 그랜드홀</p>  <!-- 장소명 수정 -->
```

#### 교통편 안내
```html
<div class="transport-item">
    <h4>🚇 지하철</h4>
    <p>2호선 강남역 3번 출구 도보 5분</p>  <!-- 교통편 수정 -->
</div>
```

#### 계좌번호
```html
<div class="account-item">
    <p class="account-holder">홍길동</p>  <!-- 예금주 수정 -->
    <p class="account-number">카카오뱅크 1234-56-789012</p>  <!-- 계좌번호 수정 -->
    <button class="btn-copy" onclick="copyAccount('1234567890012')">복사</button>  <!-- 하이픈 없는 번호로 수정 -->
</div>
```

### 3단계: JavaScript 파일 수정

`script.js` 파일을 열어서 예식 정보를 수정하세요:

```javascript
const weddingInfo = {
    groom: '홍길동',              // 신랑 이름
    bride: '김영희',              // 신부 이름
    date: '2026-03-15',          // 날짜 (YYYY-MM-DD 형식)
    time: '14:00',               // 시간 (24시간 형식)
    placeName: '그랜드컨벤션 3층 그랜드홀',  // 장소명
    address: '서울 강남구 테헤란로 123',    // 주소
    latitude: 37.498095,         // 위도 (아래 참고)
    longitude: 127.027610        // 경도 (아래 참고)
};
```

**위도/경도 찾는 방법:**
1. [카카오맵](https://map.kakao.com)에서 예식장 검색
2. 주소를 클릭하면 나오는 URL에서 좌표 확인
3. 또는 [네이버 지도](https://map.naver.com)에서 검색 후 우클릭 → "이 위치의 URL 복사"

### 4단계: 카카오 API 설정 (선택사항)

지도와 카카오톡 공유 기능을 사용하려면 카카오 개발자 계정이 필요합니다.

#### 카카오 API 키 발급 방법:

1. [카카오 개발자 사이트](https://developers.kakao.com) 접속
2. 로그인 후 "내 애플리케이션" → "애플리케이션 추가하기"
3. 앱 이름 입력 후 저장
4. "앱 키" 메뉴에서 다음 키들을 복사:
   - **JavaScript 키**: 카카오톡 공유용
   - **REST API 키**: 지도 표시용

5. `index.html` 파일에서 다음 부분을 수정:

```html
<!-- 카카오 지도 API -->
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY"></script>

<!-- 파일 하단 -->
<script>
    Kakao.init('YOUR_KAKAO_JS_KEY');  // JavaScript 키로 변경
</script>
```

**주의:** API 키가 없어도 대부분의 기능은 작동하지만, 카카오맵과 카카오톡 공유 기능은 사용할 수 없습니다.

### 5단계: 브라우저에서 열기

1. `index.html` 파일을 더블클릭하거나
2. 브라우저에 드래그 앤 드롭하여 열기
3. 모바일에서 확인하려면:
   - 컴퓨터 브라우저에서 개발자 도구(F12) → 모바일 보기 전환
   - 또는 실제 모바일 기기로 파일 전송 후 열기

## 온라인 배포 방법

청첩장을 인터넷에 올려서 링크로 공유하고 싶다면:

### 방법 1: GitHub Pages (무료, 추천)

1. [GitHub](https://github.com) 가입
2. 새 저장소(Repository) 생성
3. 모든 파일(index.html, style.css, script.js, images 폴더) 업로드
4. 설정(Settings) → Pages → Branch를 "main"으로 설정
5. 제공되는 URL로 접속 (예: `https://username.github.io/repository-name`)

### 방법 2: Netlify (무료, 간단)

1. [Netlify](https://www.netlify.com) 가입
2. "Sites" → "Add new site" → "Deploy manually"
3. `test` 폴더를 드래그 앤 드롭
4. 제공되는 URL 사용

### 방법 3: 웹 호스팅 서비스

- Cafe24, 가비아 등의 웹 호스팅 서비스 이용
- FTP로 파일 업로드
- 도메인 연결 가능

## 자주 묻는 질문 (FAQ)

### Q1. 사진이 안 보여요
A: `images` 폴더가 제대로 생성되었는지, 파일 이름이 정확한지 확인하세요.

### Q2. 지도가 안 나와요
A: 카카오 API 키를 설정하지 않았기 때문입니다. 위의 "4단계" 참고하세요.

### Q3. 갤러리 사진을 더 추가하고 싶어요
A:
1. `images` 폴더에 사진 추가 (예: `photo7.jpg`)
2. `index.html`의 갤러리 섹션에 다음 코드 추가:
```html
<div class="gallery-item" onclick="openGallery(6)">
    <img src="images/photo7.jpg" alt="갤러리 사진 7">
</div>
```
3. `script.js`의 `galleryImages` 배열에 추가:
```javascript
const galleryImages = [
    'images/photo1.jpg',
    // ... 기존 사진들 ...
    'images/photo7.jpg'  // 추가
];
```

### Q4. 모바일에서 제대로 보이나요?
A: 네, 모바일 최적화되어 있습니다. 반응형 디자인으로 모든 기기에서 잘 보입니다.

### Q5. 배경음악을 추가할 수 있나요?
A: 가능합니다. `index.html`의 `<body>` 태그 시작 부분에 다음 코드를 추가하세요:
```html
<audio autoplay loop>
    <source src="music/bgm.mp3" type="audio/mpeg">
</audio>
```
단, 일부 브라우저에서는 자동재생이 차단될 수 있습니다.

## 주의사항

1. **카카오 API 키는 공개 저장소에 올리지 마세요** (보안 위험)
2. **사진 파일 크기를 최적화하세요** (로딩 속도 향상)
3. **실제 배포 전 여러 기기에서 테스트하세요**
4. **예식 1-2주 전에 미리 공유하세요**

## 커스터마이징

### 색상 변경
`style.css` 파일에서 `#E54666` (핑크색)을 원하는 색상으로 바꾸세요.

### 폰트 변경
`style.css`의 `font-family`를 수정하거나 구글 폰트를 추가하세요.

### 섹션 순서 변경
`index.html`에서 `<section>` 블록들의 순서를 바꾸면 됩니다.

## 도움이 필요하신가요?

문제가 생기거나 궁금한 점이 있으면 다시 질문해주세요!

## 라이선스

자유롭게 사용하고 수정하실 수 있습니다. 행복한 결혼식 되세요!
